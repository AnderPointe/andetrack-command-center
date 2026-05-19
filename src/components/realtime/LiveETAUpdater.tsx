import { Clock } from "lucide-react";

export function LiveETAUpdater({ etaMinutes, deltaMin, className = "" }: { etaMinutes: number; deltaMin?: number; className?: string }) {
  const tone = deltaMin && deltaMin > 5 ? "text-amber-300" : deltaMin && deltaMin > 15 ? "text-red-300" : "text-emerald-300";
  return (
    <div className={`inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs ${className}`}>
      <Clock className="h-3.5 w-3.5 text-teal-300" />
      <span className="font-semibold text-slate-100">{etaMinutes} min</span>
      {deltaMin != null && deltaMin !== 0 && (
        <span className={tone}>{deltaMin > 0 ? `+${deltaMin}` : deltaMin} min</span>
      )}
    </div>
  );
}
