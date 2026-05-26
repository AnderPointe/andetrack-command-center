import {
  MapPin,
  Navigation,
  Signal,
  Gauge,
  Plus,
  Minus,
  Locate,
  Layers,
  Compass,
} from "lucide-react";
import type { Driver, Shipment } from "@/types/anderroute";
import LiquidGlassCard from "./LiquidGlassCard";
import LiquidIconButton from "./LiquidIconButton";

interface Props {
  driver: Driver;
  shipment: Shipment;
}

export function LiveRouteMapCard({ driver, shipment }: Props) {
  return (
    <LiquidGlassCard className="overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/40 px-6 py-4 dark:border-white/10">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--lg-teal)]">
            Live Route
          </p>
          <h3 className="mt-1 text-base font-bold text-[var(--lg-text)]">
            {shipment.pickup_address}{" "}
            <span className="mx-1 text-[var(--lg-muted)]">→</span>{" "}
            {shipment.dropoff_address}
          </h3>
        </div>
        <LiquidGlassCard className="px-2.5 py-1">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-300">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            GPS Live
          </span>
        </LiquidGlassCard>
      </div>

      {/* Map */}
      <div className="relative h-[360px] overflow-hidden bg-[#eef2f6] dark:bg-[#0b1426]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 360" preserveAspectRatio="none">
          <defs>
            <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e1a2e" className="[stop-color:#e2e8f0] dark:[stop-color:#0e1a2e]" />
              <stop offset="100%" stopColor="#0a1322" className="[stop-color:#cbd5e1] dark:[stop-color:#0a1322]" />
            </linearGradient>
            <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
            <pattern id="blocks" width="22" height="22" patternUnits="userSpaceOnUse">
              <path d="M22 0H0V22" fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="500" height="360" fill="url(#land)" />
          <rect width="500" height="360" fill="url(#blocks)" />

          {/* Parks */}
          <path d="M40 230 Q80 200 130 220 T220 240 L210 295 L60 300 Z" fill="rgba(34,197,94,0.18)" stroke="rgba(34,197,94,0.30)" strokeWidth="0.6" />
          <path d="M330 40 Q380 30 440 55 L455 110 L360 120 Z" fill="rgba(34,197,94,0.18)" stroke="rgba(34,197,94,0.30)" strokeWidth="0.6" />

          {/* River */}
          <path d="M-10 320 Q 120 260 230 305 T 520 270" fill="none" stroke="#1e3a8a" strokeOpacity="0.45" strokeWidth="14" strokeLinecap="round" />
          <path d="M-10 320 Q 120 260 230 305 T 520 270" fill="none" stroke="#3b82f6" strokeOpacity="0.5" strokeWidth="6" strokeLinecap="round" />

          {/* Local streets */}
          <g stroke="#94a3b8" strokeOpacity="0.5" strokeWidth="1">
            <path d="M0 70 H500" /><path d="M0 130 H500" /><path d="M0 190 H500" /><path d="M0 250 H500" />
            <path d="M80 0 V360" /><path d="M170 0 V360" /><path d="M260 0 V360" /><path d="M350 0 V360" /><path d="M430 0 V360" />
          </g>

          {/* Highway */}
          <path d="M20 300 Q 150 220 260 200 T 490 140" fill="none" stroke="#475569" strokeWidth="9" strokeLinecap="round" />
          <path d="M20 300 Q 150 220 260 200 T 490 140" fill="none" stroke="#f5c451" strokeWidth="6" strokeLinecap="round" />
          <path d="M20 300 Q 150 220 260 200 T 490 140" fill="none" stroke="#fde68a" strokeOpacity="0.7" strokeWidth="1" strokeDasharray="6 8" strokeLinecap="round" />

          {/* Interstate */}
          <path d="M 50 330 Q 180 240 300 200 T 470 60" fill="none" stroke="#334155" strokeWidth="13" strokeLinecap="round" />
          <path d="M 50 330 Q 180 240 300 200 T 470 60" fill="none" stroke="#f1f5f9" strokeWidth="8.5" strokeLinecap="round" />
          <path d="M 50 330 Q 180 240 300 200 T 470 60" fill="none" stroke="#475569" strokeOpacity="0.6" strokeWidth="0.8" strokeDasharray="4 6" strokeLinecap="round" />

          {/* Shields */}
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

          {/* Active route */}
          <path d="M 70 280 Q 200 150 320 120 T 430 90" fill="none" stroke="url(#routeGrad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 70 280 Q 200 150 320 120 T 430 90" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="2 9" strokeLinecap="round" />
        </svg>

        {/* Pickup pin */}
        <div className="absolute" style={{ left: "10%", top: "75%" }}>
          <div className="flex flex-col items-center">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-[var(--lg-teal)]/90 shadow-lg shadow-teal-500/40 ring-4 ring-[var(--lg-teal)]/20 backdrop-blur-xl">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <LiquidGlassCard className="mt-1 px-2 py-0.5">
              <span className="text-[10px] font-semibold text-[var(--lg-teal)]">Pickup</span>
            </LiquidGlassCard>
          </div>
        </div>

        {/* Dropoff pin */}
        <div className="absolute" style={{ right: "10%", top: "20%" }}>
          <div className="flex flex-col items-center">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-[var(--lg-orange)]/90 shadow-lg shadow-orange-500/40 ring-4 ring-[var(--lg-orange)]/20 backdrop-blur-xl">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <LiquidGlassCard className="mt-1 px-2 py-0.5">
              <span className="text-[10px] font-semibold text-[var(--lg-orange)]">Dropoff</span>
            </LiquidGlassCard>
          </div>
        </div>

        {/* Driver marker */}
        <div className="absolute" style={{ left: "55%", top: "38%" }}>
          <div className="relative flex flex-col items-center">
            <div className="absolute -inset-3 animate-ping rounded-full bg-orange-400/30" />
            <div className="relative grid h-12 w-12 place-items-center rounded-full border border-white/40 bg-gradient-to-br from-[var(--lg-teal)] to-[var(--lg-orange)] shadow-xl shadow-orange-500/40 ring-4 ring-white/40 backdrop-blur-xl dark:ring-slate-950/60">
              <Navigation
                className="h-5 w-5 text-white"
                style={{ transform: `rotate(${driver.bearing}deg)` }}
              />
            </div>
            <LiquidGlassCard className="mt-2 px-2.5 py-1">
              <span className="text-[11px] font-bold text-[var(--lg-text)]">
                ETA {shipment.eta_minutes}m
              </span>
            </LiquidGlassCard>
          </div>
        </div>

        {/* ETA + chips (top-left) */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          <LiquidGlassCard className="px-3.5 py-2">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--lg-teal)]">
              ETA
            </p>
            <p className="text-2xl font-black leading-none text-[var(--lg-text)]">
              {shipment.eta_minutes}
              <span className="ml-1 text-xs font-medium text-[var(--lg-muted)]">min</span>
            </p>
            <p className="mt-1 text-[10px] text-[var(--lg-muted)]">
              Arrive {shipment.scheduled_arrival}
            </p>
          </LiquidGlassCard>
          <GlassChip icon={Gauge} label={`${driver.speed_mph} mph`} />
          <GlassChip icon={Signal} label="96% signal" />
        </div>

        {/* Map controls (top-right) */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <LiquidIconButton size="sm" variant="teal" label="Zoom in">
            <Plus className="h-4 w-4" />
          </LiquidIconButton>
          <LiquidIconButton size="sm" variant="default" label="Zoom out">
            <Minus className="h-4 w-4" />
          </LiquidIconButton>
          <LiquidIconButton size="sm" variant="orange" label="Recenter on driver">
            <Locate className="h-4 w-4" />
          </LiquidIconButton>
          <LiquidIconButton size="sm" variant="default" label="Toggle layers">
            <Layers className="h-4 w-4" />
          </LiquidIconButton>
          <LiquidIconButton size="sm" variant="default" label="Reset bearing">
            <Compass className="h-4 w-4" />
          </LiquidIconButton>
        </div>

        {/* Last ping (bottom-right) */}
        <LiquidGlassCard className="absolute bottom-4 right-4 px-3.5 py-2">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--lg-orange)]">
            Last Ping
          </p>
          <p className="text-sm font-bold text-[var(--lg-text)]">2s ago</p>
        </LiquidGlassCard>

        {/* Pickup → Dropoff strip (bottom-left) */}
        <LiquidGlassCard className="absolute bottom-4 left-4 max-w-[60%] px-3.5 py-2">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-full bg-[var(--lg-teal)] shadow-[0_0_6px_rgba(20,184,166,0.8)]" />
            <span className="truncate font-semibold text-[var(--lg-teal)]">
              {shipment.pickup_address}
            </span>
            <span className="text-[var(--lg-muted)]">→</span>
            <span className="h-2 w-2 rounded-full bg-[var(--lg-orange)] shadow-[0_0_6px_rgba(251,146,60,0.8)]" />
            <span className="truncate font-semibold text-[var(--lg-orange)]">
              {shipment.dropoff_address}
            </span>
          </div>
        </LiquidGlassCard>
      </div>
    </LiquidGlassCard>
  );
}

function GlassChip({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <LiquidGlassCard className="px-2.5 py-1">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--lg-text)]">
        <Icon className="h-3 w-3 text-[var(--lg-teal)]" />
        {label}
      </span>
    </LiquidGlassCard>
  );
}
