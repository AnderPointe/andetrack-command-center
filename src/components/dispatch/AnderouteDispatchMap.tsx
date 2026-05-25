import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import maplibregl, { type Map as MLMap, type Marker as MLMarker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { DispatchDriver } from "@/types/dispatch";
import type { LogisticsPoi, PoiCategory } from "@/types/map";
import type { DispatchLoad } from "@/types/loads";
import { DRIVER_STATUS_COLOR } from "./dispatchTokens";
import { MapStatusLegend } from "./MapStatusLegend";
import { MapLayerControls } from "./MapLayerControls";
import { SelectedDriverMapCard } from "./SelectedDriverMapCard";

const US_CENTER: [number, number] = [-98.5795, 39.8283]; // MapLibre = [lng, lat]
const US_ZOOM = 3.5;

// Resolve the vector style at runtime so production deploys can point at a
// proper OpenStreetMap-based vector style (self-hosted OpenMapTiles, OpenFreeMap,
// or a commercial provider) without rebuilding.
//
// PRODUCTION: replace VITE_MAP_STYLE_URL with an OpenStreetMap-based vector
// tile style from a proper provider or self-hosted OpenMapTiles/OpenFreeMap.
// Do NOT rely on public demo tiles or public OSM raster tiles for production
// traffic — both are rate-limited and have no SLA.
const MAP_STYLE: string =
  (import.meta.env.VITE_MAP_STYLE_URL as string | undefined) ||
  "https://tiles.openfreemap.org/styles/liberty"; // dev fallback

// Add a 3D building extrusion layer if the active style exposes one.
// Permissive match: any layer whose source-layer is "building"/"buildings"
// or whose id contains "building" (covers OpenMapTiles, OpenFreeMap Liberty,
// Protomaps, Stadia, MapTiler, and most OSM-derived vector styles).
function add3DBuildings(map: MLMap) {
  const layers = (map.getStyle().layers ?? []) as any[];
  const labelLayerId = layers.find(
    (l) => l.type === "symbol" && l.layout && l.layout["text-field"],
  )?.id;

  const buildingLayer = layers.find(
    (l) =>
      l["source-layer"] === "building" ||
      l["source-layer"] === "buildings" ||
      (typeof l.id === "string" && l.id.toLowerCase().includes("building")),
  );
  if (!buildingLayer) {
    console.warn("No building source layer found in this map style.");
    return;
  }
  if (map.getLayer("anderoute-3d-buildings")) return;

  map.addLayer(
    {
      id: "anderoute-3d-buildings",
      source: buildingLayer.source,
      "source-layer": buildingLayer["source-layer"],
      type: "fill-extrusion",
      minzoom: 14,
      paint: {
        "fill-extrusion-color": "#cbd5e1",
        "fill-extrusion-height": [
          "coalesce",
          ["get", "render_height"],
          ["get", "height"],
          12,
        ],
        "fill-extrusion-base": [
          "coalesce",
          ["get", "render_min_height"],
          ["get", "min_height"],
          0,
        ],
        "fill-extrusion-opacity": 0.72,
      },
    } as any,
    labelLayerId,
  );
}


const POI_STYLE: Record<PoiCategory, { color: string; glyph: string; label: string }> = {
  load_pickup: { color: "#f97316", glyph: "P", label: "Pickup" },
  load_dropoff: { color: "#14b8a6", glyph: "D", label: "Drop-off" },
  warehouse: { color: "#64748b", glyph: "▣", label: "Warehouse" },
  depot: { color: "#0d9488", glyph: "◆", label: "Depot" },
  customer: { color: "#475569", glyph: "●", label: "Customer" },
  truck_stop: { color: "#f59e0b", glyph: "⛟", label: "Truck Stop" },
  airport: { color: "#3b82f6", glyph: "✈", label: "Airport" },
  rail_yard: { color: "#a78bfa", glyph: "▦", label: "Rail" },
  port: { color: "#06b6d4", glyph: "⚓", label: "Port" },
  fuel: { color: "#f59e0b", glyph: "⛽", label: "Fuel" },
  maintenance: { color: "#fb7185", glyph: "🔧", label: "Maint." },
  store: { color: "#94a3b8", glyph: "🏬", label: "Store" },
  landmark: { color: "#fbbf24", glyph: "★", label: "Landmark" },
  water: { color: "#38bdf8", glyph: "≋", label: "Water" },
  custom: { color: "#0f172a", glyph: "📍", label: "Pin" },
};

function driverEl(driver: DispatchDriver): HTMLElement {
  const color = DRIVER_STATUS_COLOR[driver.status];
  const initials = (driver.driver_name || "??")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");
  const avatar = driver.avatar_url
    ? `<img src="${driver.avatar_url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%" />`
    : `<span style="font-size:12px;font-weight:700;color:#0f172a">${initials}</span>`;
  const el = document.createElement("div");
  el.className = "anderoute-driver-marker";
  el.style.cursor = "pointer";
  el.innerHTML = `
    <div style="position:relative;width:42px;height:52px;">
      <div style="
        width:36px;height:36px;border-radius:50%;
        background:white;border:3px solid ${color};
        box-shadow:0 4px 12px rgba(15,23,42,0.35);
        display:flex;align-items:center;justify-content:center;overflow:hidden;
        margin:0 auto;
      ">${avatar}</div>
      <div style="position:absolute;left:50%;bottom:0;transform:translateX(-50%);
        width:2px;height:14px;background:${color};"></div>
      <div style="position:absolute;left:50%;bottom:-3px;transform:translateX(-50%);
        width:8px;height:8px;border-radius:50%;background:${color};
        box-shadow:0 0 0 2px white;"></div>
    </div>`;
  return el;
}

function poiEl(cat: PoiCategory): HTMLElement {
  const s = POI_STYLE[cat];
  const el = document.createElement("div");
  el.className = "anderoute-poi-marker";
  el.style.cursor = "pointer";
  el.innerHTML = `<div style="
    width:28px;height:28px;border-radius:50% 50% 50% 0;
    background:${s.color};transform:rotate(-45deg);
    box-shadow:0 2px 8px rgba(15,23,42,0.35);
    border:2px solid white;display:flex;align-items:center;justify-content:center;
  "><span style="transform:rotate(45deg);font-size:12px;font-weight:700;color:white">${s.glyph}</span></div>`;
  return el;
}

export type DispatchLayerKey =
  | "drivers"
  | "loads"
  | "pickups"
  | "dropoffs"
  | "depots"
  | "warehouses"
  | "customers"
  | "truck_stops"
  | "fuel"
  | "maintenance"
  | "airports"
  | "ports"
  | "rail_yards"
  | "stores"
  | "landmarks"
  | "lakes"
  | "rivers"
  | "waterways"
  | "custom_pins"
  | "geofences"
  | "buildings_3d"
  | "traffic"
  | "weather";

interface Props {
  drivers: DispatchDriver[];
  pois: LogisticsPoi[];
  loads?: DispatchLoad[];
  selectedDriverId: string | null;
  onSelectDriver: (id: string | null) => void;
  selectedLoadId?: string | null;
  onSelectLoad?: (id: string | null) => void;
  mapRef: React.MutableRefObject<MLMap | null>;
  visibleLayers?: Set<DispatchLayerKey>;
}

const POI_LAYER_FOR_CATEGORY: Partial<Record<PoiCategory, DispatchLayerKey>> = {
  depot: "depots",
  warehouse: "warehouses",
  customer: "customers",
  airport: "airports",
  store: "stores",
  landmark: "landmarks",
  water: "waterways",
  truck_stop: "truck_stops",
  fuel: "fuel",
  maintenance: "maintenance",
  rail_yard: "rail_yards",
  port: "ports",
};

export function AnderouteDispatchMap({
  drivers,
  pois,
  loads = [],
  selectedDriverId,
  onSelectDriver,
  selectedLoadId = null,
  onSelectLoad,
  mapRef,
  visibleLayers,
}: Props) {
  const isLayerOn = (k: DispatchLayerKey) =>
    !visibleLayers || visibleLayers.has(k);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const mapDivRef = useRef<HTMLDivElement>(null);
  const driverMarkersRef = useRef<Map<string, MLMarker>>(new Map());
  const poiMarkersRef = useRef<Map<string, MLMarker>>(new Map());
  const stopMarkersRef = useRef<Map<string, MLMarker>>(new Map());
  const customPinMarkersRef = useRef<Map<string, MLMarker>>(new Map());

  const [styleReady, setStyleReady] = useState(false);
  const [pinMode, setPinMode] = useState(false);
  const [customPins, setCustomPins] = useState<{ id: string; lat: number; lng: number }[]>([]);

  const selected = drivers.find((d) => d.driver_id === selectedDriverId) ?? null;

  // --- Init MapLibre once
  useEffect(() => {
    if (!mapDivRef.current) return;
    const map = new maplibregl.Map({
      container: mapDivRef.current,
      style: MAP_STYLE,
      center: US_CENTER,
      zoom: US_ZOOM,
      pitch: 45,
      bearing: -12,
      attributionControl: { compact: true },
    });
    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-right");
    map.addControl(new maplibregl.ScaleControl({ unit: "imperial" }), "bottom-left");

    map.on("load", () => {
      // 3D building extrusion — works with vector styles whose tiles expose a building source-layer
      // (e.g. OpenFreeMap Liberty, OpenMapTiles). Safely no-ops for styles without it (e.g. demotiles).
      try {
        add3DBuildings(map);
      } catch {
        /* style may not expose a building source-layer — ignore */
      }




      // Empty GeoJSON source + layer for load routes
      if (!map.getSource("load-routes")) {
        map.addSource("load-routes", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });
        map.addLayer({
          id: "load-routes-line",
          type: "line",
          source: "load-routes",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": [
              "case",
              ["boolean", ["get", "selected"], false],
              "#0f172a",
              "#14b8a6",
            ],
            "line-width": [
              "case",
              ["boolean", ["get", "selected"], false],
              4,
              3,
            ],
            "line-opacity": [
              "case",
              ["boolean", ["get", "selected"], false],
              1,
              0.75,
            ],
            "line-dasharray": [
              "case",
              ["boolean", ["get", "selected"], false],
              ["literal", [1]],
              ["literal", [2, 2]],
            ],
          },
        });
      }

      // Driver → pickup connector
      if (!map.getSource("driver-connector")) {
        map.addSource("driver-connector", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });
        map.addLayer({
          id: "driver-connector-line",
          type: "line",
          source: "driver-connector",
          paint: {
            "line-color": "#f97316",
            "line-width": 3,
            "line-dasharray": [1.5, 2],
          },
        });
      }

      setStyleReady(true);
    });

    // Pin-drop interaction
    map.on("click", (e) => {
      if (!pinModeRef.current) return;
      setCustomPins((p) => [
        ...p,
        { id: `${Date.now()}`, lat: e.lngLat.lat, lng: e.lngLat.lng },
      ]);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep latest pinMode in a ref so the click handler closure stays valid.
  const pinModeRef = useRef(pinMode);
  useEffect(() => {
    pinModeRef.current = pinMode;
  }, [pinMode]);

  // --- Driver markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !styleReady) return;
    const bag = driverMarkersRef.current;
    const show = isLayerOn("drivers");
    const seen = new Set<string>();
    if (show) {
      drivers.forEach((d) => {
        seen.add(d.driver_id);
        const existing = bag.get(d.driver_id);
        if (existing) {
          existing.setLngLat([d.longitude, d.latitude]);
          const el = existing.getElement();
          const ring = el.querySelector("div > div") as HTMLElement | null;
          if (ring) ring.style.borderColor = DRIVER_STATUS_COLOR[d.status];
          return;
        }
        const el = driverEl(d);
        el.addEventListener("click", (ev) => {
          ev.stopPropagation();
          onSelectDriver(d.driver_id);
          navigate({ to: "/drivers/$driverId", params: { driverId: d.driver_id } });
        });
        const m = new maplibregl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([d.longitude, d.latitude])
          .addTo(map);
        bag.set(d.driver_id, m);
      });
    }
    [...bag.keys()].forEach((id) => {
      if (!seen.has(id)) {
        bag.get(id)?.remove();
        bag.delete(id);
      }
    });
  }, [drivers, styleReady, mapRef, onSelectDriver, visibleLayers, navigate]);

  // --- POI markers (filtered by per-category layer toggles)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !styleReady) return;
    const bag = poiMarkersRef.current;
    const seen = new Set<string>();
    pois.forEach((p) => {
      const layerKey = POI_LAYER_FOR_CATEGORY[p.category];
      if (layerKey && !isLayerOn(layerKey)) return;
      seen.add(p.id);
      const existing = bag.get(p.id);
      if (existing) {
        existing.setLngLat([p.longitude, p.latitude]);
        return;
      }
      const m = new maplibregl.Marker({ element: poiEl(p.category), anchor: "bottom" })
        .setLngLat([p.longitude, p.latitude])
        .setPopup(
          new maplibregl.Popup({ offset: 24 }).setHTML(
            `<div style="font-size:12px"><div style="font-weight:600">${p.name}</div><div style="color:#64748b">${POI_STYLE[p.category].label}</div></div>`,
          ),
        )
        .addTo(map);
      bag.set(p.id, m);
    });
    [...bag.keys()].forEach((id) => {
      if (!seen.has(id)) {
        bag.get(id)?.remove();
        bag.delete(id);
      }
    });
  }, [pois, styleReady, mapRef, visibleLayers]);

  // --- Load pickup/dropoff markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !styleReady) return;
    const bag = stopMarkersRef.current;
    const seen = new Set<string>();
    if (isLayerOn("loads")) {
      loads.forEach((load) => {
        load.stops.forEach((s) => {
          if (s.latitude == null || s.longitude == null) return;
          seen.add(s.id);
          if (bag.has(s.id)) {
            bag.get(s.id)!.setLngLat([s.longitude, s.latitude]);
            return;
          }
          const el = poiEl(s.kind === "pickup" ? "load_pickup" : "load_dropoff");
          el.addEventListener("click", (ev) => {
            ev.stopPropagation();
            onSelectLoad?.(load.id);
          });
          const m = new maplibregl.Marker({ element: el, anchor: "bottom" })
            .setLngLat([s.longitude, s.latitude])
            .setPopup(
              new maplibregl.Popup({ offset: 24 }).setHTML(
                `<div style="font-size:12px">
                  <div style="font-weight:600">${s.kind === "pickup" ? "Pickup" : "Drop-off"} · ${s.name ?? load.customer ?? "Stop"}</div>
                  <div style="color:#64748b">${[s.address, s.city, s.region].filter(Boolean).join(", ")}</div>
                  <div style="margin-top:4px;color:#64748b">Load #${load.id.slice(0, 8)} · ${load.commodity ?? "—"}</div>
                </div>`,
              ),
            )
            .addTo(map);
          bag.set(s.id, m);
        });
      });
    }
    [...bag.keys()].forEach((id) => {
      if (!seen.has(id)) {
        bag.get(id)?.remove();
        bag.delete(id);
      }
    });
  }, [loads, styleReady, mapRef, onSelectLoad, visibleLayers]);

  // --- Route lines (GeoJSON)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !styleReady) return;
    const src = map.getSource("load-routes") as maplibregl.GeoJSONSource | undefined;
    if (!src) return;
    const features = loads
      .map((load) => {
        const pts = load.stops
          .filter((s) => s.latitude != null && s.longitude != null)
          .sort((a, b) => a.sequence - b.sequence)
          .map((s) => [s.longitude as number, s.latitude as number]);
        if (pts.length < 2) return null;
        return {
          type: "Feature" as const,
          properties: { loadId: load.id, selected: load.id === selectedLoadId },
          geometry: { type: "LineString" as const, coordinates: pts },
        };
      })
      .filter(Boolean) as GeoJSON.Feature[];
    src.setData({ type: "FeatureCollection", features });
  }, [loads, selectedLoadId, styleReady, mapRef]);

  // --- Driver → pickup connector
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !styleReady) return;
    const src = map.getSource("driver-connector") as maplibregl.GeoJSONSource | undefined;
    if (!src) return;
    if (!selected) {
      src.setData({ type: "FeatureCollection", features: [] });
      return;
    }
    const driverLoad = loads.find((l) => l.assigned_driver_id === selected.driver_id);
    const pickup = driverLoad?.stops.find(
      (s) => s.kind === "pickup" && s.latitude != null && s.longitude != null,
    );
    if (!pickup) {
      src.setData({ type: "FeatureCollection", features: [] });
      return;
    }
    src.setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [selected.longitude, selected.latitude],
              [pickup.longitude as number, pickup.latitude as number],
            ],
          },
        },
      ],
    });
  }, [selected, loads, styleReady, mapRef]);

  // --- Custom pins
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !styleReady) return;
    const bag = customPinMarkersRef.current;
    const seen = new Set<string>();
    if (isLayerOn("custom_pins")) {
      customPins.forEach((p) => {
        seen.add(p.id);
        if (bag.has(p.id)) return;
        const m = new maplibregl.Marker({ element: poiEl("custom"), anchor: "bottom" })
          .setLngLat([p.lng, p.lat])
          .setPopup(
            new maplibregl.Popup({ offset: 24 }).setHTML(
              `<div style="font-size:12px">Custom pin<br/>${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}</div>`,
            ),
          )
          .addTo(map);
        bag.set(p.id, m);
      });
    }
    [...bag.keys()].forEach((id) => {
      if (!seen.has(id)) {
        bag.get(id)?.remove();
        bag.delete(id);
      }
    });
  }, [customPins, styleReady, mapRef, visibleLayers]);

  // --- 3D buildings layer toggle
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !styleReady) return;
    if (!map.getLayer("anderoute-3d-buildings")) return;
    map.setLayoutProperty(
      "anderoute-3d-buildings",
      "visibility",
      isLayerOn("buildings_3d") ? "visible" : "none",
    );
  }, [visibleLayers, styleReady, mapRef]);

  const onLocate = () => {
    if (!navigator.geolocation || !mapRef.current) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      mapRef.current?.flyTo({
        center: [pos.coords.longitude, pos.coords.latitude],
        zoom: 12,
        pitch: 55,
        duration: 1200,
      });
    });
  };

  const onFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  return (
    <div ref={containerRef} className="relative h-full w-full bg-slate-200">
      <div ref={mapDivRef} className="h-full w-full" />

      <MapLayerControls
        pinMode={pinMode}
        onLocate={onLocate}
        onTogglePin={() => setPinMode((p) => !p)}
        onClearPins={() => {
          customPinMarkersRef.current.forEach((m) => m.remove());
          customPinMarkersRef.current.clear();
          setCustomPins([]);
        }}
        onFullscreen={onFullscreen}
      />

      <MapStatusLegend />

      {pinMode && (
        <div className="absolute left-1/2 top-4 z-[450] -translate-x-1/2 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
          Click the map to drop a pin
        </div>
      )}

      {selected && (
        <SelectedDriverMapCard
          driver={selected}
          onClose={() => onSelectDriver(null)}
        />
      )}
    </div>
  );
}
