import { Phone, Truck, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import type { Driver, Vehicle } from "@/types/anderroute";
import { StatusBadge } from "./StatusBadge";

interface Props {
  driver: Driver;
  vehicle: Vehicle;
}

export function DriverProfileHero({ driver, vehicle }: Props) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#0b1326] to-black p-6 shadow-2xl shadow-black/60">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#14b8a6]/15 blur-3xl" />

      <div className="relative flex items-start gap-4">
        <div className="relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#14b8a6] to-[#f97316] opacity-60 blur-md" />
          <img
            src={driver.photo_url}
            alt={driver.name}
            className="relative h-20 w-20 rounded-2xl object-cover ring-2 ring-white/20"
          />
          <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#0f172a] bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-white">{driver.name}</h2>
            <StatusBadge status={driver.status} />
          </div>
          <p className="mt-0.5 text-xs text-slate-400">{driver.role}</p>
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#2dd4bf]">
            {driver.id}
          </p>
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-2 gap-2">
        <InfoRow icon={Phone} label="Phone" value={driver.phone} />
        <InfoRow icon={Truck} label="Vehicle" value={`${vehicle.make} ${vehicle.model}`} />
        <InfoRow icon={ShieldCheck} label="License" value="Class A · Valid" />
        <InfoRow icon={Clock} label="Last seen" value="Just now" />
      </div>

      <button className="relative mt-4 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-[#14b8a6]/30 hover:bg-white/[0.06] hover:text-white">
        View full driver profile
        <ChevronRight className="h-4 w-4 text-slate-500 transition group-hover:text-[#2dd4bf]" />
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
    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <p className="mt-1 truncate text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
