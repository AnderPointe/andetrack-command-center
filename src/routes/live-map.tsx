import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  LocateFixed,
  PackageCheck,
  PauseCircle,
  RadioTower,
  Route as RouteIcon,
  Search,
  ShieldCheck,
  Truck,
  Wifi,
  WifiOff,
} from "lucide-react";

export const Route = createFileRoute("/live-map")({
  head: () => ({
    meta: [
      { title: "Live Map — Anderoute" },
      {
        name: "description",
        content:
          "Realtime-ready fleet, load, and dispatch visibility for Anderoute. Mock live movement included for visual testing.",
      },
      { property: "og:title", content: "Anderoute Live Map" },
      {
        property: "og:description",
        content: "Realtime fleet, load, and dispatch visibility.",
      },
    ],
  }),
  component: AnderouteLiveMap,
});

const DEFAULT_CENTER: [number, number] = [32.7767, -96.797];

type DriverStatus = "available" | "assigned" | "loaded" | "break" | "offline" | "alert";
type VehicleType = "Cargo Van" | "Box Truck" | "Hotshot" | "Semi" | "Personal Vehicle";
type MarkerKind = "driver" | "load" | "depot" | "custom" | "user";

type LiveDriver = {
  id: string;
  name: string;
  unit: string;
  status: DriverStatus;
  vehicleType: VehicleType;
  speedMph: number;
  heading: number;
  etaMinutes: number;
  currentLoad?: string;
  position: [number, number];
  route: [number, number][];
  lastPingSeconds: number;
  fuelMpg: number;
};

type MapMarker = {
  id: string;
  kind: MarkerKind;
  title: string;
  description: string;
  position: [number, number];
};

const depots: MapMarker[] = [
  {
    id: "depot-dfw",
    kind: "depot",
    title: "DFW Dispatch Hub",
    description: "Main yard · Live dispatch monitoring",
    position: [32.7909, -96.8089],
  },
];

const loadMarkers: MapMarker[] = [
  {
    id: "load-1001",
    kind: "load",
    title: "Pickup: Load 1001",
    description: "2 pallets · Priority pickup · Dock 4",
    position: [32.7689, -96.8122],
  },
  {
    id: "load-1002",
    kind: "load",
    title: "Drop: Load 1002",
    description: "Final mile delivery · Customer waiting",
    position: [32.7986, -96.7718],
  },
];

const initialDrivers: LiveDriver[] = [
  {
    id: "driver-214",
    name: "Marcus Reed",
    unit: "Unit 214",
    status: "available",
    vehicleType: "Box Truck",
    speedMph: 0,
    heading: 88,
    etaMinutes: 12,
    position: [32.7812, -96.7989],
    route: [
      [32.7812, -96.7989],
      [32.7781, -96.8042],
      [32.7733, -96.8094],
      [32.7689, -96.8122],
    ],
    lastPingSeconds: 8,
    fuelMpg: 10.4,
  },
  {
    id: "driver-087",
    name: "Alicia Moore",
    unit: "Unit 087",
    status: "loaded",
    vehicleType: "Hotshot",
    speedMph: 47,
    heading: 42,
    etaMinutes: 22,
    currentLoad: "Load 1002",
    position: [32.7894, -96.7802],
    route: [
      [32.7894, -96.7802],
      [32.7935, -96.7762],
      [32.7964, -96.7731],
      [32.7986, -96.7718],
    ],
    lastPingSeconds: 4,
    fuelMpg: 13.2,
  },
  {
    id: "driver-331",
    name: "Derrick Lane",
    unit: "Unit 331",
    status: "assigned",
    vehicleType: "Semi",
    speedMph: 39,
    heading: 260,
    etaMinutes: 35,
    currentLoad: "Load 1004",
    position: [32.764, -96.7865],
    route: [
      [32.764, -96.7865],
      [32.7711, -96.7931],
      [32.7794, -96.8015],
      [32.7909, -96.8089],
    ],
    lastPingSeconds: 13,
    fuelMpg: 6.8,
  },
  {
    id: "driver-522",
    name: "Vanessa King",
    unit: "Unit 522",
    status: "break",
    vehicleType: "Cargo Van",
    speedMph: 0,
    heading: 0,
    etaMinutes: 0,
    position: [32.8025, -96.7997],
    route: [],
    lastPingSeconds: 38,
    fuelMpg: 18.9,
  },
  {
    id: "driver-909",
    name: "Chris Nolan",
    unit: "Unit 909",
    status: "alert",
    vehicleType: "Personal Vehicle",
    speedMph: 0,
    heading: 310,
    etaMinutes: 0,
    position: [32.7528, -96.8212],
    route: [
      [32.7528, -96.8212],
      [32.7592, -96.8166],
      [32.7689, -96.8122],
    ],
    lastPingSeconds: 76,
    fuelMpg: 24.1,
  },
];

