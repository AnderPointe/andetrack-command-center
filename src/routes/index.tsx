import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { drivers, loads, alerts } from "@/data/mock";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, Users, AlertTriangle, Route as RouteIcon, UserCircle2,
  Truck, Warehouse, ShoppingBag, Container, MapPin, CloudRain, BellRing,
  TrendingUp, TrendingDown, X, Search, ChevronRight, Send,
  MessageSquare, Phone, FileDown, Map as MapIcon, UserPlus, Siren,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

interface Tile {
  id: string;
  title: string;
  value: string;
  status: string;
  trend: { dir: "up" | "down"; value: string };
  badge: { label: string; tone: Accent };
  icon: LucideIcon;
  accent: Accent;
}

const tiles: Tile[] = [
  { id: "active-loads", title: "Active Loads", value: "91", status: "78 on time · 13 at risk", trend: { dir: "up", value: "+6%" }, badge: { label: "Live", tone: "teal" }, icon: Package, accent: "teal" },
  { id: "available-drivers", title: "Available Drivers", value: "37", status: "12 nearby high-priority zones", trend: { dir: "up", value: "+3" }, badge: { label: "Ready", tone: "success" }, icon: Users, accent: "teal" },
  { id: "delayed-loads", title: "Delayed Loads", value: "14", status: "5 traffic · 4 facility · 3 weather · 2 driver", trend: { dir: "down", value: "-2" }, badge: { label: "Attention", tone: "warning" }, icon: AlertTriangle, accent: "warning" },
  { id: "route-planner", title: "Route Planner", value: "26", status: "AI route recommendations available", trend: { dir: "up", value: "+9%" }, badge: { label: "AI", tone: "info" }, icon: RouteIcon, accent: "info" },
  { id: "driver-profiles", title: "Driver Profiles", value: "248", status: "197 active · 37 available · 14 offline", trend: { dir: "up", value: "+4" }, badge: { label: "Fleet", tone: "teal" }, icon: UserCircle2, accent: "teal" },
  { id: "vehicle-status", title: "Vehicle Status", value: "312", status: "283 active · 21 maintenance · 8 offline", trend: { dir: "up", value: "+1.2%" }, badge: { label: "Healthy", tone: "success" }, icon: Truck, accent: "success" },
  { id: "facilities", title: "Facilities & Hubs", value: "1,482", status: "Warehouses · hubs · DCs · stops · airports", trend: { dir: "up", value: "+14" }, badge: { label: "Network", tone: "info" }, icon: Warehouse, accent: "info" },
  { id: "courier", title: "Food & Courier Orders", value: "426", status: "318 completed today", trend: { dir: "up", value: "+22%" }, badge: { label: "Live", tone: "orange" }, icon: ShoppingBag, accent: "orange" },
  { id: "freight", title: "Freight Orders", value: "73", status: "61 on schedule · 12 require attention", trend: { dir: "up", value: "+5" }, badge: { label: "Active", tone: "orange" }, icon: Container, accent: "orange" },
  { id: "geofences", title: "Geofences & Zones", value: "58", status: "9 high-priority zones", trend: { dir: "up", value: "+2" }, badge: { label: "Zones", tone: "teal" }, icon: MapPin, accent: "teal" },
  { id: "weather", title: "Weather & Traffic", value: "23", status: "Weather · traffic · closures · construction", trend: { dir: "down", value: "-3" }, badge: { label: "Risk", tone: "warning" }, icon: CloudRain, accent: "info" },
  { id: "alerts", title: "Dispatch Alerts", value: "19", status: "7 critical · 12 medium", trend: { dir: "down", value: "-4" }, badge: { label: "Urgent", tone: "danger" }, icon: BellRing, accent: "danger" },
];

const accentColor = (a: Accent) => ({
  teal: "var(--teal)",
  orange: "var(--orange)",
  danger: "var(--destructive)",
  info: "var(--info)",
  success: "var(--success)",
  warning: "var(--warning)",
}[a]);

function CommandCenter() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = tiles.find((t) => t.id === activeId) ?? null;

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

      <DetailDrawer tile={active} onClose={() => setActiveId(null)} />
    </AppShell>
  );
}

