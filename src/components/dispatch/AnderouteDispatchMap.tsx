import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  LayerGroup,
  useMap,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { DispatchDriver } from "@/types/dispatch";
import type { LogisticsPoi, PoiCategory } from "@/types/map";
import { DRIVER_STATUS_COLOR } from "./dispatchTokens";
import { MapStatusLegend } from "./MapStatusLegend";
import { MapLayerControls } from "./MapLayerControls";
import { SelectedDriverMapCard } from "./SelectedDriverMapCard";

const US_CENTER: [number, number] = [39.8283, -98.5795];
const US_ZOOM = 5;

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

function avatarDriverIcon(driver: DispatchDriver) {
  const color = DRIVER_STATUS_COLOR[driver.status];
  const initials = (driver.driver_name || "??")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");
  const avatar = driver.avatar_url
    ? `<img src="${driver.avatar_url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%" />`
    : `<span style="font-size:12px;font-weight:700;color:#0f172a">${initials}</span>`;

  return L.divIcon({
    className: "anderoute-driver-marker",
    html: `
      <div style="position:relative;width:42px;height:52px;">
        <div style="
          width:36px;height:36px;border-radius:50%;
          background:white;border:3px solid ${color};
          box-shadow:0 4px 12px rgba(15,23,42,0.25);
          display:flex;align-items:center;justify-content:center;overflow:hidden;
          margin:0 auto;
        ">${avatar}</div>
        <div style="
          position:absolute;left:50%;bottom:0;transform:translateX(-50%);
          width:2px;height:14px;background:${color};
        "></div>
        <div style="
          position:absolute;left:50%;bottom:-3px;transform:translateX(-50%);
          width:8px;height:8px;border-radius:50%;background:${color};
          box-shadow:0 0 0 2px white;
        "></div>
      </div>`,
    iconSize: [42, 52],
    iconAnchor: [21, 50],
    popupAnchor: [0, -48],
  });
}

function poiIcon(cat: PoiCategory) {
  const s = POI_STYLE[cat];
  return L.divIcon({
    className: "anderoute-poi-marker",
    html: `<div style="
      width:28px;height:28px;border-radius:50% 50% 50% 0;
      background:${s.color};transform:rotate(-45deg);
      box-shadow:0 2px 8px rgba(15,23,42,0.3);
      border:2px solid white;display:flex;align-items:center;justify-content:center;
    "><span style="transform:rotate(45deg);font-size:12px;font-weight:700;color:white">${s.glyph}</span></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });
}

function LocateControl({ trigger }: { trigger: number }) {
  const map = useMap();
  useEffect(() => {
    if (trigger === 0) return;
    map.locate({ setView: true, maxZoom: 12 });
  }, [trigger, map]);
  return null;
}

function PinPlacer({
  enabled,
  onPlace,
}: {
  enabled: boolean;
  onPlace: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      if (enabled) onPlace(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface Props {
  drivers: DispatchDriver[];
  pois: LogisticsPoi[];
  selectedDriverId: string | null;
  onSelectDriver: (id: string | null) => void;
  mapRef: React.MutableRefObject<L.Map | null>;
}

export function AnderouteDispatchMap({
  drivers,
  pois,
  selectedDriverId,
  onSelectDriver,
  mapRef,
}: Props) {
  const [pinMode, setPinMode] = useState(false);
  const [customPins, setCustomPins] = useState<{ id: string; lat: number; lng: number }[]>([]);
  const [locateTick, setLocateTick] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = drivers.find((d) => d.driver_id === selectedDriverId) ?? null;

  const onFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  return (
    <div ref={containerRef} className="relative h-full w-full bg-slate-200">
      <MapContainer
        center={US_CENTER}
        zoom={US_ZOOM}
        minZoom={3}
        maxZoom={19}
        zoomControl={false}
        className="h-full w-full"
        ref={(m) => {
          if (m) mapRef.current = m;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />

        <LocateControl trigger={locateTick} />
        <PinPlacer
          enabled={pinMode}
          onPlace={(lat, lng) =>
            setCustomPins((p) => [...p, { id: `${Date.now()}`, lat, lng }])
          }
        />

        <LayerGroup>
          {drivers.map((d) => (
            <Marker
              key={d.driver_id}
              position={[d.latitude, d.longitude]}
              icon={avatarDriverIcon(d)}
              eventHandlers={{ click: () => onSelectDriver(d.driver_id) }}
            >
              <Popup>
                <div className="text-xs">
                  <div className="font-semibold">{d.driver_name}</div>
                  <div className="text-slate-500">
                    Unit {d.unit_number} · {d.vehicle_type}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>

        <LayerGroup>
          {pois.map((p) => (
            <Marker key={p.id} position={[p.latitude, p.longitude]} icon={poiIcon(p.category)}>
              <Popup>
                <div className="text-xs">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-slate-500">{POI_STYLE[p.category].label}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>

        <LayerGroup>
          {customPins.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={poiIcon("custom")}>
              <Popup>
                Custom pin<br />
                {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
              </Popup>
            </Marker>
          ))}
        </LayerGroup>

        {/* Route placeholder: selected driver → first pickup → first dropoff */}
        {selected &&
          (() => {
            const pickup = pois.find((p) => p.category === "load_pickup");
            const dropoff = pois.find((p) => p.category === "load_dropoff");
            if (!pickup) return null;
            return (
              <>
                <Polyline
                  positions={[
                    [selected.latitude, selected.longitude],
                    [pickup.latitude, pickup.longitude],
                  ]}
                  pathOptions={{ color: "#f97316", weight: 3, dashArray: "6 6" }}
                />
                {dropoff && (
                  <Polyline
                    positions={[
                      [pickup.latitude, pickup.longitude],
                      [dropoff.latitude, dropoff.longitude],
                    ]}
                    pathOptions={{ color: "#14b8a6", weight: 3 }}
                  />
                )}
              </>
            );
          })()}
      </MapContainer>

      <MapLayerControls
        pinMode={pinMode}
        onLocate={() => setLocateTick((t) => t + 1)}
        onTogglePin={() => setPinMode((p) => !p)}
        onClearPins={() => setCustomPins([])}
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
