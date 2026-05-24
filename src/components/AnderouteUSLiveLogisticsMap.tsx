/**
 * AnderouteUSLiveLogisticsMap
 *
 * Dispatch-board shell over a full Leaflet + OpenStreetMap canvas.
 *
 * Layout:
 *   ┌──────┬─────────────────────────────────────────────────────┐
 *   │      │  Top header: search, notifications, user, +Add      │
 *   │ Icon ├─────────────────────────────────────────────────────┤
 *   │ Nav  │  Date controls · status legend · view tabs          │
 *   │      ├──────────────┬──────────────────────────────────────┤
 *   │      │ Driver list  │  Live Leaflet/OpenStreetMap map      │
 *   └──────┴──────────────┴──────────────────────────────────────┘
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
  LayoutGrid,
  Clock,
  Folder,
  ClipboardList,
  Percent,
  DollarSign,
  Wallet,
  Wrench,
  Package,
  Users,
  User,
  Settings,
  Plus,
  Bell,
  MessageCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Columns,
  List as ListIcon,
  Map as MapIcon,
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

const ALL_STATUSES: DriverStatus[] = [
  "available",
  "assigned",
  "loaded",
  "break",
  "alert",
  "offline",
];

const STATUS_LABEL: Record<DriverStatus, string> = {
  available: "Available",
  assigned: "Assigned",
  loaded: "Loaded",
  break: "Break",
  alert: "Alert",
  offline: "Offline",
};

type ViewTab = "timeline" | "week" | "list" | "map";

const NAV_ITEMS = [
  { icon: MapIcon, label: "Dispatch", active: true },
  { icon: LayoutGrid, label: "Overview" },
  { icon: Clock, label: "Schedule" },
  { icon: Folder, label: "Loads" },
  { icon: ClipboardList, label: "Jobs" },
  { icon: Percent, label: "Rates" },
  { icon: ClipboardList, label: "Invoices" },
  { icon: DollarSign, label: "Billing" },
  { icon: Wallet, label: "Wallet" },
  { icon: MapPin, label: "Map" },
  { icon: Wrench, label: "Maintenance" },
  { icon: Package, label: "Fleet" },
  { icon: Users, label: "Team" },
  { icon: User, label: "Drivers" },
  { icon: User, label: "Customers" },
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
  const { drivers, connected } = useLiveDriverCurrent();
  const pois = useLogisticsMapPois();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeStatuses, setActiveStatuses] = useState<Set<DriverStatus>>(
    new Set(ALL_STATUSES),
  );
  const [activeLayers] = useState<Set<LayerKey>>(
    new Set<LayerKey>([
      "drivers",
      "loads",
      "warehouses",
      "depots",
      "customers",
      "truck_stops",
      "airports",
      "rail_yards",
      "ports",
      "fuel",
      "maintenance",
      "stores",
      "landmarks",
      "water",
      "custom",
    ]),
  );
  const [customPins, setCustomPins] = useState<{ id: string; lat: number; lng: number }[]>([]);
  const [pinMode, setPinMode] = useState(false);
  const [locateTick, setLocateTick] = useState(0);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [view, setView] = useState<ViewTab>("map");
  const [date, setDate] = useState(() => new Date());
  const mapRef = useRef<L.Map | null>(null);

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

  const shiftDate = (delta: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + delta);
    setDate(d);
  };

  const dateLabel = `Today, ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })}`;

  return (
    <div className="fixed inset-0 flex bg-slate-100 text-slate-900">
      {/* === Icon Nav Bar === */}
      <nav className="w-14 shrink-0 bg-slate-900 flex flex-col items-center py-3 gap-1">
        <div className="size-9 rounded-lg bg-teal-500 grid place-items-center mb-2 shadow-lg shadow-teal-500/30">
          <Truck className="size-5 text-slate-900" />
        </div>
        {NAV_ITEMS.map((it, i) => {
          const Icon = it.icon;
          return (
            <button
              key={i}
              title={it.label}
              className={`size-10 grid place-items-center rounded-lg transition ${
                it.active
                  ? "bg-teal-500/15 text-teal-300 ring-1 ring-teal-500/40"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <Icon className="size-4" />
            </button>
          );
        })}
        <button
          title="Settings"
          className="mt-auto size-10 grid place-items-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200"
        >
          <Settings className="size-4" />
        </button>
      </nav>

      {/* === Main column === */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="h-14 shrink-0 bg-white border-b border-slate-200 flex items-center gap-4 px-5">
          <h1 className="text-base font-semibold tracking-tight">Dispatch Board</h1>
          <form onSubmit={onSearch} className="flex-1 max-w-2xl mx-auto relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search drivers, units, loads, customers…"
              className="w-full h-9 rounded-full bg-slate-100 border border-transparent text-sm pl-10 pr-3 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-300"
            />
          </form>
          <div className="flex items-center gap-2">
            <button className="size-9 grid place-items-center rounded-full hover:bg-slate-100 text-slate-500">
              <HelpCircle className="size-4" />
            </button>
            <button className="relative size-9 grid place-items-center rounded-full hover:bg-slate-100 text-slate-500">
              <MessageCircle className="size-4" />
              <span className="absolute top-1 right-1 size-4 rounded-full bg-orange-500 text-[9px] font-bold text-white grid place-items-center">
                5
              </span>
            </button>
            <button className="relative size-9 grid place-items-center rounded-full hover:bg-slate-100 text-slate-500">
              <Bell className="size-4" />
              <span className="absolute top-1 right-1 size-4 rounded-full bg-rose-500 text-[9px] font-bold text-white grid place-items-center">
                12
              </span>
            </button>
            <div className="size-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 ring-2 ring-white shadow" />
            <button className="ml-2 h-9 px-3.5 rounded-full bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium flex items-center gap-1.5 shadow-sm">
              <Plus className="size-4" /> Add Load
            </button>
          </div>
        </header>

        {/* Controls strip */}
        <div className="h-14 shrink-0 bg-white border-b border-slate-200 flex items-center gap-4 px-5">
          <div className="flex items-center gap-1">
            <button
              onClick={() => shiftDate(-1)}
              className="size-8 grid place-items-center rounded-md hover:bg-slate-100 text-slate-500"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="h-8 px-3 rounded-md border border-slate-200 flex items-center gap-2 text-sm">
              <Calendar className="size-3.5 text-slate-400" />
              <span className="font-medium">{dateLabel}</span>
            </div>
            <button
              onClick={() => shiftDate(1)}
              className="size-8 grid place-items-center rounded-md hover:bg-slate-100 text-slate-500"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          {/* Status legend */}
          <div className="flex items-center gap-3 mx-auto">
            {ALL_STATUSES.map((s) => {
              const on = activeStatuses.has(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleStatus(s)}
                  className={`flex items-center gap-1.5 text-xs ${
                    on ? "text-slate-700" : "text-slate-400"
                  }`}
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ background: DRIVER_COLORS[s] }}
                  />
                  {STATUS_LABEL[s]}
                </button>
              );
            })}
          </div>

          {/* View tabs */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg border border-slate-200 bg-slate-50">
            {[
              { k: "timeline", icon: Columns, label: "Timeline" },
              { k: "week", icon: Calendar, label: "Week" },
              { k: "list", icon: ListIcon, label: "List" },
              { k: "map", icon: MapIcon, label: "Map" },
            ].map(({ k, icon: Icon, label }) => (
              <button
                key={k}
                onClick={() => setView(k as ViewTab)}
                className={`h-7 px-3 rounded-md text-xs flex items-center gap-1.5 ${
                  view === k
                    ? "bg-white shadow-sm text-teal-600 font-medium"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Icon className="size-3.5" />
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-[10px]">
            {connected ? (
              <>
                <Wifi className="size-3 text-emerald-500" />
                <span className="text-emerald-600 font-medium">LIVE</span>
              </>
            ) : (
              <>
                <WifiOff className="size-3 text-slate-400" />
                <span className="text-slate-400">OFFLINE</span>
              </>
            )}
          </div>
        </div>

        {/* Body: driver sidebar + map */}
        <div className="flex-1 flex min-h-0">
          {/* Driver sidebar */}
          <aside className="w-[320px] shrink-0 bg-white border-r border-slate-200 flex flex-col">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-700">
                Fleet ({filteredDrivers.length})
              </div>
              <span className="text-[10px] text-slate-400">
                of {drivers.length}
              </span>
            </div>
            <div className="flex gap-1.5 p-2 border-b border-slate-100">
              <button
                onClick={() => setLocateTick((t) => t + 1)}
                className="flex-1 flex items-center justify-center gap-1.5 text-[11px] rounded-md border border-slate-200 hover:border-teal-400 hover:text-teal-600 py-1.5"
              >
                <Crosshair className="size-3" /> Locate
              </button>
              <button
                onClick={() => setPinMode((p) => !p)}
                className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] rounded-md border py-1.5 ${
                  pinMode
                    ? "border-orange-400 bg-orange-50 text-orange-600"
                    : "border-slate-200 hover:border-orange-400 hover:text-orange-600"
                }`}
              >
                <MapPin className="size-3" /> {pinMode ? "Drop" : "Pin"}
              </button>
              <button
                onClick={() => setCustomPins([])}
                className="flex-1 flex items-center justify-center gap-1.5 text-[11px] rounded-md border border-slate-200 hover:border-rose-400 hover:text-rose-600 py-1.5"
              >
                <Trash2 className="size-3" /> Clear
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {results.length > 0 && (
                <div className="p-2 space-y-1 border-b border-slate-100 bg-slate-50">
                  {results.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => flyTo(r.lat, r.lng)}
                      className="w-full text-left text-[11px] px-2 py-1 rounded border border-slate-200 hover:border-teal-400 bg-white"
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
              {filteredDrivers.length === 0 && (
                <p className="p-4 text-[11px] text-slate-400 italic">
                  No drivers yet. Connect <code>driver_location_current</code>.
                </p>
              )}
              <ul className="divide-y divide-slate-100">
                {filteredDrivers.map((d) => {
                  const selected = d.driver_id === selectedDriverId;
                  return (
                    <li key={d.driver_id}>
                      <button
                        onClick={() => {
                          setSelectedDriverId(d.driver_id);
                          flyTo(d.latitude, d.longitude, 11);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition ${
                          selected ? "bg-teal-50/60" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="size-9 rounded-full ring-2 grid place-items-center text-[10px] font-bold text-slate-900 shrink-0"
                            style={{
                              background: DRIVER_COLORS[d.status],
                              boxShadow: `0 0 0 2px white`,
                            }}
                          >
                            {(d.driver_name || "??")
                              .split(" ")
                              .map((s) => s[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-slate-800 truncate">
                                {d.driver_name || "Driver"}
                              </span>
                              <span className="ml-auto text-[10px] text-slate-400">
                                {d.unit_number}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                              {d.vehicle_type} · {Math.round(d.speed_mph ?? 0)} mph
                              {d.eta_minutes != null && ` · ETA ${d.eta_minutes}m`}
                            </div>
                            {d.current_load_number && (
                              <div className="text-[11px] text-teal-600 mt-0.5 truncate">
                                Load {d.current_load_number}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Map */}
          <main className="flex-1 relative bg-slate-200">
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
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] rounded-full bg-orange-500 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                Click anywhere on the map to drop a pin
              </div>
            )}
          </main>
        </div>
      </div>
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
