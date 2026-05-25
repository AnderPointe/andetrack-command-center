import { MapPin, Navigation, Signal, Gauge } from "lucide-react";
import type { Driver, Shipment } from "@/types/anderroute";

interface Props {
  driver: Driver;
  shipment: Shipment;
}

/**
 * MapLibre-ready map card. Renders a dark logistics-style SVG visualization
 * as a placeholder; swap the inner SVG for a <MapLibre /> component when the
 * real map is wired up.
 */
export function LiveRouteMapCard({ driver, shipment }: Props) {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/5 bg-slate-900 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-teal-300">
            Live Route
          </p>
          <h3 className="mt-0.5 text-base font-bold text-white">
            {shipment.pickup_address} → {shipment.dropoff_address}
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-400/30">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
          GPS Live
        </span>
      </div>

      <div className="relative h-[360px] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Grid */}
        <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-ar" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(45 212 191 / 0.15)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-ar)" />
        </svg>

        {/* Route line */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 360" preserveAspectRatio="none">
          <defs>
            <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
          </defs>
          <path
            d="M 70 280 Q 200 100, 430 90"
            stroke="url(#routeGrad)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
        </svg>

        {/* Pickup pin */}
        <div className="absolute" style={{ left: "10%", top: "75%" }}>
          <div className="flex flex-col items-center">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-teal-500 shadow-lg shadow-teal-500/50 ring-4 ring-teal-500/20">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <div className="mt-1 rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-semibold text-teal-300 ring-1 ring-teal-400/30">
              Pickup
            </div>
          </div>
        </div>

        {/* Dropoff pin */}
        <div className="absolute" style={{ right: "10%", top: "20%" }}>
          <div className="flex flex-col items-center">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-orange-500 shadow-lg shadow-orange-500/50 ring-4 ring-orange-500/20">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <div className="mt-1 rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-semibold text-orange-300 ring-1 ring-orange-400/30">
              Dropoff
            </div>
          </div>
        </div>

        {/* Driver marker */}
        <div className="absolute" style={{ left: "55%", top: "38%" }}>
          <div className="relative flex flex-col items-center">
            <div className="absolute -inset-3 animate-ping rounded-full bg-orange-400/30" />
            <div className="relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl shadow-orange-500/40 ring-4 ring-slate-950">
              <Navigation
                className="h-5 w-5 text-white"
                style={{ transform: `rotate(${driver.bearing}deg)` }}
              />
            </div>
            <div className="mt-2 rounded-lg bg-slate-950/90 px-2.5 py-1 text-[11px] font-bold text-white shadow-lg ring-1 ring-white/10">
              ETA {shipment.eta_minutes}m
            </div>
          </div>
        </div>

        {/* Floating telemetry chips */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          <Chip icon={Gauge} label={`${driver.speed_mph} mph`} />
          <Chip icon={Signal} label="96% signal" />
        </div>

        <div className="absolute bottom-4 right-4 rounded-xl bg-slate-950/80 px-3 py-2 text-[11px] text-slate-300 ring-1 ring-white/10 backdrop-blur">
          Last ping <span className="font-semibold text-white">2s ago</span>
        </div>
      </div>
    </section>
  );
}

function Chip({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/80 px-2.5 py-1 text-[11px] font-medium text-slate-200 ring-1 ring-white/10 backdrop-blur">
      <Icon className="h-3 w-3 text-teal-300" />
      {label}
    </div>
  );
}
