import { Shield } from "lucide-react";
import type { MapGeofence, GeofenceType } from "@/hooks/useMapGeofences";

const TYPE_COLOR: Record<GeofenceType, string> = {
  delivery: "bg-teal-500/20 text-teal-200 border-teal-500/40",
  customer: "bg-sky-500/20 text-sky-200 border-sky-500/40",
  yard: "bg-emerald-500/20 text-emerald-200 border-emerald-500/40",
  restricted: "bg-rose-500/20 text-rose-200 border-rose-500/40",
  airport: "bg-blue-500/20 text-blue-200 border-blue-500/40",
  port: "bg-cyan-500/20 text-cyan-200 border-cyan-500/40",
  warehouse: "bg-slate-500/20 text-slate-200 border-slate-500/40",
};

interface Props {
  geofences: MapGeofence[];
  onFocus: (g: MapGeofence) => void;
}

export function MapGeofencePanel({ geofences, onFocus }: Props) {
  return (
    <div className="pointer-events-auto w-64 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/95 text-slate-100 shadow-2xl backdrop-blur">
      <div className="flex items-center gap-2 border-b border-slate-700/60 px-3 py-2.5">
        <Shield className="size-4 text-teal-300" />
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">Geofences</span>
        <span className="ml-auto text-[10px] text-slate-500">{geofences.length}</span>
      </div>
      <div className="max-h-72 overflow-y-auto p-2">
        {geofences.map((g) => (
          <button
            key={g.id}
            onClick={() => onFocus(g)}
            className="mb-1 flex w-full flex-col items-start gap-1 rounded-lg border border-transparent px-2 py-1.5 text-left text-xs hover:border-slate-700 hover:bg-slate-800"
          >
            <div className="flex w-full items-center justify-between">
              <span className="truncate font-medium text-slate-100">{g.name}</span>
              <span
                className={`rounded-full border px-1.5 py-0.5 text-[9px] uppercase tracking-wider ${TYPE_COLOR[g.type]}`}
              >
                {g.type}
              </span>
            </div>
            <span className="text-[10px] text-slate-500">
              {Math.round(g.radius_m).toLocaleString()} m · {g.status}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
