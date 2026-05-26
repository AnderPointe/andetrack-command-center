import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { drivers, loads, shipments } from "@/data/mock";
import { DriverStatusBadge } from "@/components/drivers/DriverStatusBadge";
import type { Driver } from "@/types";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Phone,
  Mail,
  Truck,
  Package,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/drivers")({
  head: () => ({
    meta: [
      { title: "Drivers — Anderoute" },
      {
        name: "description",
        content:
          "Driver management dashboard with live status, vehicle assignment, shipment tracking and performance metrics.",
      },
    ],
  }),
  component: DriversPage,
});

type Filter = "all" | "available" | "onroute" | "offduty";

const filterMap: Record<Filter, (d: Driver) => boolean> = {
  all: () => true,
  available: (d) => ["waiting", "accepted", "offered"].includes(d.status),
  onroute: (d) => ["transit", "pickup", "loaded", "delivered"].includes(d.status),
  offduty: (d) => ["offduty", "break", "delayed"].includes(d.status),
};

function DriversPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string>(drivers[0]?.id);

  const filtered = useMemo(
    () =>
      drivers.filter(
        (d) =>
          filterMap[filter](d) &&
          d.name.toLowerCase().includes(q.toLowerCase()),
      ),
    [filter, q],
  );

  const visible = filtered.slice(0, 9);
  const selected = drivers.find((d) => d.id === selectedId) ?? drivers[0];

  const counts = {
    all: drivers.length,
    available: drivers.filter(filterMap.available).length,
    onroute: drivers.filter(filterMap.onroute).length,
    offduty: drivers.filter(filterMap.offduty).length,
  };

  return (
    <AppShell>
      <div className="p-4 md:p-6">
        {/* Page header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h1 className="text-[26px] font-semibold tracking-tight leading-none">
              Drivers
            </h1>
            <div className="mt-1.5 text-xs text-muted-foreground">
              <span className="text-teal font-medium">Dashboard</span>
              <span className="mx-1.5">/</span>
              <span>Drivers</span>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition shadow-[var(--shadow-sm)]">
            <Plus className="size-4" />
            Add New Driver
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">
          {/* MAIN COLUMN */}
          <div>
            {/* Filter row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-1 rounded-full bg-surface-2/70 border border-border p-1">
                {(
                  [
                    ["all", `All (${counts.all})`],
                    ["available", `Available (${counts.available})`],
                    ["onroute", `On Route (${counts.onroute})`],
                    ["offduty", `Off Duty (${counts.offduty})`],
                  ] as [Filter, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`h-8 px-3.5 rounded-full text-[12px] font-medium transition ${
                      filter === key
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search driver"
                  className="w-full h-10 pl-9 pr-3 text-sm rounded-lg bg-card border border-border outline-none focus:ring-2 focus:ring-teal/30"
                />
              </div>
              <button
                className="size-10 grid place-items-center rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground transition"
                aria-label="Filter"
              >
                <SlidersHorizontal className="size-4" />
              </button>
            </div>

            {/* Driver grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visible.map((d) => (
                <DriverCard
                  key={d.id}
                  driver={d}
                  active={d.id === selectedId}
                  onClick={() => setSelectedId(d.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <div className="inline-flex items-center h-8 px-2.5 rounded-md bg-card border border-border text-foreground tabular-nums">
                  9
                </div>
                <span>of {drivers.length} results</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PagerBtn>
                  <ChevronLeft className="size-3.5" />
                </PagerBtn>
                <PagerBtn active>1</PagerBtn>
                <PagerBtn>2</PagerBtn>
                <PagerBtn>3</PagerBtn>
                <PagerBtn>
                  <ChevronRight className="size-3.5" />
                </PagerBtn>
              </div>
            </div>
          </div>

          {/* DETAILS COLUMN */}
          <DriverDetailsPanel driver={selected} />
        </div>
      </div>
    </AppShell>
  );
}

