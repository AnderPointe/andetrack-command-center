import { CheckCircle2, RadioTower, WifiOff } from "lucide-react";

interface Props {
  connected: boolean;
  lastSyncedAt?: string | null;
  className?: string;
}

function fmt(iso: string | null | undefined) {
  if (!iso) return "—";
  const s = Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 1000));
  if (s < 60) return `${s}s ago`;
  return `${Math.round(s / 60)}m ago`;
}

export function DriverSyncIndicator({ connected, lastSyncedAt, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium ${
      connected
        ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
        : "border-amber-400/40 bg-amber-500/10 text-amber-100"
    } ${className}`}>
      {connected ? <RadioTower className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
      <span>{connected ? "Dispatch synced" : "Dispatch offline"}</span>
      {lastSyncedAt && (
        <span className="opacity-70">· {fmt(lastSyncedAt)}</span>
      )}
      {connected && <CheckCircle2 className="h-3.5 w-3.5 opacity-70" />}
    </div>
  );
}
