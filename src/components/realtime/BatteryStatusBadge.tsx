import { Battery, BatteryLow, BatteryWarning, Plug } from "lucide-react";

interface Props {
  level: number | null | undefined; // 0..1
  charging?: boolean;
  className?: string;
}

export function BatteryStatusBadge({ level, charging, className = "" }: Props) {
  if (level == null) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-2 py-0.5 text-[10px] text-slate-400 ${className}`}>
        <Battery className="h-3 w-3" /> --%
      </span>
    );
  }
  const pct = Math.round(level * 100);
  let tone = "border-emerald-400/40 bg-emerald-500/10 text-emerald-200";
  let Icon = Battery;
  if (pct < 15) {
    tone = "border-red-400/40 bg-red-500/10 text-red-200";
    Icon = BatteryWarning;
  } else if (pct < 30) {
    tone = "border-amber-400/40 bg-amber-500/10 text-amber-200";
    Icon = BatteryLow;
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${tone} ${className}`}>
      {charging ? <Plug className="h-3 w-3" /> : <Icon className="h-3 w-3" />} {pct}%
    </span>
  );
}
