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
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f172a] shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2dd4bf]">
            Live Route
          </p>
          <h3 className="mt-1 text-base font-bold text-white">
            {shipment.pickup_address}{" "}
            <span className="mx-1 text-slate-600">→</span>{" "}
            {shipment.dropoff_address}
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-400/30">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
          GPS Live
        </span>
      </div>


      <div className="relative h-[360px] overflow-hidden bg-[#0b1426]">
        {/* Cartographic base: land, parks, water, streets, highways, interstate, labels */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 360" preserveAspectRatio="none">
          <defs>
            <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e1a2e" />
              <stop offset="100%" stopColor="#0a1322" />
            </linearGradient>
            <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
            <pattern id="blocks" width="22" height="22" patternUnits="userSpaceOnUse">
              <path d="M22 0H0V22" fill="none" stroke="rgba(148,163,184,0.06)" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="500" height="360" fill="url(#land)" />
          <rect width="500" height="360" fill="url(#blocks)" />

          {/* Parks */}
          <path d="M40 230 Q80 200 130 220 T220 240 L210 295 L60 300 Z" fill="rgba(34,197,94,0.10)" stroke="rgba(34,197,94,0.20)" strokeWidth="0.6" />
          <path d="M330 40 Q380 30 440 55 L455 110 L360 120 Z" fill="rgba(34,197,94,0.10)" stroke="rgba(34,197,94,0.20)" strokeWidth="0.6" />

          {/* River / water */}
          <path d="M-10 320 Q 120 260 230 305 T 520 270" fill="none" stroke="#1e3a8a" strokeOpacity="0.6" strokeWidth="14" strokeLinecap="round" />
          <path d="M-10 320 Q 120 260 230 305 T 520 270" fill="none" stroke="#3b82f6" strokeOpacity="0.35" strokeWidth="6" strokeLinecap="round" />

          {/* Local streets — grey grid */}
          <g stroke="#334155" strokeOpacity="0.6" strokeWidth="1">
            <path d="M0 70 H500" /><path d="M0 130 H500" /><path d="M0 190 H500" /><path d="M0 250 H500" />
            <path d="M80 0 V360" /><path d="M170 0 V360" /><path d="M260 0 V360" /><path d="M350 0 V360" /><path d="M430 0 V360" />
          </g>
          <g stroke="#64748b" strokeOpacity="0.35" strokeWidth="0.4" strokeDasharray="2 3">
            <path d="M0 70 H500" /><path d="M0 190 H500" /><path d="M170 0 V360" /><path d="M350 0 V360" />
          </g>

          {/* Secondary highway — gold */}
          <path d="M20 300 Q 150 220 260 200 T 490 140" fill="none" stroke="#0f172a" strokeWidth="9" strokeLinecap="round" />
          <path d="M20 300 Q 150 220 260 200 T 490 140" fill="none" stroke="#f5c451" strokeWidth="6" strokeLinecap="round" />
          <path d="M20 300 Q 150 220 260 200 T 490 140" fill="none" stroke="#fde68a" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="6 8" strokeLinecap="round" />

          {/* Interstate — thick white artery */}
          <path d="M 50 330 Q 180 240 300 200 T 470 60" fill="none" stroke="#1e293b" strokeWidth="13" strokeLinecap="round" />
          <path d="M 50 330 Q 180 240 300 200 T 470 60" fill="none" stroke="#e2e8f0" strokeWidth="8.5" strokeLinecap="round" />
          <path d="M 50 330 Q 180 240 300 200 T 470 60" fill="none" stroke="#0b1426" strokeWidth="0.8" strokeDasharray="4 6" strokeLinecap="round" />

          {/* Highway shields */}
          <g fontFamily="ui-sans-serif, system-ui" fontWeight="800">
            <g transform="translate(150 252)">
              <path d="M0 -12 L12 -4 L12 8 L0 14 L-12 8 L-12 -4 Z" fill="#dc2626" stroke="#fff" strokeWidth="1.2" />
              <text textAnchor="middle" y="4" fill="#fff" fontSize="9">I-45</text>
            </g>
            <g transform="translate(395 118)">
              <path d="M0 -12 L12 -4 L12 8 L0 14 L-12 8 L-12 -4 Z" fill="#dc2626" stroke="#fff" strokeWidth="1.2" />
              <text textAnchor="middle" y="4" fill="#fff" fontSize="9">I-10</text>
            </g>
            <g transform="translate(265 207)">
              <rect x="-13" y="-10" width="26" height="18" rx="3" fill="#f5c451" stroke="#7c2d12" strokeWidth="1" />
              <text textAnchor="middle" y="3" fill="#1c1917" fontSize="9">US 75</text>
            </g>
          </g>

          {/* Street labels */}
          <g fill="#94a3b8" fontSize="8" fontFamily="ui-sans-serif, system-ui" opacity="0.8">
            <text x="6" y="66">Main St</text>
            <text x="6" y="186">Commerce Ave</text>
            <text x="174" y="20" transform="rotate(90 174 20)">Harwood St</text>
            <text x="354" y="20" transform="rotate(90 354 20)">Industrial Blvd</text>
            <text x="420" y="268" fill="#60a5fa" opacity="0.95">Trinity River</text>
          </g>

          {/* Active route overlay */}
          <path d="M 70 280 Q 200 150 320 120 T 430 90" fill="none" stroke="url(#routeGrad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 70 280 Q 200 150 320 120 T 430 90" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="2 9" strokeLinecap="round" />
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

        {/* Floating ETA + speed (top-left) */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          <div className="rounded-2xl border border-white/10 bg-slate-950/85 px-3.5 py-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#2dd4bf]">
              ETA
            </p>
            <p className="text-2xl font-black leading-none text-white">
              {shipment.eta_minutes}
              <span className="ml-1 text-xs font-medium text-slate-400">min</span>
            </p>
            <p className="mt-1 text-[10px] text-slate-400">
              Arrive {shipment.scheduled_arrival}
            </p>
          </div>
          <Chip icon={Gauge} label={`${driver.speed_mph} mph`} />
          <Chip icon={Signal} label="96% signal" />
        </div>

        {/* Last ping (bottom-right) */}
        <div className="absolute bottom-4 right-4 rounded-2xl border border-white/10 bg-slate-950/85 px-3.5 py-2 text-[11px] text-slate-300 shadow-xl backdrop-blur-xl">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#fb923c]">
            Last Ping
          </p>
          <p className="text-sm font-bold text-white">2s ago</p>
        </div>

        {/* Pickup → Dropoff label strip (bottom-left) */}
        <div className="absolute bottom-4 left-4 max-w-[60%] rounded-2xl border border-white/10 bg-slate-950/85 px-3.5 py-2 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_6px_rgba(45,212,191,0.8)]" />
            <span className="truncate font-semibold text-teal-200">{shipment.pickup_address}</span>
            <span className="text-slate-600">→</span>
            <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_6px_rgba(251,146,60,0.8)]" />
            <span className="truncate font-semibold text-orange-200">{shipment.dropoff_address}</span>
          </div>
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
