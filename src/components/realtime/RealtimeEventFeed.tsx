import { Activity, AlertTriangle, MapPin, Navigation } from "lucide-react";
import type { RealtimeEvent } from "@/types/realtime";

const ICON: Record<RealtimeEvent["kind"], any> = {
  location: MapPin,
  status: Activity,
  live_state: Navigation,
  eta: Navigation,
  route_progress: Navigation,
  alert: AlertTriangle,
};

function describe(e: RealtimeEvent): string {
  switch (e.kind) {
    case "status": return `Status → ${e.payload.new_status}`;
    case "location": return `GPS · ${e.payload.latitude.toFixed(3)}, ${e.payload.longitude.toFixed(3)}`;
    case "eta": return `ETA · ${e.payload.reason}`;
    case "route_progress": return `Route · ${Math.round(e.payload.progress_pct)}%`;
    case "alert": return `${e.payload.severity.toUpperCase()} · ${e.payload.message}`;
    case "live_state": return `Live state updated`;
  }
}

export function RealtimeEventFeed({ events, className = "" }: { events: RealtimeEvent[]; className?: string }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {events.length === 0 && (
        <div className="text-xs text-slate-500">Waiting for live events…</div>
      )}
      {events.map((e, i) => {
        const Icon = ICON[e.kind];
        return (
          <div key={i} className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-slate-200">
            <Icon className="mt-0.5 h-3.5 w-3.5 text-teal-300" />
            <span className="flex-1">{describe(e)}</span>
          </div>
        );
      })}
    </div>
  );
}
