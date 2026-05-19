import { Clock, Gauge, MapPin, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { computeETAClock, formatMinutes } from "@/utils/elitenav";

interface Props {
  etaMinutes: number;
  remainingMiles: number;
  currentSpeed: number;
  speedLimit: number;
  delayMin: number;
  deliveryWindow: string;
  trafficLabel: "Clear" | "Light" | "Moderate" | "Heavy";
  big?: boolean;
}

const trafficTone: Record<Props["trafficLabel"], string> = {
  Clear: "bg-emerald-500/10 text-emerald-200 border-emerald-500/30",
  Light: "bg-teal-500/10 text-teal-200 border-teal-500/30",
  Moderate: "bg-orange-500/10 text-orange-200 border-orange-500/30",
  Heavy: "bg-red-500/10 text-red-200 border-red-500/30",
};

export function ETACard({
  etaMinutes,
  remainingMiles,
  currentSpeed,
  speedLimit,
  delayMin,
  deliveryWindow,
  trafficLabel,
  big = false,
}: Props) {
  const over = currentSpeed > speedLimit;
  const speedPct = Math.min(100, (currentSpeed / Math.max(speedLimit + 10, 1)) * 100);
  const ahead = delayMin < 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e1820]/95 via-[#0b141b]/95 to-[#0a1218]/95 p-4 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.2em] text-teal-300/70">Estimated Arrival</div>
          <div className="mt-0.5 flex items-baseline gap-2">
            <div className={"font-semibold text-white tracking-tight tabular-nums " + (big ? "text-6xl" : "text-4xl")}>
              {computeETAClock(etaMinutes)}
            </div>
            <span className="text-xs text-slate-500">local</span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {formatMinutes(etaMinutes)}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {remainingMiles.toFixed(1)} mi
            </span>
            {delayMin !== 0 && (
              <span
                className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                  ahead
                    ? "bg-emerald-500/10 text-emerald-200"
                    : "bg-orange-500/10 text-orange-200"
                }`}
              >
                {ahead ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                {ahead ? "" : "+"}{delayMin}m vs plan
              </span>
            )}
          </div>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${trafficTone[trafficLabel]}`}>
          {trafficLabel} traffic
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {/* Speedometer tile */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-2.5">
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-slate-500">
            <Gauge className="h-3 w-3" /> Speed
          </div>
          <div className={`mt-1 text-2xl font-semibold tabular-nums ${over ? "text-red-400" : "text-white"}`}>
            {currentSpeed}
            <span className="ml-0.5 text-[10px] font-normal text-slate-500">mph</span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className={`h-full rounded-full transition-all ${over ? "bg-red-400" : "bg-teal-400"}`}
              style={{ width: `${speedPct}%` }}
            />
          </div>
        </div>
        {/* Speed limit shield */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-2.5">
          <div className="text-[10px] uppercase tracking-widest text-slate-500">Limit</div>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-white/40 bg-white text-slate-900">
              <span className="text-sm font-bold tabular-nums leading-none">{speedLimit}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500">mph</span>
          </div>
        </div>
        {/* Delivery window */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-2.5">
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-slate-500">
            <MapPin className="h-3 w-3" /> Window
          </div>
          <div className="mt-1 text-[11px] leading-tight text-slate-100">{deliveryWindow}</div>
        </div>
      </div>

      {delayMin > 8 && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-orange-500/30 bg-orange-500/[0.06] px-2.5 py-2 text-[11px] text-orange-200">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          <span>Delivery window at risk — notify dispatch to adjust receiver appointment.</span>
        </div>
      )}
    </div>
  );
}
