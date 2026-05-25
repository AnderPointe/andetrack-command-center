import type { DriverStatus, ArrivalStatus } from "@/types/anderroute";

const DRIVER_STYLES: Record<DriverStatus, string> = {
  available: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
  en_route: "bg-teal-500/15 text-teal-300 ring-teal-400/30",
  delivering: "bg-orange-500/15 text-orange-300 ring-orange-400/30",
  delayed: "bg-rose-500/15 text-rose-300 ring-rose-400/30",
  offline: "bg-slate-500/15 text-slate-300 ring-slate-400/30",
  break: "bg-amber-500/15 text-amber-300 ring-amber-400/30",
};

const DRIVER_LABEL: Record<DriverStatus, string> = {
  available: "Available",
  en_route: "En Route",
  delivering: "Delivering",
  delayed: "Delayed",
  offline: "Offline",
  break: "On Break",
};

const ARRIVAL_STYLES: Record<ArrivalStatus, string> = {
  on_time: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
  delayed: "bg-rose-500/15 text-rose-300 ring-rose-400/30",
  early: "bg-teal-500/15 text-teal-300 ring-teal-400/30",
};

const ARRIVAL_LABEL: Record<ArrivalStatus, string> = {
  on_time: "On Time",
  delayed: "Delayed",
  early: "Early",
};

export function StatusBadge({ status }: { status: DriverStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${DRIVER_STYLES[status]}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {DRIVER_LABEL[status]}
    </span>
  );
}

export function ArrivalBadge({ status }: { status: ArrivalStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${ARRIVAL_STYLES[status]}`}
    >
      {ARRIVAL_LABEL[status]}
    </span>
  );
}
