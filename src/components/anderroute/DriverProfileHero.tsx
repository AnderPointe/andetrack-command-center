import { Phone, Truck, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import type { Driver, Vehicle } from "@/types/anderroute";
import { StatusBadge } from "./StatusBadge";

interface Props {
  driver: Driver;
  vehicle: Vehicle;
}

export function DriverProfileHero({ driver, vehicle }: Props) {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-5 shadow-2xl shadow-black/40">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={driver.photo_url}
            alt={driver.name}
            className="h-20 w-20 rounded-2xl object-cover ring-2 ring-teal-400/40"
          />
          <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-slate-950 bg-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-white">{driver.name}</h2>
            <StatusBadge status={driver.status} />
          </div>
          <p className="mt-0.5 text-xs text-slate-400">{driver.role}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-teal-300">
            {driver.id}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <InfoRow icon={Phone} label="Phone" value={driver.phone} />
        <InfoRow
          icon={Truck}
          label="Vehicle"
          value={`${vehicle.make} ${vehicle.model}`}
        />
        <InfoRow icon={ShieldCheck} label="License" value="Class A — Valid" />
        <InfoRow icon={Clock} label="Last seen" value="Just now" />
      </div>

      <button className="mt-4 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5">
        View full driver profile
        <ChevronRight className="h-4 w-4 text-slate-500" />
      </button>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <p className="mt-1 truncate text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
