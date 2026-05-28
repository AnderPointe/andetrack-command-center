import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { drivers, loads, alerts } from "@/data/mock";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, Users, UserCheck, TriangleAlert, Route as RouteIcon,
  Truck, Warehouse, ShoppingBag, Container, MapPinned, CloudLightning, BellRing,
  X, Search, ChevronRight, Send, MessageSquare, Phone, FileDown,
  Map as MapIcon, UserPlus, Siren, Wrench, Bell, GitCompare, Navigation,
  PhoneCall, AlertOctagon, ClipboardList, Plus, Edit3, Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AssignLoadDialog } from "@/components/dispatch/AssignLoadDialog";
import { CallDriverDialog } from "@/components/dispatch/CallDriverDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Command Center — Anderoute" },
      { name: "description", content: "Monitor live operations, drivers, loads, routing, facilities and delivery performance from one central hub." },
    ],
  }),
  component: CommandCenter,
});

type Accent = "teal" | "orange" | "danger" | "info" | "success" | "warning";
type TileColor = "teal" | "orange" | "green" | "red";

interface Tile {
  id: string;
  title: string;
  value: number;
  status: string;
  badge: string;
  icon: LucideIcon;
  color: TileColor;
  detailTitle: string;
  detailDescription: string;
  actions: string[];
}

const tiles: Tile[] = [
  { id: "active-loads", title: "Active Loads", value: 91, status: "78 on time · 13 at risk", badge: "Live", icon: Package, color: "teal", detailTitle: "Active Loads", detailDescription: "Loads currently moving across your network.", actions: ["View on Map", "Reassign Load", "Message Driver", "Export Report"] },
  { id: "available-drivers", title: "Available Drivers", value: 37, status: "12 near priority zones", badge: "Ready", icon: UserCheck, color: "green", detailTitle: "Available Drivers", detailDescription: "Drivers ready for load assignment.", actions: ["Assign Driver", "View on Map", "Call Driver"] },
  { id: "delayed-loads", title: "Delayed Loads", value: 14, status: "5 traffic · 4 facility · 3 weather", badge: "Attention", icon: TriangleAlert, color: "orange", detailTitle: "Delayed Loads", detailDescription: "Loads requiring dispatcher review.", actions: ["Notify Customer", "Reroute", "Escalate"] },
  { id: "route-planner", title: "Route Planner", value: 26, status: "AI suggestions available", badge: "Optimize", icon: RouteIcon, color: "teal", detailTitle: "Route Planner", detailDescription: "Suggested optimized routes and reroutes.", actions: ["Optimize Route", "Compare Routes", "Send to Driver"] },
  { id: "driver-profiles", title: "Driver Profiles", value: 248, status: "197 active · 37 available · 14 offline", badge: "Fleet", icon: Users, color: "teal", detailTitle: "Driver Profiles", detailDescription: "Driver status, current load, ETA, and route history.", actions: ["View Profile", "Message Driver", "View Route History"] },
  { id: "vehicle-status", title: "Vehicle Status", value: 312, status: "283 active · 21 maintenance · 8 offline", badge: "Fleet Health", icon: Truck, color: "green", detailTitle: "Vehicle Status", detailDescription: "Fleet health, maintenance, inspections, and assignments.", actions: ["View Vehicle", "Create Maintenance Alert", "Assign Vehicle"] },
  { id: "facilities-hubs", title: "Facilities & Hubs", value: 1482, status: "Warehouses · hubs · airports · truck stops", badge: "Network", icon: Warehouse, color: "teal", detailTitle: "Facilities & Hubs", detailDescription: "Distribution centers, freight hubs, warehouses, and partner facilities.", actions: ["View Facility", "Add Facility", "View on Map"] },
  { id: "food-courier-orders", title: "Food & Courier Orders", value: 426, status: "318 completed today", badge: "Courier", icon: ShoppingBag, color: "orange", detailTitle: "Food & Courier Orders", detailDescription: "Live food, retail, and same-day courier orders.", actions: ["Assign Courier", "View Order", "Message Customer"] },
  { id: "freight-orders", title: "Freight Orders", value: 73, status: "61 on schedule · 12 need review", badge: "Freight", icon: Container, color: "teal", detailTitle: "Freight Orders", detailDescription: "Large freight, palletized cargo, and heavy delivery operations.", actions: ["Assign Truck", "View Load", "Check Capacity"] },
  { id: "geofences-zones", title: "Geofences & Zones", value: 58, status: "9 high-priority zones", badge: "Zones", icon: MapPinned, color: "teal", detailTitle: "Geofences & Zones", detailDescription: "Operational delivery zones, service areas, and restricted regions.", actions: ["Edit Zone", "View Zone", "Create Zone Alert"] },
  { id: "weather-traffic", title: "Weather & Traffic", value: 23, status: "Road risk alerts active", badge: "Risk", icon: CloudLightning, color: "orange", detailTitle: "Weather & Traffic", detailDescription: "Traffic delays, road closures, storms, and route risks.", actions: ["Reroute Drivers", "Notify Dispatch", "View Map Layer"] },
  { id: "dispatch-alerts", title: "Dispatch Alerts", value: 19, status: "7 critical · 12 medium", badge: "Alerts", icon: BellRing, color: "red", detailTitle: "Dispatch Alerts", detailDescription: "Urgent operational issues requiring dispatcher action.", actions: ["Resolve Alert", "Escalate", "Message Team"] },
];

