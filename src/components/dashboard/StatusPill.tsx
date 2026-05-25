import type { DriverStatus, TripStatus } from "@/types/dashboard";

const DRIVER_STYLES: Record<DriverStatus, string> = {
  available: "bg-emerald-500/15 text-emerald-600",
  en_route: "bg-sky-500/15 text-sky-600",
  delivering: "bg-orange-500/15 text-orange-600",
  delayed: "bg-amber-500/15 text-amber-600",
  offline: "bg-slate-500/15 text-slate-600",
};

const TRIP_STYLES: Record<TripStatus, string> = {
  on_time: "bg-emerald-500/15 text-emerald-600",
  delayed: "bg-amber-500/15 text-amber-600",
  early: "bg-teal-500/15 text-teal-600",
  stopped: "bg-slate-500/15 text-slate-600",
};

export function DriverStatusPill({ status }: { status: DriverStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${DRIVER_STYLES[status]}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

export function TripStatusPill({ status }: { status: TripStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${TRIP_STYLES[status]}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