function PagerBtn({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`size-8 grid place-items-center rounded-md text-xs font-medium border transition ${
        active
          ? "bg-teal text-white border-teal"
          : "bg-card border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function DriverCard({
  driver,
  active,
  onClick,
}: {
  driver: Driver;
  active: boolean;
  onClick: () => void;
}) {
  const initials = driver.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const vehicleLabel = driver.currentLoadId
    ? loads.find((l) => l.id === driver.currentLoadId)?.requiredVehicleType
    : null;
  const isDelayed = driver.status === "delayed";
  const isOffline = driver.status === "offduty" || driver.status === "break";
  const isActive = ["transit", "pickup", "loaded"].includes(driver.status);
  const stateClass = isDelayed
    ? "glass-tile-orange"
    : isOffline
      ? "glass-tile-muted"
      : active
        ? "glass-tile-teal glass-tile-selected"
        : isActive
          ? "glass-tile-teal"
          : "";
  return (
    <Link
      to="/drivers/$driverId"
      params={{ driverId: driver.id }}
      onMouseEnter={onClick}
      onFocus={onClick}
      className={`glass-tile glass-tile-hover ${stateClass} block text-left p-5`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="size-20 rounded-full bg-gradient-to-br from-teal/40 to-orange/40 grid place-items-center text-foreground font-semibold text-lg ring-4 ring-white/60 dark:ring-white/10">
            {initials}
          </div>
          {isActive && (
            <span className="absolute inset-0 rounded-full glass-pulse-ring pointer-events-none" />
          )}
          <span
            className={`absolute bottom-1 right-1 size-3 rounded-full ring-2 ring-white/80 dark:ring-slate-900/80 ${
              isDelayed
                ? "bg-orange animate-pulse"
                : isOffline
                  ? "bg-slate-400"
                  : "bg-teal animate-pulse"
            }`}
          />
        </div>
        <h3 className="mt-3 font-semibold text-[15px]">{driver.name}</h3>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-[11px] font-medium text-muted-foreground tabular-nums">
            {driver.id}
          </span>
          <DriverStatusBadge status={driver.status} size="xs" />
        </div>
      </div>


      <div className="mt-4 pt-4 border-t border-border space-y-1.5 text-[11px]">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Phone className="size-3" /> Phone
          </span>
          <span className="tabular-nums">{driver.phone}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground shrink-0">
            <Mail className="size-3" /> Email
          </span>
          <span className="truncate text-foreground/80">{driver.email}</span>
        </div>
      </div>

      <div
        className={`mt-3 rounded-lg border p-2.5 flex items-center gap-2.5 ${
          vehicleLabel
            ? "bg-teal/8 border-teal/20"
            : "bg-surface-2 border-border"
        }`}
      >
        <div
          className={`size-9 rounded-md grid place-items-center shrink-0 ${
            vehicleLabel ? "bg-teal text-white" : "bg-foreground/85 text-background"
          }`}
        >
          <Truck className="size-4" />
        </div>
        <div className="min-w-0">
          {vehicleLabel ? (
            <>
              <div className="text-xs font-semibold truncate">
                {vehicleLabel} — {driver.vehicleId.slice(-5)}
              </div>
              <div className="text-[10px] text-muted-foreground tabular-nums">
                {driver.vehicleId}
              </div>
            </>
          ) : (
            <>
              <div className="text-xs font-semibold">No Assigned Vehicle</div>
              <div className="text-[10px] text-muted-foreground">—</div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

function DriverDetailsPanel({ driver }: { driver: Driver }) {
  const load = loads.find((l) => l.id === driver.currentLoadId);
  const shipment = shipments.find((s) => s.id === driver.activeShipmentId);

  // Mock shipment statistic — sparkline values per weekday
  const week = [60, 45, 70, 55, 80, 95, 70];
  const max = Math.max(...week);
  const peakIdx = week.indexOf(max);

  return (
    <aside className="space-y-4 xl:sticky xl:top-4 self-start">
      {/* Driver Details / current shipment */}
      <section className="glass-tile p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Driver Details</h3>
          <button className="size-7 grid place-items-center rounded-md hover:bg-secondary text-muted-foreground">
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        <div className="rounded-xl bg-surface-2/60 border border-border p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="size-9 rounded-md bg-teal/15 text-teal grid place-items-center shrink-0">
                <Package className="size-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold tabular-nums truncate">
                  #{shipment?.id ?? "SH-" + (load?.id ?? "—")}
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  {load?.customer ?? "No active load"}
                </div>
              </div>
            </div>
            <DriverStatusBadge status={driver.status} size="xs" />
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1.5">
              <span>Progress</span>
              <span className="text-foreground font-semibold tabular-nums">
                60%
              </span>
            </div>
            <div className="relative h-1.5 rounded-full bg-border">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-teal"
                style={{ width: "60%" }}
              />
              <div className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full bg-teal ring-4 ring-teal/20" style={{ left: "60%", transform: "translate(-50%, -50%)" }} />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Origin
              </div>
              <div className="font-semibold mt-0.5 text-[13px]">
                {load?.pickupLocation ?? "—"}
              </div>
              <div className="text-muted-foreground tabular-nums mt-0.5">
                {load?.pickupWindow ?? ""}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Destination
              </div>
              <div className="font-semibold mt-0.5 text-[13px]">
                {load?.dropoffLocation ?? "—"}
              </div>
              <div className="text-muted-foreground tabular-nums mt-0.5">
                ETA {driver.eta ?? "—"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipment Statistic */}
      <section className="glass-tile p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Shipment Statistic</h3>
          <select className="text-[11px] bg-secondary/60 border border-border rounded-md h-7 px-2 outline-none">
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-semibold tabular-nums">980</div>
          <div className="text-[11px] text-muted-foreground">Completed Deliveries</div>
        </div>
        <Sparkline values={week} peakIdx={peakIdx} peakLabel="53 Deliveries" />
        <div className="mt-2 grid grid-cols-7 text-[10px] text-muted-foreground text-center tabular-nums">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="glass-tile p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Performance Metrics</h3>
          <button className="size-7 grid place-items-center rounded-md hover:bg-secondary text-muted-foreground">
            <MoreHorizontal className="size-4" />
          </button>
        </div>
        <div className="text-[11px] text-muted-foreground">On-Time Delivery Rate</div>
        <div className="mt-2 relative h-2 rounded-full bg-border overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal to-orange rounded-full"
            style={{ width: `${driver.onTimePercentage}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="tabular-nums text-muted-foreground">
            {Math.round((driver.onTimePercentage / 100) * 980)}{" "}
            <span className="text-foreground/60">/ 980 Deliveries</span>
          </span>
          <span className="font-semibold tabular-nums">
            {driver.onTimePercentage}%
          </span>
        </div>
      </section>

      {/* Delay Reasons Breakdown */}
      <section className="glass-tile p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Delay Reasons Breakdown</h3>
          <button className="size-7 grid place-items-center rounded-md hover:bg-secondary text-muted-foreground">
            <MoreHorizontal className="size-4" />
          </button>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-semibold tabular-nums">40</div>
          <div className="text-[11px] text-muted-foreground">Delay Cases</div>
        </div>
        <DelayDonut />
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
          <LegendItem color="var(--teal)" label="Misrouted Shipment" pct="40%" sub="16 delays" />
          <LegendItem color="var(--orange)" label="Vehicle Breakdown" pct="30%" sub="12 delays" />
          <LegendItem color="var(--foreground)" label="Accident or Collision" pct="20%" sub="8 delays" />
          <LegendItem color="color-mix(in oklab, var(--foreground) 25%, transparent)" label="Others" pct="10%" sub="4 delays" />
        </div>
      </section>
    </aside>
  );
}

