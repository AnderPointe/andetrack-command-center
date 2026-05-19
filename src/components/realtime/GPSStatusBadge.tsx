import { Satellite, WifiOff } from "lucide-react";

interface Props {
  active: boolean;
  stale?: boolean;
  className?: string;
}

export function GPSStatusBadge({ active, stale, className = "" }: Props) {
  if (!active) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border border-slate-700/60 bg-slate-800/60 px-2 py-0.5 text-[10px] font-medium text-slate-400 ${className}`}>
        <WifiOff className="h-3 w-3" /> GPS off
      </span>
    );
  }
  const color = stale
    ? "border-amber-400/40 bg-amber-500/10 text-amber-200"
    : "border-emerald-400/40 bg-emerald-500/10 text-emerald-200";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${color} ${className}`}>
      <Satellite className="h-3 w-3" /> {stale ? "GPS stale" : "GPS live"}
    </span>
  );
}
