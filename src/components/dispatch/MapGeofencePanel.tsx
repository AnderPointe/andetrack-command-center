import { Plus, Shield } from "lucide-react";
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
  onEdit?: (g: MapGeofence) => void;
  onCreate?: () => void;
  canEdit?: boolean;
}

export function MapGeofencePanel({ geofences, onFocus, onEdit, onCreate, canEdit }: Props) {
  return (
    <div className="pointer-events-auto w-64 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/95 text-slate-100 shadow-2xl backdrop-blur">
      <div className="flex items-center gap-2 border-b border-slate-700/60 px-3 py-2.5">
        <Shield className="size-4 text-teal-300" />
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">Geofences</span>
        <span className="ml-auto text-[10px] text-slate-500">{geofences.length}</span>
        {canEdit && onCreate && (
          <button
            onClick={onCreate}
            className="grid size-6 place-items-center rounded-md border border-slate-700 bg-slate-800 text-slate-200 hover:border-teal-500 hover:text-teal-300"
            title="New geofence"
          >
            <Plus className="size-3.5" />
          </button>
        )}
      </div>
      <div className="max-h-72 overflow-y-auto p-2">
        {geofences.length === 0 && (
          <div className="px-2 py-4 text-center text-[11px] text-slate-500">
            No geofences yet.
          </div>
        )}
        {geofences.map((g) => (
          <div
            key={g.id}
            className="mb-1 flex items-start gap-1 rounded-lg border border-transparent px-2 py-1.5 hover:border-slate-700 hover:bg-slate-800"
          >
            <button
              onClick={() => onFocus(g)}
              className="flex flex-1 flex-col items-start gap-1 text-left text-xs"
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className="truncate font-medium text-slate-100">{g.name}</span>
                <span
                  className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] uppercase tracking-wider ${TYPE_COLOR[g.type]}`}
                >
                  {g.type}
                </span>
              </div>
              <span className="text-[10px] text-slate-500">
                {Math.round(g.radius_m).toLocaleString()} m · {g.status}
              </span>
            </button>
            {canEdit && onEdit && (
              <button
                onClick={() => onEdit(g)}
                className="text-[10px] font-semibold uppercase tracking-wider text-teal-300 hover:text-teal-200"
                title="Edit"
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