const statusConfig: Record<
  DriverStatus,
  { label: string; dot: string; bg: string; text: string; icon: React.ElementType }
> = {
  available: { label: "Available", dot: "bg-emerald-400", bg: "bg-emerald-500/15", text: "text-emerald-200", icon: CheckCircle2 },
  assigned:  { label: "Assigned",  dot: "bg-sky-400",     bg: "bg-sky-500/15",     text: "text-sky-200",     icon: RouteIcon },
  loaded:    { label: "Loaded",    dot: "bg-orange-400",  bg: "bg-orange-500/15",  text: "text-orange-200",  icon: PackageCheck },
  break:     { label: "Break",     dot: "bg-violet-400",  bg: "bg-violet-500/15",  text: "text-violet-200",  icon: PauseCircle },
  offline:   { label: "Offline",   dot: "bg-slate-500",   bg: "bg-slate-500/15",   text: "text-slate-300",   icon: WifiOff },
  alert:     { label: "Alert",     dot: "bg-red-400",     bg: "bg-red-500/15",     text: "text-red-200",     icon: AlertTriangle },
};

function createLiveIcon(kind: MarkerKind, status?: DriverStatus, heading = 0) {
  const colorByStatus: Record<DriverStatus, string> = {
    available: "#10b981",
    assigned: "#38bdf8",
    loaded: "#f97316",
    break: "#a78bfa",
    offline: "#64748b",
    alert: "#ef4444",
  };
  const markerColor: Record<MarkerKind, string> = {
    driver: status ? colorByStatus[status] : "#14b8a6",
    load: "#f97316",
    depot: "#0f766e",
    custom: "#111827",
    user: "#2563eb",
  };
  const emoji: Record<MarkerKind, string> = {
    driver: "➤",
    load: "📦",
    depot: "◆",
    custom: "📍",
    user: "◎",
  };
  const rotate = kind === "driver" ? `transform:rotate(${heading}deg);` : "";
  const color = markerColor[kind];

  return L.divIcon({
    className: "anderoute-live-marker",
    html: `
      <div style="position:relative;width:42px;height:42px;">
        <div style="position:absolute;inset:0;border-radius:9999px;background:${color}33;animation:pulse 2.4s ease-out infinite;"></div>
        <div style="position:absolute;left:50%;top:50%;width:30px;height:30px;margin-left:-15px;margin-top:-18px;border-radius:9999px;background:${color};border:2px solid #0f172a;box-shadow:0 4px 12px rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;color:white;font-size:14px;font-weight:700;${rotate}">${emoji[kind]}</div>
      </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 38],
    popupAnchor: [0, -36],
  });
}

function MapClickHandler({ onAddMarker }: { onAddMarker: (p: [number, number]) => void }) {
  useMapEvents({
    click(event) {
      onAddMarker([event.latlng.lat, event.latlng.lng]);
    },
  });
  return null;
}

function LocateNowTrigger({
  requestKey,
  onLocationFound,
  onError,
}: {
  requestKey: number;
  onLocationFound: (p: [number, number], accuracy: number) => void;
  onError: (msg: string) => void;
}) {
  const map = useMap();
  useMapEvents({
    locationfound(event) {
      const position: [number, number] = [event.latlng.lat, event.latlng.lng];
      onLocationFound(position, event.accuracy);
      map.flyTo(position, 15, { duration: 1.2 });
    },
    locationerror(event) {
      onError(event.message || "Unable to access your location. Check browser permissions and HTTPS.");
    },
  });
  useEffect(() => {
    if (requestKey === 0) return;
    map.locate({ setView: false, maxZoom: 16, enableHighAccuracy: true, timeout: 10000 });
  }, [requestKey, map]);
  return null;
}

function FlyToDriver({ selectedDriver }: { selectedDriver: LiveDriver | null }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedDriver) return;
    map.flyTo(selectedDriver.position, 15, { duration: 0.9 });
  }, [selectedDriver, map]);
  return null;
}

function simulateDriverMovement(drivers: LiveDriver[]) {
  return drivers.map((driver) => {
    if (["break", "offline"].includes(driver.status) || driver.route.length < 2) {
      return { ...driver, lastPingSeconds: Math.min(driver.lastPingSeconds + 3, 180) };
    }
    const [lat, lng] = driver.position;
    const target = driver.route[driver.route.length - 1];
    const nextLat = lat + (target[0] - lat) * 0.018;
    const nextLng = lng + (target[1] - lng) * 0.018;
    const etaDelta = Math.random() > 0.58 ? 1 : 0;
    return {
      ...driver,
      position: [nextLat, nextLng] as [number, number],
      speedMph: Math.max(0, Math.round(driver.speedMph + (Math.random() * 5 - 2))),
      etaMinutes: Math.max(0, driver.etaMinutes - etaDelta),
      lastPingSeconds: Math.max(2, Math.round(Math.random() * 16)),
    };
  });
}

function AnderouteLiveMap() {
  const [drivers, setDrivers] = useState<LiveDriver[]>(initialDrivers);
  const [customMarkers, setCustomMarkers] = useState<MapMarker[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<DriverStatus[]>([
    "available", "assigned", "loaded", "break", "alert",
  ]);
  const [selectedDriverId, setSelectedDriverId] = useState<string>("driver-087");
  const [search, setSearch] = useState("");
  const [isLive, setIsLive] = useState(true);
  const [locateKey, setLocateKey] = useState(0);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState(
    "Live map ready. Click the map to add a custom pin."
  );

  useEffect(() => {
    if (!isLive) return;
    const interval = window.setInterval(() => {
      setDrivers((current) => simulateDriverMovement(current));
    }, 2200);
    return () => window.clearInterval(interval);
  }, [isLive]);

  const allStaticMarkers = useMemo(
    () => [...depots, ...loadMarkers, ...customMarkers],
    [customMarkers]
  );

  const filteredDrivers = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return drivers.filter((d) => {
      const matchesStatus = selectedStatuses.includes(d.status);
      const matchesSearch =
        !normalized ||
        d.name.toLowerCase().includes(normalized) ||
        d.unit.toLowerCase().includes(normalized) ||
        d.vehicleType.toLowerCase().includes(normalized) ||
        d.currentLoad?.toLowerCase().includes(normalized);
      return matchesStatus && matchesSearch;
    });
  }, [drivers, search, selectedStatuses]);

  const selectedDriver = drivers.find((d) => d.id === selectedDriverId) || null;

  const counts = useMemo(() => {
    return drivers.reduce(
      (acc, d) => { acc[d.status] += 1; return acc; },
      { available: 0, assigned: 0, loaded: 0, break: 0, offline: 0, alert: 0 } as Record<DriverStatus, number>
    );
  }, [drivers]);

  const averagePing = Math.round(
    drivers.reduce((sum, d) => sum + d.lastPingSeconds, 0) / Math.max(drivers.length, 1)
  );

  function toggleStatus(status: DriverStatus) {
    setSelectedStatuses((c) => (c.includes(status) ? c.filter((s) => s !== status) : [...c, status]));
  }

  function addCustomMarker(position: [number, number]) {
    const marker: MapMarker = {
      id: `custom-${Date.now()}`,
      kind: "custom",
      title: "Custom Map Pin",
      description: `Lat ${position[0].toFixed(5)}, Lng ${position[1].toFixed(5)}`,
      position,
    };
    setCustomMarkers((c) => [...c, marker]);
    setStatusMessage("Custom marker added to the live map.");
  }

  function clearCustomMarkers() {
    setCustomMarkers([]);
    setStatusMessage("Custom map pins cleared.");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <style>{`
        @keyframes pulse {
          0% { transform: scale(.8); opacity: .35; }
          70% { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(.8); opacity: 0; }
        }
        .leaflet-container { background:#020617; }
        .leaflet-popup-content-wrapper, .leaflet-popup-tip { background:#0f172a; color:#f8fafc; border:1px solid rgba(255,255,255,.12); }
        .leaflet-control-attribution { background:rgba(15,23,42,.78)!important; color:#cbd5e1!important; }
        .leaflet-control-attribution a { color:#67e8f9!important; }
      `}</style>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 p-4 lg:grid-cols-[360px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-teal-500/20 p-2 text-teal-300">
                <Truck className="size-6" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">Anderoute Live Maps</h1>
                <p className="text-xs text-slate-400">Realtime-ready fleet, load, and dispatch visibility</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 text-[10px] text-slate-400">
              <MetricCard label="Avg ping" value={`${averagePing}s`} icon={RadioTower} />
            </div>
          </div>

          <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2">
            <Search className="size-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search driver, unit, load, vehicle..."
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
          </label>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
                <Filter className="size-3.5" /> Status Filters
              </div>
              <button
                onClick={() => setSelectedStatuses(["available", "assigned", "loaded", "break", "alert"])}
                className="text-xs text-teal-200 hover:text-teal-100"
              >Reset</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(statusConfig) as DriverStatus[]).map((status) => {
                const cfg = statusConfig[status];
                const active = selectedStatuses.includes(status);
                return (
                  <button
                    key={status}
                    onClick={() => toggleStatus(status)}
                    className={`rounded-2xl border px-3 py-2 text-left text-sm transition ${
                      active ? "border-white/20 bg-white/10 text-white" : "border-white/5 bg-slate-900/70 text-slate-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className={`inline-block size-2 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                      <span className="text-xs tabular-nums text-slate-300">{counts[status]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setIsLive((c) => !c);
                setStatusMessage(isLive ? "Live simulation paused." : "Live simulation resumed.");
              }}
              className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                isLive ? "bg-emerald-500 text-white hover:bg-emerald-400" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
            >
              {isLive ? <Wifi className="size-4" /> : <WifiOff className="size-4" />}
              {isLive ? "Live On" : "Paused"}
            </button>
            <button
              onClick={() => setLocateKey((c) => c + 1)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-teal-500 px-4 py-3 text-sm font-bold text-white hover:bg-teal-400"
            >
              <LocateFixed className="size-4" /> Locate Me
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 text-xs text-slate-300">
            {statusMessage}
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Fleet List</h2>
            <span className="text-xs text-slate-400">{filteredDrivers.length} shown</span>
          </div>
          <div className="max-h-[420px] space-y-2 overflow-auto pr-1">
            {filteredDrivers.map((d) => (
              <DriverCard
                key={d.id}
                driver={d}
                active={d.id === selectedDriverId}
                onSelect={() => setSelectedDriverId(d.id)}
              />
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Map Pins</h3>
              <button onClick={clearCustomMarkers} className="text-xs text-teal-200 hover:text-teal-100">
                Clear custom
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-400">Custom pins: {customMarkers.length}</p>
          </div>
        </aside>

        {/* Map area */}
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur">
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-2"><Activity className="size-4 text-emerald-300" /> Live operations</span>
              <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-sky-300" /> Tenant-safe tracking layer</span>
              <span className="flex items-center gap-2"><Clock className="size-4 text-violet-300" /> Updates every 2.2s in demo mode</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">Selected</p>
              <p className="text-sm font-semibold">{selectedDriver?.unit || "No driver selected"}</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10">
            <MapContainer
              center={DEFAULT_CENTER}
              zoom={13}
              scrollWheelZoom
              style={{ height: "calc(100vh - 220px)", minHeight: 560, width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              <MapClickHandler onAddMarker={addCustomMarker} />
              <LocateNowTrigger
                requestKey={locateKey}
                onLocationFound={(position, nextAccuracy) => {
                  setUserLocation(position);
                  setAccuracy(nextAccuracy);
                  setStatusMessage(`Location found within about ${Math.round(nextAccuracy)} meters.`);
                }}
                onError={(message) => setStatusMessage(message)}
              />
              <FlyToDriver selectedDriver={selectedDriver} />

              {filteredDrivers.map((driver) => (
                <div key={driver.id}>
                  {driver.route.length > 1 && (
                    <Polyline
                      positions={driver.route}
                      pathOptions={{ color: "#22d3ee", weight: 3, opacity: 0.55, dashArray: "6 8" }}
                    />
                  )}
                  <Marker
                    position={driver.position}
                    icon={createLiveIcon("driver", driver.status, driver.heading)}
                    eventHandlers={{ click: () => setSelectedDriverId(driver.id) }}
                  >
                    <Tooltip direction="top" offset={[0, -28]} opacity={0.95}>
                      {driver.unit} · {statusConfig[driver.status].label}
                    </Tooltip>
                    <Popup>
                      <div className="space-y-1 text-xs">
                        <div className="font-semibold text-base">{driver.name}</div>
                        <div className="opacity-80">{driver.unit} · {driver.vehicleType}</div>
                        <div>Status: <strong>{statusConfig[driver.status].label}</strong></div>
                        <div>Speed: {driver.speedMph} mph</div>
                        <div>ETA: {driver.etaMinutes || "N/A"} min</div>
                        <div>Last ping: {driver.lastPingSeconds}s ago</div>
                        {driver.currentLoad && <div>Load: {driver.currentLoad}</div>}
                      </div>
                    </Popup>
                  </Marker>
                </div>
              ))}

              {allStaticMarkers.map((marker) => (
                <Marker key={marker.id} position={marker.position} icon={createLiveIcon(marker.kind)}>
                  <Popup>
                    <div className="space-y-1 text-xs">
                      <div className="font-semibold text-base">{marker.title}</div>
                      <div className="opacity-80">{marker.description}</div>
                      <div className="opacity-60">
                        {marker.position[0].toFixed(5)}, {marker.position[1].toFixed(5)}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {userLocation && (
                <>
                  <Marker position={userLocation} icon={createLiveIcon("user")}>
                    <Popup>
                      <div className="space-y-1 text-xs">
                        <div className="font-semibold">Your Location</div>
                        <div>Accuracy: {accuracy ? Math.round(accuracy) : "?"} meters</div>
                      </div>
                    </Popup>
                  </Marker>
                  {accuracy && (
                    <Circle
                      center={userLocation}
                      radius={accuracy}
                      pathOptions={{ color: "#2563eb", fillColor: "#2563eb", fillOpacity: 0.12 }}
                    />
                  )}
                </>
              )}
            </MapContainer>
          </div>
        </section>
      </div>
    </div>
  );
}

function MetricCard({
  label, value, icon: Icon,
}: { label: string; value: string; icon: React.ElementType; tone?: "default" | "alert" }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-slate-400">
        {label} <Icon className="size-3.5" />
      </div>
      <p className="text-sm font-semibold tabular-nums text-white">{value}</p>
    </div>
  );
}

function DriverCard({
  driver, active, onSelect,
}: { driver: LiveDriver; active: boolean; onSelect: () => void }) {
  const cfg = statusConfig[driver.status];
  const StatusIcon = cfg.icon;
  return (
    <button
      onClick={onSelect}
      className={`w-full rounded-2xl border p-3 text-left transition ${
        active ? "border-teal-400/40 bg-teal-500/10" : "border-white/10 bg-slate-950/60 hover:border-white/20"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className={`inline-block size-2 rounded-full ${cfg.dot}`} />
            <p className="text-sm font-semibold">{driver.unit}</p>
          </div>
          <p className="text-xs text-slate-400">{driver.name} · {driver.vehicleType}</p>
        </div>
        <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] ${cfg.bg} ${cfg.text}`}>
          <StatusIcon className="size-3" /> {cfg.label}
        </span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-slate-900/70 px-2 py-1">
          <p className="text-[10px] uppercase tracking-wide text-slate-500">Speed</p>
          <p className="text-xs font-semibold tabular-nums">{driver.speedMph} mph</p>
        </div>
        <div className="rounded-lg bg-slate-900/70 px-2 py-1">
          <p className="text-[10px] uppercase tracking-wide text-slate-500">ETA</p>
          <p className="text-xs font-semibold tabular-nums">{driver.etaMinutes || "--"} min</p>
        </div>
        <div className="rounded-lg bg-slate-900/70 px-2 py-1">
          <p className="text-[10px] uppercase tracking-wide text-slate-500">Ping</p>
          <p className="text-xs font-semibold tabular-nums">{driver.lastPingSeconds}s</p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
        <span>{driver.currentLoad || "No active load"}</span>
        <span>{driver.fuelMpg.toFixed(1)} mpg</span>
      </div>
    </button>
  );
}