function CommandTile({ tile, active, onClick }: { tile: Tile; active: boolean; onClick: () => void }) {
  const Icon = tile.icon;
  const color = accentColor(tile.accent);
  const TrendIcon = tile.trend.dir === "up" ? TrendingUp : TrendingDown;
  return (
    <button onClick={onClick} className={`cc-tile ${active ? "is-active" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <div
          className="size-11 rounded-xl grid place-items-center shrink-0"
          style={{
            background: `color-mix(in oklab, ${color} 18%, transparent)`,
            color,
            boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${color} 35%, transparent)`,
          }}
        >
          <Icon className="size-5" />
        </div>
        <span
          className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full"
          style={{
            background: `color-mix(in oklab, ${accentColor(tile.badge.tone)} 16%, transparent)`,
            color: accentColor(tile.badge.tone),
          }}
        >
          {tile.badge.label}
        </span>
      </div>

      <div className="mt-4">
        <div className="text-[12px] text-muted-foreground font-medium">{tile.title}</div>
        <div className="mt-1 flex items-baseline gap-2">
          <div className="text-[30px] font-semibold tracking-tight tabular-nums leading-none">{tile.value}</div>
          <span
            className="inline-flex items-center gap-0.5 text-[11px] font-medium tabular-nums"
            style={{ color: tile.trend.dir === "up" ? "var(--success)" : "var(--destructive)" }}
          >
            <TrendIcon className="size-3" />
            {tile.trend.value}
          </span>
        </div>
        <div className="mt-2 text-[11px] text-muted-foreground line-clamp-2 min-h-[28px]">{tile.status}</div>
      </div>

      <div className="mt-3 pt-3 border-t border-border/70 flex items-center justify-between text-[11px] font-medium" style={{ color }}>
        <span>View details</span>
        <ChevronRight className="size-3.5" />
      </div>
    </button>
  );
}

/* ─── Drawer ─────────────────────────────────────────── */

function DetailDrawer({ tile, onClose }: { tile: Tile | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {tile && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/30 backdrop-blur-[2px] z-50"
          />
          <motion.aside
            key={tile.id}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 280 }}
            className="cc-drawer"
          >
            <DrawerHeader tile={tile} onClose={onClose} />
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <DrawerBody tile={tile} />
            </div>
            <DrawerActions tile={tile} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function DrawerHeader({ tile, onClose }: { tile: Tile; onClose: () => void }) {
  const Icon = tile.icon;
  const color = accentColor(tile.accent);
  return (
    <div className="relative px-5 pt-5 pb-4 border-b border-border">
      <div className="flex items-start gap-3">
        <div
          className="size-11 rounded-xl grid place-items-center shrink-0"
          style={{
            background: `color-mix(in oklab, ${color} 20%, transparent)`,
            color,
          }}
        >
          <Icon className="size-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold leading-tight">{tile.title}</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">{tile.status}</p>
        </div>
        <button onClick={onClose} className="size-8 grid place-items-center rounded-md hover:bg-secondary text-muted-foreground" aria-label="Close">
          <X className="size-4" />
        </button>
      </div>
      <div className="mt-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <input
          placeholder={`Search in ${tile.title}…`}
          className="w-full h-9 pl-9 pr-3 text-xs rounded-md bg-surface-2 border border-border outline-none focus:ring-2 focus:ring-teal/30"
        />
      </div>
    </div>
  );
}

function DrawerBody({ tile }: { tile: Tile }) {
  switch (tile.id) {
    case "active-loads":
    case "freight":
      return <LoadsList />;
    case "available-drivers":
    case "driver-profiles":
      return <DriversList />;
    case "delayed-loads":
      return <DelaysList />;
    case "route-planner":
      return <RoutesList />;
    case "vehicle-status":
      return <VehiclesList />;
    case "facilities":
      return <FacilitiesList />;
    case "courier":
      return <CourierList />;
    case "geofences":
      return <ZonesList />;
    case "weather":
      return <WeatherList />;
    case "alerts":
      return <AlertList />;
    default:
      return null;
  }
}

function DrawerActions({ tile }: { tile: Tile }) {
  const actions = [
    { label: "Assign Driver", icon: UserPlus },
    { label: "View on Map", icon: MapIcon },
    { label: "Message Driver", icon: MessageSquare },
    { label: "Reassign Load", icon: Send },
    { label: "Create Alert", icon: Siren },
    { label: "Export Report", icon: FileDown },
  ];
  return (
    <div className="px-5 py-3 border-t border-border bg-surface-2/40">
      <div className="grid grid-cols-2 gap-2">
        {actions.map((a) => (
          <button
            key={a.label}
            className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg text-[12px] font-medium bg-card border border-border hover:border-teal/50 hover:text-teal transition"
          >
            <a.icon className="size-3.5" />
            {a.label}
          </button>
        ))}
      </div>
      <div className="mt-2 text-[10px] text-muted-foreground text-center">
        Context: {tile.title}
      </div>
    </div>
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
