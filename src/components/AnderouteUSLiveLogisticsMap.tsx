/**
 * AnderouteUSLiveLogisticsMap
 *
 * Full-screen US logistics command map built on Leaflet + OpenStreetMap.
 *
 * Production warnings:
 *  - Public OSM tiles (tile.openstreetmap.org) are fine for dev/testing only.
 *    For production traffic, use a paid tile provider or self-host
 *    OpenMapTiles / OpenFreeMap.
 *  - Never expose Supabase service role keys in the browser. This component
 *    only uses the public anon key via the shared client.
 *  - Keep RLS enabled on driver_location_current and logistics_map_pois.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  LayerGroup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLiveDriverCurrent } from "@/hooks/useLiveDriverLocations";
import { useLogisticsMapPois } from "@/hooks/useLogisticsMapPois";
import { searchMapLocation, type SearchResult } from "@/services/mapSearchService";
import type {
  DriverStatus,
  LayerKey,
  LiveDriver,
  LogisticsPoi,
  PoiCategory,
} from "@/types/map";
import {
  Search,
  Crosshair,
  MapPin,
  Trash2,
  Wifi,
  WifiOff,
  Truck,
} from "lucide-react";

const US_CENTER: [number, number] = [39.8283, -98.5795];
const US_ZOOM = 5;

const DRIVER_COLORS: Record<DriverStatus, string> = {
  available: "#22c55e",
  assigned: "#3b82f6",
  loaded: "#f97316",
  break: "#a855f7",
  alert: "#ef4444",
  offline: "#64748b",
};

const POI_STYLE: Record<PoiCategory, { color: string; shape: string; label: string }> = {
  load_pickup: { color: "#f97316", shape: "■", label: "Pickup" },
  load_dropoff: { color: "#14b8a6", shape: "■", label: "Dropoff" },
  warehouse: { color: "#94a3b8", shape: "▣", label: "Warehouse" },
  depot: { color: "#14b8a6", shape: "◆", label: "Depot" },
  customer: { color: "#e2e8f0", shape: "●", label: "Customer" },
  truck_stop: { color: "#f59e0b", shape: "⛟", label: "Truck Stop" },
  airport: { color: "#3b82f6", shape: "✈", label: "Airport" },
  rail_yard: { color: "#a78bfa", shape: "▦", label: "Rail Yard" },
  port: { color: "#06b6d4", shape: "⚓", label: "Port" },
  fuel: { color: "#f59e0b", shape: "⛽", label: "Fuel" },
  maintenance: { color: "#fb7185", shape: "🔧", label: "Maintenance" },
  store: { color: "#e2e8f0", shape: "🏬", label: "Store" },
  landmark: { color: "#fbbf24", shape: "★", label: "Landmark" },
  water: { color: "#38bdf8", shape: "≋", label: "Water" },
  custom: { color: "#0f172a", shape: "📍", label: "Pin" },
};

const POI_LAYER_MAP: Record<PoiCategory, LayerKey> = {
  load_pickup: "loads",
  load_dropoff: "loads",
  warehouse: "warehouses",
  depot: "depots",
  customer: "customers",
  truck_stop: "truck_stops",
  airport: "airports",
  rail_yard: "rail_yards",
  port: "ports",
  fuel: "fuel",
  maintenance: "maintenance",
  store: "stores",
  landmark: "landmarks",
  water: "water",
  custom: "custom",
};

const ALL_LAYERS: { key: LayerKey; label: string }[] = [
  { key: "drivers", label: "Drivers" },
  { key: "loads", label: "Loads" },
  { key: "warehouses", label: "Warehouses" },
  { key: "depots", label: "Depots" },
  { key: "customers", label: "Customers" },
  { key: "truck_stops", label: "Truck Stops" },
  { key: "airports", label: "Airports" },
  { key: "rail_yards", label: "Rail Yards" },
  { key: "ports", label: "Ports" },
  { key: "fuel", label: "Fuel" },
  { key: "maintenance", label: "Maintenance" },
  { key: "stores", label: "Stores" },
  { key: "landmarks", label: "Landmarks" },
  { key: "water", label: "Water" },
  { key: "custom", label: "Custom Pins" },
];

const ALL_STATUSES: DriverStatus[] = [
  "available",
  "assigned",
  "loaded",
  "break",
  "alert",
  "offline",
];

function divIcon(color: string, glyph: string, size = 28) {
  return L.divIcon({
    className: "anderoute-marker",
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:${color};color:#0b1220;display:flex;align-items:center;
      justify-content:center;font-weight:700;font-size:${Math.round(size * 0.5)}px;
      box-shadow:0 0 0 2px rgba(15,23,42,0.9), 0 0 14px ${color}aa;
      border:2px solid rgba(255,255,255,0.85);
    ">${glyph}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function driverIcon(status: DriverStatus) {
  return divIcon(DRIVER_COLORS[status], "▲", 30);
}

function poiIcon(cat: PoiCategory) {
  const s = POI_STYLE[cat];
  return divIcon(s.color, s.shape, 26);
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

export function AnderouteUSLiveLogisticsMap() {
  const { drivers, connected } = useLiveDriverLocations();
  const pois = useLogisticsMapPois();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeLayers, setActiveLayers] = useState<Set<LayerKey>>(
    new Set(ALL_LAYERS.map((l) => l.key)),
  );
  const [activeStatuses, setActiveStatuses] = useState<Set<DriverStatus>>(
    new Set(ALL_STATUSES),
  );
  const [customPins, setCustomPins] = useState<{ id: string; lat: number; lng: number }[]>([]);
  const [pinMode, setPinMode] = useState(false);
  const [locateTick, setLocateTick] = useState(0);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const toggleLayer = (k: LayerKey) =>
    setActiveLayers((prev) => {
      const n = new Set(prev);
      n.has(k) ? n.delete(k) : n.add(k);
      return n;
    });

  const toggleStatus = (s: DriverStatus) =>
    setActiveStatuses((prev) => {
      const n = new Set(prev);
      n.has(s) ? n.delete(s) : n.add(s);
      return n;
    });

  const filteredDrivers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return drivers.filter((d) => {
      if (!activeStatuses.has(d.status)) return false;
      if (!q) return true;
      return (
        d.driver_name?.toLowerCase().includes(q) ||
        d.unit_number?.toLowerCase().includes(q) ||
        d.current_load_number?.toLowerCase().includes(q)
      );
    });
  }, [drivers, search, activeStatuses]);

  const filteredPois = useMemo(
    () => pois.filter((p) => activeLayers.has(POI_LAYER_MAP[p.category])),
    [pois, activeLayers],
  );

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await searchMapLocation(search);
    setResults(r);
  };

  const flyTo = (lat: number, lng: number, zoom = 11) => {
    mapRef.current?.flyTo([lat, lng], zoom, { duration: 0.8 });
  };

  const selectedDriver = drivers.find((d) => d.driver_id === selectedDriverId);

  return (
    <div className="fixed inset-0 flex bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-[340px] shrink-0 border-r border-slate-800 bg-slate-900/95 backdrop-blur flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-md bg-teal-500/20 ring-1 ring-teal-400/40 grid place-items-center">
              <Truck className="size-4 text-teal-300" />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-wide">ANDEROUTE</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                US Live Logistics Map
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1 text-[10px]">
              {connected ? (
                <>
                  <Wifi className="size-3 text-teal-400" />
                  <span className="text-teal-300">LIVE</span>
                </>
              ) : (
                <>
                  <WifiOff className="size-3 text-slate-500" />
                  <span className="text-slate-400">OFFLINE</span>
                </>
              )}
            </div>
          </div>

          <form onSubmit={onSearch} className="mt-3 relative">
            <Search className="size-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Address, city, driver, unit, load, customer…"
              className="w-full bg-slate-950 border border-slate-800 rounded-md text-xs pl-8 pr-2 py-2 placeholder:text-slate-500 focus:outline-none focus:border-teal-500/60"
            />
          </form>
          {results.length > 0 && (
            <div className="mt-2 space-y-1">
              {results.map((r, i) => (
                <button
                  key={i}
                  onClick={() => flyTo(r.lat, r.lng)}
                  className="w-full text-left text-[11px] px-2 py-1 rounded border border-slate-800 hover:border-teal-500/40 text-slate-300"
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-1.5 p-3 border-b border-slate-800">
          <button
            onClick={() => setLocateTick((t) => t + 1)}
            className="flex-1 flex items-center justify-center gap-1.5 text-[11px] rounded-md border border-slate-700 hover:border-teal-500/50 hover:bg-teal-500/5 py-1.5"
          >
            <Crosshair className="size-3" /> Locate
          </button>
          <button
            onClick={() => setPinMode((p) => !p)}
            className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] rounded-md border py-1.5 ${
              pinMode
                ? "border-orange-500/60 bg-orange-500/10 text-orange-300"
                : "border-slate-700 hover:border-orange-500/40"
            }`}
          >
            <MapPin className="size-3" /> {pinMode ? "Click map" : "Add pin"}
          </button>
          <button
            onClick={() => setCustomPins([])}
            className="flex-1 flex items-center justify-center gap-1.5 text-[11px] rounded-md border border-slate-700 hover:border-rose-500/50 hover:bg-rose-500/5 py-1.5"
          >
            <Trash2 className="size-3" /> Clear
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Status filters */}
          <section>
            <h2 className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">
              Driver Status
            </h2>
            <div className="grid grid-cols-2 gap-1.5">
              {ALL_STATUSES.map((s) => {
                const active = activeStatuses.has(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleStatus(s)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded border text-[11px] ${
                      active
                        ? "border-slate-600 bg-slate-800/60"
                        : "border-slate-800 text-slate-500"
                    }`}
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ background: DRIVER_COLORS[s] }}
                    />
                    {s}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Layer toggles */}
          <section>
            <h2 className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">
              Map Layers
            </h2>
            <div className="grid grid-cols-2 gap-1.5">
              {ALL_LAYERS.map((l) => {
                const active = activeLayers.has(l.key);
                return (
                  <button
                    key={l.key}
                    onClick={() => toggleLayer(l.key)}
                    className={`px-2 py-1 rounded border text-[11px] text-left ${
                      active
                        ? "border-teal-500/40 bg-teal-500/5 text-teal-200"
                        : "border-slate-800 text-slate-500"
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Fleet list */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[10px] uppercase tracking-wider text-slate-400">
                Fleet
              </h2>
              <span className="text-[10px] text-slate-500">
                {filteredDrivers.length}/{drivers.length}
              </span>
            </div>
            <div className="space-y-1">
              {filteredDrivers.length === 0 && (
                <p className="text-[11px] text-slate-500 italic">
                  No drivers — connect <code>driver_location_current</code>.
                </p>
              )}
              {filteredDrivers.map((d) => (
                <button
                  key={d.driver_id}
                  onClick={() => {
                    setSelectedDriverId(d.driver_id);
                    flyTo(d.latitude, d.longitude, 11);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded-md border border-slate-800 hover:border-teal-500/40 bg-slate-950/60"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2 rounded-full shrink-0"
                      style={{ background: DRIVER_COLORS[d.status] }}
                    />
                    <span className="text-xs font-medium truncate">
                      {d.driver_name || "Driver"}
                    </span>
                    <span className="ml-auto text-[10px] text-slate-400">
                      {d.unit_number}
                    </span>
                  </div>
                  <div className="flex gap-2 text-[10px] text-slate-400 mt-0.5">
                    <span>{d.vehicle_type}</span>
                    <span>· {Math.round(d.speed_mph ?? 0)} mph</span>
                    {d.current_load_number && <span>· {d.current_load_number}</span>}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* POIs */}
          <section>
            <h2 className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">
              POI Categories
            </h2>
            <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400">
              {Object.entries(POI_STYLE).map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5">
                  <span style={{ color: v.color }}>{v.shape}</span> {v.label}
                </div>
              ))}
            </div>
          </section>
        </div>
      </aside>

      {/* Map */}
      <main className="flex-1 relative">
        <MapContainer
          center={US_CENTER}
          zoom={US_ZOOM}
          minZoom={3}
          maxZoom={19}
          className="h-full w-full"
          ref={(m) => {
            if (m) mapRef.current = m;
          }}
        >
          {/* Public OSM tiles — dev only. Swap for self-hosted/paid in prod. */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocateControl trigger={locateTick} />
          <PinPlacer
            enabled={pinMode}
            onPlace={(lat, lng) =>
              setCustomPins((p) => [...p, { id: `${Date.now()}`, lat, lng }])
            }
          />

          {activeLayers.has("drivers") && (
            <LayerGroup>
              {filteredDrivers.map((d) => (
                <Marker
                  key={d.driver_id}
                  position={[d.latitude, d.longitude]}
                  icon={driverIcon(d.status)}
                  eventHandlers={{ click: () => setSelectedDriverId(d.driver_id) }}
                >
                  <Popup>
                    <DriverPopup d={d} />
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          )}

          <LayerGroup>
            {filteredPois.map((p) => (
              <Marker
                key={p.id}
                position={[p.latitude, p.longitude]}
                icon={poiIcon(p.category)}
              >
                <Popup>
                  <div className="text-xs">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-slate-500">
                      {POI_STYLE[p.category].label}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </LayerGroup>

          {activeLayers.has("custom") && (
            <LayerGroup>
              {customPins.map((p) => (
                <Marker
                  key={p.id}
                  position={[p.lat, p.lng]}
                  icon={poiIcon("custom")}
                >
                  <Popup>
                    Custom pin<br />
                    {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          )}

          {/* Placeholder route: selected driver -> first load pickup POI */}
          {selectedDriver &&
            (() => {
              const pickup = pois.find((p) => p.category === "load_pickup");
              const dropoff = pois.find((p) => p.category === "load_dropoff");
              if (!pickup) return null;
              return (
                <>
                  <Polyline
                    positions={[
                      [selectedDriver.latitude, selectedDriver.longitude],
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

        {pinMode && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] rounded-md bg-orange-500/90 px-3 py-1.5 text-xs font-medium text-slate-950 shadow-lg">
            Click anywhere on the map to drop a pin
          </div>
        )}
      </main>
    </div>
  );
}

function DriverPopup({ d }: { d: LiveDriver }) {
  const Row = ({ k, v }: { k: string; v: React.ReactNode }) => (
    <div className="flex justify-between gap-3 text-[11px]">
      <span className="text-slate-500">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
  return (
    <div className="min-w-[200px] space-y-0.5">
      <div className="text-sm font-semibold">{d.driver_name || "Driver"}</div>
      <div className="text-[10px] text-slate-500 mb-1.5">
        Unit {d.unit_number} · {d.vehicle_type}
      </div>
      <Row k="Status" v={d.status} />
      <Row k="Speed" v={`${Math.round(d.speed_mph ?? 0)} mph`} />
      <Row k="ETA" v={`${d.eta_minutes ?? "—"} min`} />
      <Row k="Load" v={d.current_load_number ?? "—"} />
      <Row k="Battery" v={d.battery_pct != null ? `${d.battery_pct}%` : "—"} />
      <Row k="Signal" v={d.signal ?? "—"} />
      <Row k="Last ping" v={new Date(d.last_ping_at).toLocaleTimeString()} />
    </div>
  );
}

export default AnderouteUSLiveLogisticsMap;
