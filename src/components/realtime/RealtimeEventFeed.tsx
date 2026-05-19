import { Activity, AlertTriangle, MapPin, Navigation, Route, Wifi } from "lucide-react";
import type { RealtimeEvent } from "@/types/realtime";

const KIND_META: Record<
  RealtimeEvent["kind"],
  { icon: typeof MapPin; tone: string; label: string }
> = {
  location: { icon: MapPin, tone: "text-sky-300", label: "GPS" },
  status: { icon: Activity, tone: "text-teal-300", label: "Status" },
  live_state: { icon: Wifi, tone: "text-slate-300", label: "State" },
  eta: { icon: Navigation, tone: "text-violet-300", label: "ETA" },
  route_progress: { icon: Route, tone: "text-emerald-300", label: "Route" },
  alert: { icon: AlertTriangle, tone: "text-amber-300", label: "Alert" },
};

const SEVERITY_TONE: Record<string, string> = {
  info: "border-sky-400/30 bg-sky-500/[0.06] text-sky-100",
  warning: "border-amber-400/30 bg-amber-500/[0.06] text-amber-100",
  critical: "border-red-400/40 bg-red-500/[0.08] text-red-100",
};

function ts(iso: string | null | undefined): string {
  if (!iso) return "now";
  const s = Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 1000));
  if (s < 5) return "just now";
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.round(s / 60)}m ago`;
  return `${Math.round(s / 3600)}h ago`;
}

function eventTime(e: RealtimeEvent): string | null | undefined {
  switch (e.kind) {
    case "alert": return e.payload.created_at;
    case "status": return (e.payload as any).created_at ?? (e.payload as any).recorded_at;
    case "location": return e.payload.created_at;
    case "live_state": return e.payload.updated_at;
    case "eta": return e.payload.recorded_at;
    case "route_progress": return e.payload.recorded_at;
  }
}

function summary(e: RealtimeEvent): string {
  switch (e.kind) {
    case "status": return `Status → ${e.payload.new_status.replace(/_/g, " ")}`;
    case "location":
      return `Ping ${e.payload.latitude.toFixed(3)}, ${e.payload.longitude.toFixed(3)} · ${
        e.payload.speed_mph ? `${Math.round(e.payload.speed_mph)} mph` : "stopped"
      }`;
    case "eta":
      return `ETA recalculated · ${e.payload.reason}${
        e.payload.eta_seconds_remaining
          ? ` · ${Math.round(e.payload.eta_seconds_remaining / 60)} min out`
          : ""
      }`;
    case "route_progress":
      return `Progress ${Math.round(e.payload.progress_pct)}% · ${e.payload.remaining_miles.toFixed(
        0,
      )} mi to go`;
    case "alert": return e.payload.message;
    case "live_state": return `Live state synced`;
  }
}

export function RealtimeEventFeed({
  events,
  className = "",
  max = 12,
}: {
  events: RealtimeEvent[];
  className?: string;
  max?: number;
}) {
  if (events.length === 0) {
    return (
      <div className={`flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-[11px] text-slate-500 ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-500 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-500" />
        </span>
        Listening for live dispatch events…
      </div>
    );
  }
  return (
    <ul className={`space-y-1 ${className}`}>
      {events.slice(0, max).map((e, i) => {
        const meta = KIND_META[e.kind];
        const Icon = meta.icon;
        const isAlert = e.kind === "alert";
        const sev = isAlert ? (e.payload as any).severity ?? "info" : null;
        const wrap = isAlert
          ? `border ${SEVERITY_TONE[sev as string] ?? SEVERITY_TONE.info}`
          : "border border-white/5 bg-white/[0.02] text-slate-200";
        return (
          <li
            key={(e as any).payload?.id ?? i}
            className={`flex items-start gap-2.5 rounded-lg px-2.5 py-1.5 text-[11px] ${wrap}`}
          >
            <Icon className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${meta.tone}`} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                  {meta.label}
                  {isAlert && sev ? ` · ${String(sev).toUpperCase()}` : ""}
                </span>
                <span className="text-[10px] opacity-60">{ts(eventTime(e))}</span>
              </div>
              <div className="truncate leading-snug">{summary(e)}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
