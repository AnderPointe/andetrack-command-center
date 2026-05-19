import { Clock, TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  etaMinutes: number;
  /** positive = slower than plan, negative = ahead of plan */
  deltaMin?: number;
  /** "live" shows pulsing dot to indicate fresh recalculation */
  fresh?: boolean;
  className?: string;
}

function clockLabel(minsFromNow: number): string {
  const t = new Date(Date.now() + minsFromNow * 60_000);
  return t.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function LiveETAUpdater({ etaMinutes, deltaMin, fresh, className = "" }: Props) {
  const slip = deltaMin ?? 0;
  const slipTone =
    slip >= 15
      ? "text-red-300 bg-red-500/10 border-red-400/30"
      : slip >= 5
        ? "text-amber-300 bg-amber-500/10 border-amber-400/30"
        : slip <= -5
          ? "text-emerald-300 bg-emerald-500/10 border-emerald-400/30"
          : "text-slate-300 bg-white/[0.04] border-white/10";
  const TrendIcon = slip < 0 ? TrendingDown : TrendingUp;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] px-3 py-1.5 ${className}`}
    >
      <div className="flex items-center gap-1.5 text-teal-300">
        <Clock className="h-3.5 w-3.5" />
        {fresh && (
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-400" />
          </span>
        )}
      </div>
      <div className="leading-tight">
        <div className="text-[10px] uppercase tracking-wider text-slate-400">
          Live ETA
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-semibold tabular-nums text-slate-50">
            {clockLabel(etaMinutes)}
          </span>
          <span className="text-[10.5px] tabular-nums text-slate-400">
            · {etaMinutes} min
          </span>
        </div>
      </div>
      {slip !== 0 && (
        <span
          className={`ml-1 inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${slipTone}`}
        >
          <TrendIcon className="h-3 w-3" />
          {slip > 0 ? `+${slip}` : slip}m
        </span>
      )}
    </div>
  );
}