function Sparkline({
  values,
  peakIdx,
  peakLabel,
}: {
  values: number[];
  peakIdx: number;
  peakLabel: string;
}) {
  const w = 300;
  const h = 90;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const step = w / (values.length - 1);
  const points = values.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / (max - min || 1)) * (h - 14) - 6;
    return [x, y] as const;
  });
  const path = points
    .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
    .join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  const peak = points[peakIdx];

  return (
    <div className="mt-3 relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[90px]">
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#spark-fill)" />
        <path d={path} fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" />
        <line
          x1={peak[0]}
          x2={peak[0]}
          y1={peak[1]}
          y2={h}
          stroke="var(--border)"
          strokeDasharray="2 3"
        />
        <circle cx={peak[0]} cy={peak[1]} r="4" fill="var(--teal)" stroke="white" strokeWidth="2" />
      </svg>
      <div
        className="absolute -top-1 px-2 py-0.5 rounded-md bg-teal text-white text-[10px] font-semibold whitespace-nowrap shadow-[var(--shadow-sm)] -translate-x-1/2"
        style={{ left: `${(peakIdx / (values.length - 1)) * 100}%` }}
      >
        {peakLabel}
      </div>
    </div>
  );
}

function DelayDonut() {
  const segs = [
    { value: 40, color: "var(--teal)" },
    { value: 30, color: "var(--orange)" },
    { value: 20, color: "var(--foreground)" },
    { value: 10, color: "color-mix(in oklab, var(--foreground) 25%, transparent)" },
  ];
  const R = 38;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <div className="mt-3 grid place-items-center">
      <div className="relative size-[140px]">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          {segs.map((s, i) => {
            const dash = (s.value / 100) * C;
            const el = (
              <circle
                key={i}
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke={s.color}
                strokeWidth="18"
                strokeDasharray={`${dash} ${C - dash}`}
                strokeDashoffset={-offset}
              />
            );
            offset += dash;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-[10px] text-muted-foreground">Top</div>
            <div className="text-sm font-semibold">16 Delays</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendItem({
  color,
  label,
  pct,
  sub,
}: {
  color: string;
  label: string;
  pct: string;
  sub: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <span
        className="mt-1 size-2.5 rounded-sm shrink-0"
        style={{ backgroundColor: color }}
      />
      <div className="min-w-0">
        <div className="text-[11px] font-medium truncate">{label}</div>
        <div className="text-[10px] text-muted-foreground tabular-nums">
          {pct} · {sub}
        </div>
      </div>
    </div>
  );
}