const colorToAccent = (c: TileColor): Accent => ({ teal: "teal", orange: "orange", green: "success", red: "danger" } as const)[c];
const badgeAccent = (c: TileColor): Accent => ({ teal: "teal", orange: "orange", green: "success", red: "danger" } as const)[c];

const accentColor = (a: Accent) => ({
  teal: "var(--teal)",
  orange: "var(--orange)",
  danger: "var(--destructive)",
  info: "var(--info)",
  success: "var(--success)",
  warning: "var(--warning)",
}[a]);

const actionIconMap: Record<string, LucideIcon> = {
  "View on Map": MapIcon,
  "Reassign Load": Send,
  "Message Driver": MessageSquare,
  "Export Report": FileDown,
  "Assign Driver": UserPlus,
  "Call Driver": PhoneCall,
  "Notify Customer": Bell,
  "Reroute": Navigation,
  "Escalate": AlertOctagon,
  "Optimize Route": RouteIcon,
  "Compare Routes": GitCompare,
  "Send to Driver": Send,
  "View Profile": Users,
  "View Route History": ClipboardList,
  "View Vehicle": Truck,
  "Create Maintenance Alert": Wrench,
  "Assign Vehicle": UserPlus,
  "View Facility": Warehouse,
  "Add Facility": Plus,
  "Assign Courier": UserPlus,
  "View Order": Package,
  "Message Customer": MessageSquare,
  "Assign Truck": Truck,
  "View Load": Package,
  "Check Capacity": Container,
  "Edit Zone": Edit3,
  "View Zone": MapPinned,
  "Create Zone Alert": Siren,
  "Reroute Drivers": Navigation,
  "Notify Dispatch": Bell,
  "View Map Layer": Layers,
  "Resolve Alert": BellRing,
  "Message Team": MessageSquare,
};

