import { motion } from "framer-motion";
import { drivers, statusMeta } from "@/data/mock";
import type { Driver } from "@/types";
import { Layers, Navigation, Eye, Zap, Users, Truck, Plus, Minus, Compass, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Project lat/lng across continental US into a 0..1 box
function project(lat: number, lng: number) {
  const minLat = 24, maxLat = 49;
  const minLng = -125, maxLng = -66;
  const x = (lng - minLng) / (maxLng - minLng);
  const y = 1 - (lat - minLat) / (maxLat - minLat);
  return { x: Math.max(0.02, Math.min(0.98, x)), y: Math.max(0.05, Math.min(0.95, y)) };
}

const toggles = [
  { id: "routes", label: "Routes", icon: Navigation },
  { id: "traffic", label: "Traffic", icon: Zap },
  { id: "heat", label: "Heatmap", icon: Layers },
  { id: "cluster", label: "Cluster", icon: Users },
];

// Stylized US continental outline (simplified)
const US_PATH =
  "M5,38 L8,32 L14,28 L20,26 L28,24 L36,22 L44,21 L52,20 L60,20 L68,22 L74,24 L78,26 L82,25 L86,22 L90,20 L93,22 L95,26 L96,32 L95,38 L92,44 L88,48 L84,52 L82,58 L84,64 L83,70 L80,74 L75,76 L70,77 L64,76 L58,74 L52,72 L46,70 L40,68 L34,66 L28,64 L22,62 L17,58 L12,52 L8,46 L5,42 Z";

export function LiveMapPanel({
  onSelectDriver,
  selectedId,
  className,
  compact = false,
}: {
  onSelectDriver?: (d: Driver) => void;
  selectedId?: string | null;
  className?: string;
  compact?: boolean;
}) {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [active, setActive] = useState<Record<string, boolean>>({ routes: true, traffic: true });

  const filtered = drivers.filter(
    (d) => !statusFilter || d.status === statusFilter,
  );

  return (
    <div
      className={cn(
        "relative rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-md)]",
        className,
      )}
    >
      {/* Map surface */}
      <div className="absolute inset-0 map-grid map-radial" />

      {/* Stylized continent silhouette */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="landGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--surface)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--surface)" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="routeGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--teal)" />
            <stop offset="100%" stopColor="var(--orange)" />
          </linearGradient>
          <linearGradient id="trafficGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--success)" stopOpacity="0.45" />
            <stop offset="50%" stopColor="var(--warning)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--destructive)" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Continent fill */}
        <path
          d={US_PATH}
          fill="url(#landGrad)"
          stroke="color-mix(in oklab, var(--foreground) 18%, transparent)"
          strokeWidth="0.18"
        />

        {/* Highways */}
        {active.traffic && (
          <g stroke="var(--map-highway)" strokeWidth="0.45" fill="none" opacity="0.7" strokeLinecap="round">
            <path d="M10,55 L92,40" />
            <path d="M20,30 L70,75" />
            <path d="M50,20 L52,76" />
            <path d="M14,42 L88,62" />
          </g>
        )}

        {/* Routes between drivers */}
        {active.routes &&
          filtered
            .filter((d) => d.currentLoadId)
            .map((d, i) => {
              const p = project(d.currentLocation.lat, d.currentLocation.lng);
              const target = project(
                d.currentLocation.lat + Math.sin(i) * 3,
                d.currentLocation.lng + Math.cos(i) * 5,
              );
              const cx = (p.x + target.x) * 50;
              const cy = (p.y + target.y) * 50 - 6;
              return (
                <g key={d.id}>
                  <path
                    d={`M ${p.x * 100} ${p.y * 100} Q ${cx} ${cy} ${target.x * 100} ${target.y * 100}`}
                    stroke="url(#routeGrad)"
                    strokeWidth="0.45"
                    fill="none"
                    opacity="0.85"
                    strokeLinecap="round"
                    className="route-flow"
                  />
                </g>
              );
            })}
      </svg>

      {/* Top toolbar */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 p-3">
        <div className="flex flex-wrap items-center gap-1 bg-popover/85 backdrop-blur-md rounded-lg border border-border p-1 shadow-[var(--shadow-sm)]">
          <button
            onClick={() => setStatusFilter(null)}
            className={cn(
              "text-xs px-2.5 py-1 rounded-md font-medium transition",
              !statusFilter ? "bg-teal text-teal-foreground" : "text-foreground/70 hover:bg-secondary",
            )}
          >
            All <span className="tabular-nums opacity-80">{drivers.length}</span>
          </button>
          {(Object.keys(statusMeta) as Array<keyof typeof statusMeta>).slice(0, 6).map((s) => {
            const count = drivers.filter((d) => d.status === s).length;
            if (!count) return null;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s === statusFilter ? null : s)}
                className={cn(
                  "text-xs px-2 py-1 rounded-md inline-flex items-center gap-1.5 transition",
                  statusFilter === s ? "bg-secondary text-foreground" : "text-foreground/70 hover:bg-secondary/60",
                )}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: `var(--${statusMeta[s].token})` }}
                />
                {statusMeta[s].label}
                <span className="text-muted-foreground tabular-nums">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-1 bg-popover/85 backdrop-blur-md rounded-lg border border-border p-1 shadow-[var(--shadow-sm)]">
          {toggles.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActive((a) => ({ ...a, [t.id]: !a[t.id] }))}
                className={cn(
                  "text-xs px-2 py-1 rounded-md inline-flex items-center gap-1.5 transition",
                  active[t.id]
                    ? "bg-teal text-teal-foreground"
                    : "text-foreground/70 hover:bg-secondary",
                )}
              >
                <Icon className="size-3.5" />
                {!compact && t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Driver markers */}
      <div className="absolute inset-0 pointer-events-none">
        {filtered.map((d) => {
          const p = project(d.currentLocation.lat, d.currentLocation.lng);
          const color = `var(--${statusMeta[d.status].token})`;
          const selected = selectedId === d.id;
          const moving = d.currentSpeed > 0;
          return (
            <button
              key={d.id}
              onClick={() => onSelectDriver?.(d)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group pointer-events-auto"
              style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
            >
              {moving && (
                <motion.span
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-3 rounded-full"
                  style={{ backgroundColor: color, opacity: 0.4 }}
                  animate={{ scale: [1, 2.6, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              {/* Pin */}
              <div
                className={cn(
                  "relative grid place-items-center rounded-full ring-2 ring-card transition-all",
                  selected ? "size-5 ring-[3px]" : "size-3.5 group-hover:size-4",
                )}
                style={{
                  backgroundColor: color,
                  boxShadow: `0 4px 10px -2px color-mix(in oklab, ${color} 55%, transparent), 0 0 0 1px color-mix(in oklab, ${color} 60%, transparent)`,
                }}
              >
                {selected && <span className="size-1.5 rounded-full bg-card" />}
              </div>

              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition absolute left-1/2 -translate-x-1/2 mt-2 z-20 whitespace-nowrap rounded-lg border border-border bg-popover px-2.5 py-2 text-[11px] shadow-[var(--shadow-md)] min-w-44 text-left">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">{d.name}</span>
                  <span
                    className="text-[9px] font-semibold uppercase tracking-wider px-1 py-0.5 rounded"
                    style={{
                      color,
                      backgroundColor: `color-mix(in oklab, ${color} 14%, transparent)`,
                    }}
                  >
                    {d.cdlStatus ? "CDL" : "Non-CDL"}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                  <Truck className="size-3" /> {d.vehicleType}
                </div>
                <div className="mt-1 flex items-center justify-between gap-2 text-muted-foreground">
                  <span className="tabular-nums">{d.currentSpeed} mph</span>
                  <span className="tabular-nums">ETA {d.eta ?? "—"}</span>
                </div>
                <div className="mt-1 text-[10px] text-muted-foreground/80">
                  {d.currentLocation.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Map controls — zoom + compass */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1.5">
        <div className="flex flex-col bg-popover/85 backdrop-blur-md rounded-lg border border-border shadow-[var(--shadow-sm)] overflow-hidden">
          <button className="size-8 grid place-items-center hover:bg-secondary"><Plus className="size-3.5" /></button>
          <div className="h-px bg-border" />
          <button className="size-8 grid place-items-center hover:bg-secondary"><Minus className="size-3.5" /></button>
        </div>
        <button className="size-8 grid place-items-center rounded-lg border border-border bg-popover/85 backdrop-blur-md shadow-[var(--shadow-sm)] hover:bg-secondary">
          <Compass className="size-3.5" />
        </button>
        <button className="size-8 grid place-items-center rounded-lg border border-border bg-popover/85 backdrop-blur-md shadow-[var(--shadow-sm)] hover:bg-secondary">
          <Maximize2 className="size-3.5" />
        </button>
      </div>

      {/* Bottom-left legend */}
      {active.traffic && (
        <div className="absolute bottom-3 left-3 z-10 rounded-lg border border-border bg-popover/85 backdrop-blur-md px-2.5 py-1.5 text-[10px] shadow-[var(--shadow-sm)]">
          <div className="font-semibold text-foreground/80 mb-1">Traffic</div>
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-4 rounded-full bg-success" />
            <span className="h-1 w-4 rounded-full bg-warning" />
            <span className="h-1 w-4 rounded-full bg-destructive" />
            <span className="ml-1 text-muted-foreground">Flow</span>
          </div>
        </div>
      )}

      {/* Bottom-right live status */}
      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-lg border border-border bg-popover/85 backdrop-blur-md px-3 py-1.5 text-[11px] shadow-[var(--shadow-sm)]">
        <Eye className="size-3" />
        <span className="font-medium tabular-nums">{filtered.length}</span>
        <span className="text-muted-foreground">units live</span>
        <span className="ml-1 size-1.5 rounded-full bg-success animate-pulse" />
      </div>

      {filtered.length === 0 && (
        <div className="absolute inset-0 grid place-items-center z-10">
          <div className="rounded-xl border border-border bg-popover/90 backdrop-blur px-5 py-4 text-center shadow-[var(--shadow-md)]">
            <div className="text-sm font-medium">No drivers match this filter</div>
            <div className="text-xs text-muted-foreground mt-0.5">Adjust status filters above to see units.</div>
          </div>
        </div>
      )}
    </div>
  );
}
