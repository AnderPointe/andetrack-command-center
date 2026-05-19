interface Props {
  progressPct: number;
  totalMiles?: number;
  remainingMiles?: number;
  className?: string;
}

export function RouteProgressLiveBar({ progressPct, totalMiles, remainingMiles, className = "" }: Props) {
  const pct = Math.max(0, Math.min(100, progressPct));
  return (
    <div className={className}>
      <div className="mb-1 flex justify-between text-[10px] uppercase tracking-wider text-slate-400">
        <span>Route · {Math.round(pct)}%</span>
        {totalMiles != null && remainingMiles != null && (
          <span>{(totalMiles - remainingMiles).toFixed(0)} / {totalMiles.toFixed(0)} mi</span>
        )}
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 transition-[width] duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
