import { Phone } from "lucide-react";
import type { Driver, Shipment } from "@/types/dashboard";
import { DriverStatusPill } from "./StatusPill";

interface DriverProfileCardProps {
  driver: Driver;
  shipment: Pick<Shipment, "id" | "pickup_address" | "dropoff_address" | "cargo_type">;
}

function RouteStop({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`h-3 w-3 rounded-full ${color}`} />
        <div className="mt-1 h-10 w-px bg-white/20" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

export function DriverProfileCard({ driver, shipment }: DriverProfileCardProps) {
  return (
    <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Driver Profile
          </p>
          <p className="mt-2 text-sm tracking-wide text-slate-400">{driver.id}</p>
          <h2 className="mt-2 text-3xl font-semibold">{driver.name}</h2>
          <p className="text-sm text-slate-400">{driver.role}</p>
        </div>
        <DriverStatusPill status={driver.status} />
      </div>

      <div className="mt-6 flex items-center gap-5">
        <img
          src={driver.photo_url}
          alt={driver.name}
          className="h-20 w-20 rounded-3xl object-cover ring-2 ring-white/10"
        />
        <div className="space-y-1.5 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {driver.phone}
          </div>
          <p className="text-xs text-slate-400">
            Assignment ·{" "}
            <span className="text-white">{shipment.id}</span>
          </p>
          <p className="text-xs text-slate-400">{shipment.cargo_type}</p>
        </div>
      </div>

      <p className="mt-7 text-xs font-semibold uppercase tracking-wide text-slate-400">
        Route
      </p>
      <div className="mt-3 space-y-3">
        <RouteStop
          label="Pickup"
          value={shipment.pickup_address}
          color="bg-teal-400"
        />
        <RouteStop
          label="Dropoff"
          value={shipment.dropoff_address}
          color="bg-orange-400"
        />
      </div>
    </div>
  );
}
