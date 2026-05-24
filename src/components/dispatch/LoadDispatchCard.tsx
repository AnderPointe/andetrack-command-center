import { Package, MapPin, Truck, DollarSign, Clock } from "lucide-react";
import type { DispatchLoad } from "@/types/loads";

interface Props {
  load: DispatchLoad;
  selected?: boolean;
  onSelect?: (load: DispatchLoad) => void;
  onFocus?: (load: DispatchLoad) => void;
}

const STATUS_COLOR: Record<string, string> = {
  draft: "bg-slate-100 text-slate-600",
  pending: "bg-amber-100 text-amber-700",
  offered: "bg-blue-100 text-blue-700",
  accepted: "bg-indigo-100 text-indigo-700",
  in_progress: "bg-emerald-100 text-emerald-700",
  delivered: "bg-teal-100 text-teal-700",
  cancelled: "bg-rose-100 text-rose-700",
};

export function LoadDispatchCard({ load, selected, onSelect, onFocus }: Props) {
  const pickup = load.stops.find((s) => s.kind === "pickup");
  const dropoff = load.stops.find((s) => s.kind === "dropoff");
  const statusClass = STATUS_COLOR[load.status] ?? "bg-slate-100 text-slate-600";

  return (
    <button
      type="button"
      onClick={() => onSelect?.(load)}
      className={`w-full rounded-xl border bg-white p-3 text-left transition hover:border-slate-300 hover:shadow-sm ${
        selected ? "border-slate-900 ring-1 ring-slate-900" : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="grid size-8 place-items-center rounded-lg bg-slate-900 text-white">
            <Package className="size-4" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-slate-900">
              {load.customer ?? "Unassigned customer"}
            </div>
            <div className="truncate text-[11px] text-slate-500">
              #{load.id.slice(0, 8)} · {load.commodity ?? "—"}
            </div>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${statusClass}`}>
          {load.status.replace(/_/g, " ")}
        </span>
      </div>

      <div className="mt-3 space-y-1.5 text-xs text-slate-700">
        <div className="flex items-start gap-1.5">
          <MapPin className="mt-0.5 size-3.5 text-orange-500" />
          <span className="truncate">
            <span className="font-medium text-slate-900">Pickup:</span>{" "}
            {pickup?.city ? `${pickup.city}${pickup.region ? ", " + pickup.region : ""}` : load.pickup_location}
          </span>
        </div>
        <div className="flex items-start gap-1.5">
          <MapPin className="mt-0.5 size-3.5 text-teal-500" />
          <span className="truncate">
            <span className="font-medium text-slate-900">Drop:</span>{" "}
            {dropoff?.city ? `${dropoff.city}${dropoff.region ? ", " + dropoff.region : ""}` : load.dropoff_location}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1">
          <Truck className="size-3" />
          {load.assigned_driver_id ? "Assigned" : "Unassigned"}
        </span>
        {load.rate != null && (
          <span className="inline-flex items-center gap-1 font-medium text-slate-700">
            <DollarSign className="size-3" />
            {Math.round(Number(load.rate)).toLocaleString()}
          </span>
        )}
        {load.pickup_window && (
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" />
            {load.pickup_window}
          </span>
        )}
      </div>

      {(pickup?.latitude || dropoff?.latitude) && onFocus && (
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onFocus(load);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
              onFocus(load);
            }
          }}
          className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-slate-200 px-2 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
        >
          Show route on map
        </div>
      )}
    </button>
  );
}
