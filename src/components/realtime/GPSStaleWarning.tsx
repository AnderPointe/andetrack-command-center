import { AlertTriangle, SignalZero } from "lucide-react";

interface Props {
  lastSeenAt: string | null | undefined;
  className?: string;
}

function minutesAgo(iso: string) {
  return Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 60000));
}

/**
 * Severity-aware GPS warning banner.
 * < 5 min → amber "stale". ≥ 5 min → red "lost". No signal → red.
 */
export function GPSStaleWarning({ lastSeenAt, className = "" }: Props) {
  const mins = lastSeenAt ? minutesAgo(lastSeenAt) : Infinity;
  const critical = !lastSeenAt || mins >= 5;
  const tone = critical
    ? "border-red-400/50 bg-red-500/10 text-red-100"
    : "border-amber-400/40 bg-amber-500/10 text-amber-100";
  const Icon = critical ? SignalZero : AlertTriangle;
  const title = critical ? "GPS signal lost" : "GPS signal stale";
  const sub = lastSeenAt
    ? `Last ping ${mins} min ago`
    : "Driver has not reported any location yet";
  return (
    <div className={`flex items-start gap-2.5 rounded-xl border px-3 py-2 text-xs ${tone} ${className}`}>
      <Icon className={`mt-0.5 h-4 w-4 ${critical ? "animate-pulse" : ""}`} />
      <div className="leading-tight">
        <div className="text-[12px] font-semibold">{title}</div>
        <div className="text-[11px] opacity-80">{sub}</div>
      </div>
    </div>
  );
}
