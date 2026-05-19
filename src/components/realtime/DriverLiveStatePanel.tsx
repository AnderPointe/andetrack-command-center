import { Clock, Gauge, MapPin, Navigation2 } from "lucide-react";
import type { DriverLiveState } from "@/types/location";
import { DRIVER_STATUS_LABELS, type DriverStatusKey } from "@/types/status";
import { GPSStatusBadge } from "./GPSStatusBadge";
import { TrackingModeBadge } from "./TrackingModeBadge";
import { BatteryStatusBadge } from "./BatteryStatusBadge";

interface Props {
  state: DriverLiveState;
  driverName?: string;
  onClose?: () => void;
}

function fmtAgo(iso: string | null | undefined) {
  if (!iso) return "—";
  const sec = Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 1000));
  if (sec < 60) return `${sec}s ago`;
  return `${Math.round(sec / 60)}m ago`;
}

export function DriverLiveStatePanel({ state, driverName, onClose }: Props) {
  const statusKey = (state.driver_status ?? "available") as DriverStatusKey;
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a1218]/95 p-4 text-sm text-slate-100 backdrop-blur-xl">
      <div className="mb-2 flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-400">Driver</div>
          <div className="text-lg font-semibold">{driverName ?? state.driver_id.slice(0, 8)}</div>
          <div className="text-xs text-slate-400">
            {DRIVER_STATUS_LABELS[statusKey] ?? statusKey}
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-white">
            Close
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        <GPSStatusBadge active={!!state.last_location_at} stale={state.is_gps_stale} />
        <TrackingModeBadge mode={state.tracking_mode} />
        <BatteryStatusBadge level={state.battery_level ?? null} charging={!!state.is_charging} />
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <div>
          <dt className="flex items-center gap-1 text-slate-400"><Gauge className="h-3 w-3" /> Speed</dt>
          <dd className="font-semibold">{state.speed_mph?.toFixed(0) ?? "—"} mph</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1 text-slate-400"><Navigation2 className="h-3 w-3" /> Heading</dt>
          <dd className="font-semibold">{state.heading != null ? `${Math.round(state.heading)}°` : "—"}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1 text-slate-400"><Clock className="h-3 w-3" /> ETA</dt>
          <dd className="font-semibold">{state.eta_minutes != null ? `${state.eta_minutes} min` : "—"}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1 text-slate-400"><MapPin className="h-3 w-3" /> Remaining</dt>
          <dd className="font-semibold">{state.remaining_miles != null ? `${state.remaining_miles.toFixed(1)} mi` : "—"}</dd>
        </div>
      </dl>

      {state.route_progress_pct != null && (
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-[10px] text-slate-400">
            <span>Route progress</span>
            <span>{Math.round(state.route_progress_pct)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400" style={{ width: `${state.route_progress_pct}%` }} />
          </div>
        </div>
      )}

      <div className="mt-3 flex justify-between text-[10px] text-slate-500">
        <span>GPS · {fmtAgo(state.last_location_at)}</span>
        <span>Status · {fmtAgo(state.last_status_at)}</span>
      </div>
    </div>
  );
}
