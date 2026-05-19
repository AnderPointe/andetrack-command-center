import { AlertTriangle } from "lucide-react";

interface Props {
  lastSeenAt: string | null | undefined;
  className?: string;
}

function minutesAgo(iso: string) {
  return Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 60000));
}

export function GPSStaleWarning({ lastSeenAt, className = "" }: Props) {
  const label = lastSeenAt
    ? `Last seen ${minutesAgo(lastSeenAt)} min ago`
    : "No GPS signal yet";
  return (
    <div className={`flex items-center gap-2 rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-200 ${className}`}>
      <AlertTriangle className="h-4 w-4" />
      <div>
        <div className="font-semibold">GPS stale</div>
        <div className="text-amber-300/80">{label}</div>
      </div>
    </div>
  );
}
