import { Phone, Crosshair, MapPin, Package } from "lucide-react";
import type { DispatchDriver } from "@/types/dispatch";
import { DRIVER_STATUS_COLOR, DRIVER_STATUS_LABEL } from "./dispatchTokens";

interface Props {
  driver: DispatchDriver;
  selected: boolean;
  onSelect: () => void;
  onCenter: () => void;
  onCall: () => void;
}

export function DriverDispatchCard({ driver, selected, onSelect, onCenter, onCall }: Props) {
  const color = DRIVER_STATUS_COLOR[driver.status];
  const initials = (driver.driver_name || "??")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <button
      onClick={onSelect}
      className={`block w-full border-l-2 px-3 py-3 text-left transition hover:bg-slate-50 ${
        selected
          ? "border-l-teal-500 bg-teal-50/60"
          : "border-l-transparent"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          {driver.avatar_url ? (
            <img
              src={driver.avatar_url}
              alt={driver.driver_name ?? ""}
              className="size-10 rounded-full object-cover ring-2"
              style={{ boxShadow: `0 0 0 2px ${color}` }}
            />
          ) : (
            <div
              className="grid size-10 place-items-center rounded-full text-[11px] font-bold text-white ring-2 ring-white"
              style={{ background: color, boxShadow: `0 0 0 2px ${color}` }}
            >
              {initials}
            </div>
          )}
          <span
            className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full ring-2 ring-white"
            style={{ background: color }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold text-slate-900">
              {driver.driver_name}
            </span>
            <span
              className="ml-auto rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
              style={{ background: `${color}1f`, color }}
            >
              {DRIVER_STATUS_LABEL[driver.status]}
            </span>
          </div>
          <div className="mt-0.5 text-[11px] text-slate-500">
            Unit {driver.unit_number} · {driver.vehicle_type}
          </div>
          {(driver.shift_start || driver.shift_end) && (
            <div className="mt-0.5 text-[11px] text-slate-500">
              {driver.shift_start} – {driver.shift_end}
            </div>
          )}
          {driver.city && (
            <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-600">
              <MapPin className="size-3 text-slate-400" />
              {driver.city}
            </div>
          )}
          {driver.current_load_number && (
            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-teal-700">
              <Package className="size-3" />
              Load #{driver.current_load_number}
            </div>
          )}

          <div className="mt-2 flex gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCall();
              }}
              className="flex h-7 flex-1 items-center justify-center gap-1 rounded-md border border-slate-200 text-[11px] text-slate-600 hover:border-teal-400 hover:text-teal-600"
            >
              <Phone className="size-3" /> Call
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCenter();
              }}
              className="flex h-7 flex-1 items-center justify-center gap-1 rounded-md border border-slate-200 text-[11px] text-slate-600 hover:border-orange-400 hover:text-orange-600"
            >
              <Crosshair className="size-3" /> Center
            </button>
          </div>
        </div>
      </div>
    </button>
  );
}