function CommandCenter() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const navigate = useNavigate();
  const active = tiles.find((t) => t.id === activeId) ?? null;

  const handleAction = (action: string) => {
    switch (action) {
      case "Assign Driver":
      case "Reassign Load":
      case "Assign Courier":
      case "Assign Truck":
      case "Assign Vehicle":
        setAssignOpen(true);
        break;
      case "Call Driver":
        setCallOpen(true);
        break;
      case "Message Driver":
      case "Message Customer":
      case "Message Team":
        navigate({ to: "/dashboard/messages" });
        break;
      case "View on Map":
      case "View Map Layer":
        navigate({ to: "/map" });
        break;
      case "View Profile":
      case "View Route History":
        navigate({ to: "/drivers" });
        break;
      case "View Vehicle":
        navigate({ to: "/vehicles" });
        break;
      case "View Load":
      case "View Order":
        navigate({ to: "/loads" });
        break;
      default:
        // For unmapped actions, just close the drawer
        break;
    }
  };

  return (
    <AppShell>
      <div className="command-canvas">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[28px] font-semibold tracking-tight leading-none">Command Center</h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Monitor live operations, driver activity, active loads, routing issues, facility status, and delivery performance from one central hub.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                placeholder="Search operations…"
                className="h-10 w-[280px] pl-9 pr-3 text-sm rounded-lg bg-card/70 backdrop-blur border border-border outline-none focus:ring-2 focus:ring-teal/30"
              />
            </div>
            <button className="h-10 px-3 rounded-lg bg-card/70 backdrop-blur border border-border text-sm hover:border-teal/40 transition">
              Filters
            </button>
          </div>
        </div>

        {/* Tile grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tiles.map((t) => (
            <CommandTile
              key={t.id}
              tile={t}
              active={activeId === t.id}
              onClick={() => setActiveId(t.id)}
            />
          ))}
        </div>

        {/* Mini activity timeline */}
        <div className="mt-7">
          <div className="cc-tile !cursor-default p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold tracking-tight">Activity Timeline</h2>
              <span className="text-[11px] text-muted-foreground">Last 30 minutes</span>
            </div>
            <ol className="flex items-stretch gap-3 overflow-x-auto pb-1">
              {[
                { t: "2m", title: "Load LD-1042 picked up", tone: "teal" as Accent },
                { t: "5m", title: "Driver Marcus Reed went on-route", tone: "info" as Accent },
                { t: "9m", title: "Weather alert: I-80 W heavy rain", tone: "warning" as Accent },
                { t: "14m", title: "Delay resolved · LD-1027", tone: "success" as Accent },
                { t: "21m", title: "Critical alert · Reefer VH-208 temp", tone: "danger" as Accent },
                { t: "28m", title: "Route optimized · DRV-019", tone: "teal" as Accent },
              ].map((e, i) => (
                <li
                  key={i}
                  className="shrink-0 min-w-[220px] rounded-xl border border-border bg-card/60 backdrop-blur px-3 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: accentColor(e.tone) }} />
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground tabular-nums">{e.t} ago</span>
                  </div>
                  <div className="mt-1 text-[13px] leading-snug">{e.title}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <DetailDrawer tile={active} onClose={() => setActiveId(null)} onAction={handleAction} />
      <AssignLoadDialog open={assignOpen} onOpenChange={setAssignOpen} />
      <CallDriverDialog open={callOpen} onOpenChange={setCallOpen} />
    </AppShell>
  );
}

function CommandTile({ tile, active, onClick }: { tile: Tile; active: boolean; onClick: () => void }) {
  const Icon = tile.icon;
  return (
    <button
      onClick={onClick}
      className={`rounded-3xl border border-white/20 bg-white/70 p-5 text-left shadow-xl backdrop-blur-2xl transition hover:-translate-y-1 hover:border-teal-400 hover:shadow-2xl dark:bg-slate-950/70 ${active ? "ring-2 ring-teal-400" : ""}`}
    >
      <div className="flex items-center justify-between">
        <span className="rounded-2xl bg-teal-500/10 p-3 text-teal-500">
          <Icon className="size-5" />
        </span>
        <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-500">
          {tile.badge}
        </span>
      </div>
      <h3 className="mt-4 text-sm font-semibold text-slate-500">
        {tile.title}
      </h3>
      <p className="mt-2 text-4xl font-bold text-slate-950 dark:text-white tabular-nums">
        {tile.value.toLocaleString()}
      </p>
      <p className="mt-2 text-sm text-slate-500 line-clamp-2 min-h-[40px]">
        {tile.status}
      </p>
      <p className="mt-4 text-sm font-semibold text-teal-500">
        View Details →
      </p>
    </button>
  );
}

/* ─── Drawer ─────────────────────────────────────────── */

function DetailDrawer({ tile, onClose }: { tile: Tile | null; onClose: () => void }) {
  const selectedTile = tile;
  const closeDetailDrawer = onClose;
  return (
    <AnimatePresence>
      {selectedTile && (
        <motion.aside
          key={selectedTile.id}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          transition={{ type: "spring", damping: 32, stiffness: 280 }}
          className="fixed right-6 top-24 z-50 h-[calc(100vh-120px)] w-[420px] overflow-y-auto rounded-3xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-2xl dark:bg-slate-950/80"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-teal-500">Command Details</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
                {selectedTile.detailTitle}
              </h2>
              <p className="mt-2 text-sm text-slate-500">{selectedTile.detailDescription}</p>
            </div>
            <button
              onClick={closeDetailDrawer}
              className="rounded-full border border-slate-200 px-3 py-1 text-sm dark:border-white/20 dark:text-white"
            >
              Close
            </button>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-100 p-4 dark:bg-white/10">
            <p className="text-sm font-semibold text-slate-500">Current Count</p>
            <p className="mt-1 text-4xl font-bold text-slate-950 dark:text-white tabular-nums">
              {selectedTile.value.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-slate-500">{selectedTile.status}</p>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-sm font-bold text-slate-950 dark:text-white">Quick Actions</p>
            {selectedTile.actions.map((action) => (
              <button
                key={action}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-teal-600 dark:bg-white dark:text-slate-950 dark:hover:bg-teal-500 dark:hover:text-white"
              >
                {action}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-sm font-bold text-slate-950 dark:text-white">Recent Activity</p>
            <div className="mt-3 space-y-3">
              <div className="rounded-2xl border border-slate-200 p-3 dark:border-white/10">
                <p className="text-sm font-semibold dark:text-white">Status updated</p>
                <p className="text-xs text-slate-500">
                  4 minutes ago · Dispatcher reviewed this item.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-3 dark:border-white/10">
                <p className="text-sm font-semibold dark:text-white">Route synced</p>
                <p className="text-xs text-slate-500">
                  11 minutes ago · Map and route data refreshed.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-3 dark:border-white/10">
                <p className="text-sm font-semibold dark:text-white">Driver notification available</p>
                <p className="text-xs text-slate-500">Send a direct update from dispatch.</p>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

/* ─── Drawer body lists ──────────────────────────────── */

function Row({ children, accent }: { children: React.ReactNode; accent?: Accent }) {
  return (
    <div
      className="rounded-xl border border-border bg-card/70 backdrop-blur p-3 hover:border-teal/40 transition relative overflow-hidden"
      style={accent ? { boxShadow: `inset 3px 0 0 0 ${accentColor(accent)}` } : undefined}
    >
      {children}
    </div>
  );
}

function KV({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className="text-[12px] font-medium tabular-nums">{v}</div>
    </div>
  );
}

function LoadsList() {
  return (
    <div className="space-y-2.5">
      {loads.slice(0, 6).map((l) => (
        <Row key={l.id} accent={l.status === "delayed" ? "danger" : "teal"}>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm tabular-nums">{l.id}</span>
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal/15 text-teal">{l.status}</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{l.customer}</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <KV k="Pickup" v={l.pickupLocation} />
            <KV k="Dropoff" v={l.dropoffLocation} />
            <KV k="Cargo" v={l.commodity} />
            <KV k="Weight" v={`${l.weight.toLocaleString()} lb`} />
          </div>
          <div className="mt-2.5">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
              <span>Route progress</span><span className="tabular-nums text-foreground">{Math.floor(Math.random() * 70) + 20}%</span>
            </div>
            <div className="h-1 rounded-full bg-border overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal to-orange" style={{ width: `${Math.floor(Math.random() * 70) + 20}%` }} />
            </div>
          </div>
        </Row>
      ))}
    </div>
  );
}

function DriversList() {
  return (
    <div className="space-y-2.5">
      {drivers.slice(0, 7).map((d) => (
        <Link
          key={d.id}
          to="/drivers/$driverId"
          params={{ driverId: d.id }}
          className="block"
        >
          <Row accent="teal">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-teal to-orange grid place-items-center text-white text-xs font-semibold shrink-0">
                {d.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold truncate">{d.name}</span>
                  <span className="text-[10px] text-muted-foreground tabular-nums">{d.id}</span>
                </div>
                <div className="text-[11px] text-muted-foreground truncate">{d.vehicleType} · {d.currentLocation.label}</div>
              </div>
            </div>
            <div className="mt-2.5 grid grid-cols-4 gap-2">
              <KV k="ETA" v={d.eta ?? "—"} />
              <KV k="On-time" v={`${d.onTimePercentage}%`} />
              <KV k="Hours" v={`${10 - (d.loadsToday % 4)}h`} />
              <KV k="Rating" v={`${(d.safetyScore / 20).toFixed(1)}★`} />
            </div>
          </Row>
        </Link>
      ))}
    </div>
  );
}

function DelaysList() {
  const reasons = ["Traffic congestion", "Facility hold", "Weather", "Driver issue", "Mechanical"];
  return (
    <div className="space-y-2.5">
      {loads.slice(0, 5).map((l, i) => (
        <Row key={l.id} accent="danger">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm tabular-nums">{l.id}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/15 text-destructive uppercase tracking-wider">+{(i + 1) * 12}m</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{l.customer}</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <KV k="Reason" v={reasons[i % reasons.length]} />
            <KV k="Revised ETA" v={`+${(i + 1) * 12}m`} />
          </div>
          <div className="mt-2 text-[11px] text-foreground/80 bg-surface-2 rounded-md p-2 border border-border">
            <span className="text-muted-foreground">Note: </span>Driver reports rerouting via alternate corridor; customer notified.
          </div>
        </Row>
      ))}
    </div>
  );
}

function RoutesList() {
  return (
    <div className="space-y-2.5">
      {[1, 2, 3, 4].map((n) => (
        <Row key={n} accent="info">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">Route Plan #R-{2400 + n}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-info/15 text-info uppercase tracking-wider">AI</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Chicago, IL → Dallas, TX</div>
          <div className="mt-2 grid grid-cols-4 gap-2">
            <KV k="Miles" v={`${920 + n * 14}`} />
            <KV k="Time" v={`${14 + n}h`} />
            <KV k="Tolls" v={`$${42 + n * 3}`} />
            <KV k="Traffic" v={n % 2 ? "Med" : "Low"} />
          </div>
          <button className="mt-2 w-full h-8 rounded-md bg-teal text-white text-[11px] font-medium hover:opacity-90">
            Optimize route
          </button>
        </Row>
      ))}
    </div>
  );
}

function VehiclesList() {
  return (
    <div className="space-y-2.5">
      {drivers.slice(0, 6).map((d) => (
        <Row key={d.id} accent="success">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm tabular-nums">{d.vehicleId}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-success/15 text-success uppercase tracking-wider">Active</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{d.vehicleType} · {d.name}</div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <KV k="Mileage" v={`${(180000 + d.milesToday * 50).toLocaleString()}`} />
            <KV k="Inspection" v="OK" />
            <KV k="MPG" v={d.averageMpg.toString()} />
          </div>
        </Row>
      ))}
    </div>
  );
}

function FacilitiesList() {
  const items = [
    { name: "Midwest Distribution Center", type: "Warehouse", city: "Chicago, IL", hours: "24/7" },
    { name: "Amazon FTW6", type: "Fulfillment Hub", city: "Fort Worth, TX", hours: "24/7" },
    { name: "Sysco Foods West", type: "Food DC", city: "Phoenix, AZ", hours: "5a–11p" },
    { name: "Pilot Travel Center #427", type: "Truck Stop", city: "Knoxville, TN", hours: "24/7" },
    { name: "ATL Cargo Terminal", type: "Airport", city: "Atlanta, GA", hours: "24/7" },
    { name: "Pacific Reefer Hub", type: "Cold Storage", city: "Oakland, CA", hours: "4a–10p" },
  ];
  return (
    <div className="space-y-2.5">
      {items.map((f) => (
        <Row key={f.name} accent="info">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">{f.name}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-info/15 text-info uppercase tracking-wider">{f.type}</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{f.city} · {f.hours}</div>
          <div className="mt-2 text-[11px] text-foreground/80 bg-surface-2 rounded-md p-2 border border-border">
            Dock note: Check-in at gate B · 2hr appt window required.
          </div>
        </Row>
      ))}
    </div>
  );
}

function CourierList() {
  const restaurants = ["Sushi Nine", "El Camino Tacos", "Brick Oven Co.", "Green Bowl", "Saffron", "Burger Lab"];
  return (
    <div className="space-y-2.5">
      {restaurants.map((r, i) => (
        <Row key={r} accent="orange">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm tabular-nums">#ORD-{8210 + i}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange/15 text-orange uppercase tracking-wider">In transit</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{r} → Customer {i + 1}</div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <KV k="Pickup ETA" v={`${4 + i}m`} />
            <KV k="Drop ETA" v={`${14 + i * 2}m`} />
            <KV k="Value" v={`$${(18 + i * 7).toFixed(2)}`} />
          </div>
        </Row>
      ))}
    </div>
  );
}

function ZonesList() {
  const zones = [
    { n: "Downtown Core", c: "Chicago, IL", d: 14, l: 22, sla: "High" },
    { n: "Port District", c: "Long Beach, CA", d: 9, l: 31, sla: "Critical" },
    { n: "Airport South", c: "Atlanta, GA", d: 7, l: 12, sla: "Med" },
    { n: "Industrial Park", c: "Dallas, TX", d: 11, l: 18, sla: "High" },
  ];
  return (
    <div className="space-y-2.5">
      {zones.map((z) => (
        <Row key={z.n} accent="teal">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">{z.n}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal/15 text-teal uppercase tracking-wider">{z.sla} SLA</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{z.c}</div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <KV k="Drivers" v={z.d.toString()} />
            <KV k="Open loads" v={z.l.toString()} />
            <KV k="Restrictions" v="Hazmat off" />
          </div>
          <button className="mt-2 w-full h-8 rounded-md border border-border text-[11px] font-medium hover:border-teal/50 hover:text-teal">
            Edit zone
          </button>
        </Row>
      ))}
    </div>
  );
}

function WeatherList() {
  const items = [
    { type: "Heavy rain", sev: "High", route: "I-80 W (IL/IA)", drivers: 6 },
    { type: "Road closure", sev: "Critical", route: "I-95 N mile 142", drivers: 3 },
    { type: "Construction", sev: "Med", route: "I-35 S, Dallas", drivers: 9 },
    { type: "Snow advisory", sev: "High", route: "I-70 CO", drivers: 4 },
  ];
  return (
    <div className="space-y-2.5">
      {items.map((w) => (
        <Row key={w.route} accent={w.sev === "Critical" ? "danger" : "warning"}>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">{w.type}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-warning/15 text-warning uppercase tracking-wider">{w.sev}</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{w.route}</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <KV k="Drivers impacted" v={w.drivers.toString()} />
            <KV k="Suggested" v="Reroute via US-30" />
          </div>
          <button className="mt-2 w-full h-8 rounded-md bg-orange text-white text-[11px] font-medium hover:opacity-90">
            Notify drivers
          </button>
        </Row>
      ))}
    </div>
  );
}

function AlertList() {
  return (
    <div className="space-y-2.5">
      {alerts.slice(0, 6).map((a) => (
        <Row key={a.id} accent={a.severity === "critical" || a.severity === "high" ? "danger" : "warning"}>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">{a.type}</span>
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-destructive/15 text-destructive">{a.severity}</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5 tabular-nums">{a.createdAt}</div>
          <div className="mt-2 text-[12px]">{a.message}</div>
          <div className="mt-2 text-[11px] bg-surface-2 rounded-md p-2 border border-border">
            <span className="text-muted-foreground">Action: </span>{a.recommendedAction}
          </div>
          <button className="mt-2 w-full h-8 rounded-md bg-destructive text-destructive-foreground text-[11px] font-medium hover:opacity-90 inline-flex items-center justify-center gap-1.5">
            <Phone className="size-3" /> Escalate
          </button>
        </Row>
      ))}
    </div>
  );
}
