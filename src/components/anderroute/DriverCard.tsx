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
      className="group relative w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#020617] p-5 text-left shadow-xl shadow-black/40 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.015] hover:border-[#14b8a6]/40 hover:shadow-[0_20px_40px_-12px_rgba(20,184,166,0.35)]"
    >
      {/* hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#14b8a6]/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#f97316]/15 blur-3xl" />
      </div>

      <div className="relative flex items-start gap-3">
        <div className="relative">
          <img
            src={driver.photo_url}
            alt={driver.name}
            className="h-12 w-12 rounded-xl object-cover ring-1 ring-white/15"
          />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0f172a] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-semibold text-white">{driver.name}</p>
            <StatusBadge status={driver.status} />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#2dd4bf]">
            {driver.id}
          </p>
          <p className="mt-1 truncate text-xs text-slate-400">
            <Truck className="mr-1 inline h-3 w-3" />
            {vehicle.make} {vehicle.model}
          </p>
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-between text-[11px] text-slate-400">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3 text-[#fb923c]" />
          {shipment.dropoff_address}
        </span>
        <span className="inline-flex items-center gap-1 font-bold text-white">
          <Clock className="h-3 w-3 text-[#2dd4bf]" />
          {shipment.eta_minutes}m
        </span>
      </div>

      <div className="relative mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#14b8a6] to-[#f97316] shadow-[0_0_8px_rgba(20,184,166,0.5)] transition-all duration-500"
          style={{ width: `${shipment.route_progress_percent}%` }}
        />
      </div>
    </button>
  );
}
