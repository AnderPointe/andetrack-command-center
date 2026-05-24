import { Phone, MessageCircle, Plus, X, MapPin, Clock, Gauge, Truck, Navigation } from "lucide-react";
import type { DispatchDriver } from "@/types/dispatch";
import { DRIVER_STATUS_COLOR, DRIVER_STATUS_LABEL } from "./dispatchTokens";

interface Props {
  driver: DispatchDriver;
  onClose: () => void;
  onCall?: () => void;
  onMessage?: () => void;
  onAssignLoad?: () => void;
  onAddTask?: () => void;
}

export function SelectedDriverMapCard({
  driver,
  onClose,
  onCall,
  onMessage,
  onAssignLoad,
  onAddTask,
}: Props) {
  const color = DRIVER_STATUS_COLOR[driver.status];
  const initials = (driver.driver_name || "??")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="absolute left-1/2 top-6 z-[500] w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      <button
        onClick={onClose}
        className="absolute right-2 top-2 z-10 grid size-7 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
      >
        <X className="size-3.5" />
      </button>

      <div className="flex flex-col items-center px-5 pt-6 pb-4">
        {driver.avatar_url ? (
          <img
            src={driver.avatar_url}
            alt={driver.driver_name ?? ""}
            className="size-16 rounded-full object-cover ring-4"
            style={{ boxShadow: `0 0 0 3px ${color}` }}
          />
        ) : (
          <div
            className="grid size-16 place-items-center rounded-full text-lg font-bold text-white"
            style={{ background: color, boxShadow: `0 0 0 3px ${color}` }}
          >
            {initials}
          </div>
        )}
        <div className="mt-3 text-sm font-semibold text-slate-900">{driver.driver_name}</div>
        <div
          className="mt-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{ background: `${color}1f`, color }}
        >
          {DRIVER_STATUS_LABEL[driver.status]}
        </div>

        <button
          onClick={onAddTask}
          className="mt-4 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-teal-300 text-sm font-medium text-teal-700 hover:bg-teal-50"
        >
          <Plus className="size-4" /> Add Task
        </button>
      </div>

      <div className="space-y-2.5 border-t border-slate-100 px-5 py-4">
        {driver.current_load_number && (
          <Row
            icon={Truck}
            label="Current Load"
            value={`#${driver.current_load_number}`}
          />
        )}
        {driver.pickup_address && (
          <Row icon={MapPin} label="Pickup" value={driver.pickup_address} accent="orange" />
        )}
        {driver.dropoff_address && (
          <Row icon={MapPin} label="Drop-off" value={driver.dropoff_address} accent="teal" />
        )}
        <Row
          icon={Clock}
          label="ETA"
          value={driver.eta_minutes != null ? `${driver.eta_minutes} min` : "—"}
        />
        <Row
          icon={Gauge}
          label="Speed"
          value={`${Math.round(driver.speed_mph ?? 0)} mph`}
        />
        <Row icon={Truck} label="Vehicle" value={driver.vehicle_type ?? "—"} />
        {driver.next_stop && (
          <Row icon={Navigation} label="Next Stop" value={driver.next_stop} />
        )}
      </div>

      <div className="flex gap-2 border-t border-slate-100 bg-slate-50 p-3">
        <button
          onClick={onMessage}
          className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-teal-400 hover:text-teal-600"
        >
          <MessageCircle className="size-4" /> Message
        </button>
        <button
          onClick={onCall}
          className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-teal-500 text-sm font-medium text-white hover:bg-teal-600"
        >
          <Phone className="size-4" /> Call
        </button>
      </div>
      <button
        onClick={onAssignLoad}
        className="block w-full border-t border-slate-100 bg-white py-2.5 text-center text-xs font-semibold text-orange-600 hover:bg-orange-50"
      >
        Assign Load →
      </button>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  accent?: "orange" | "teal";
}) {
  const accentColor =
    accent === "orange" ? "text-orange-500" : accent === "teal" ? "text-teal-500" : "text-slate-400";
  return (
    <div className="flex items-start gap-2.5 text-xs">
      <Icon className={`mt-0.5 size-3.5 shrink-0 ${accentColor}`} />
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-wider text-slate-400">{label}</div>
        <div className="truncate text-slate-800">{value}</div>
      </div>
    </div>
  );
}
