import { useNavigate } from "@tanstack/react-router";
import { Truck, MapPin, Clock } from "lucide-react";
import type { DriverDossier } from "@/types/anderroute";
import { StatusBadge } from "./StatusBadge";

interface Props {
  dossier: DriverDossier;
}

export function DriverCard({ dossier }: Props) {
  const navigate = useNavigate();
  const { driver, vehicle, shipment } = dossier;

  return (
    <button
      onClick={() =>
        navigate({ to: "/drivers/$driverId", params: { driverId: driver.id } })
      }
      className="group w-full overflow-hidden rounded-2xl border border-white/5 bg-slate-900 p-4 text-left shadow-lg shadow-black/30 transition hover:border-teal-400/40 hover:bg-slate-900/80"
    >
      <div className="flex items-start gap-3">
        <img
          src={driver.photo_url}
          alt={driver.name}
          className="h-12 w-12 rounded-xl object-cover ring-1 ring-white/10"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-semibold text-white">{driver.name}</p>
            <StatusBadge status={driver.status} />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-teal-300">
            {driver.id}
          </p>
          <p className="mt-1 truncate text-xs text-slate-400">
            <Truck className="mr-1 inline h-3 w-3" />
            {vehicle.make} {vehicle.model}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3 text-orange-300" />
          {shipment.dropoff_address}
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-white">
          <Clock className="h-3 w-3 text-teal-300" />
          {shipment.eta_minutes}m
        </span>
      </div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-400 to-orange-400 transition-all group-hover:from-teal-300 group-hover:to-orange-300"
          style={{ width: `${shipment.route_progress_percent}%` }}
        />
      </div>
    </button>
  );
}
