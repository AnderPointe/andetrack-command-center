import { Satellite, SignalZero, WifiOff } from "lucide-react";

interface Props {
  active: boolean;
  stale?: boolean;
  /** Optional minutes since last ping. >5 = lost. */
  minutesSince?: number | null;
  className?: string;
}

/**
 * Tri-state GPS pill: live (pulsing emerald), stale (amber), lost (red).
 * Used in driver header, dispatcher driver row, and the live state panel.
 */
export function GPSStatusBadge({ active, stale, minutesSince, className = "" }: Props) {
  if (!active) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border border-slate-700/60 bg-slate-800/60 px-2 py-0.5 text-[10px] font-medium text-slate-400 ${className}`}>
        <WifiOff className="h-3 w-3" /> GPS off
      </span>
    );
  }
  const lost = (minutesSince ?? 0) >= 5;
  if (lost) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border border-red-400/50 bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-200 ${className}`}>
        <SignalZero className="h-3 w-3" /> GPS lost
      </span>
    );
  }
  if (stale) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-200 ${className}`}>
        <Satellite className="h-3 w-3" /> GPS stale
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      GPS live
    </span>
  );
}
