import { Package, Weight, Box, Gauge, Flame } from "lucide-react";
import type { Shipment, Vehicle } from "@/types/anderroute";

interface Props {
  shipment: Shipment;
  vehicle: Vehicle;
}

export function ShipmentLoadOverview({ shipment, vehicle }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-black/40">
      <div className="absolute right-0 top-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-40 w-40 translate-y-1/2 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-teal-300">
            Active Shipment
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white">{shipment.id}</h2>
          <p className="mt-1 text-sm text-slate-400">
            {vehicle.make} {vehicle.model} · {vehicle.type} · Unit {vehicle.unit_number}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-300 ring-1 ring-orange-400/30">
            <Flame className="h-3 w-3" /> High Priority
          </span>
        </div>
      </div>

      <p className="relative mt-3 max-w-2xl text-sm text-slate-300">
        Hauling{" "}
        <span className="font-semibold text-white">{shipment.cargo_type}</span> —{" "}
        priority medical supplies, boxed freight, and same-day delivery cargo.
      </p>

      {/* Stats */}
      <div className="relative mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat icon={Gauge} label="Space Used" value={`${shipment.space_used_percent}%`} />
        <Stat icon={Weight} label="Weight" value={`${shipment.weight.toLocaleString()} kg`} />
        <Stat icon={Box} label="Volume" value={`${shipment.volume} cu ft`} />
        <Stat icon={Package} label="Capacity" value={`${shipment.capacity_used_percent}%`} />
      </div>

      {/* Cargo distribution visualization */}
      <div className="relative mt-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-widest text-slate-500">
            Cargo Distribution
          </p>
          <p className="text-xs font-semibold text-teal-300">
            {shipment.route_progress_percent}% Route Complete
          </p>
        </div>

        <TruckCargoViz fillPercent={shipment.space_used_percent} />

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-400 via-teal-300 to-orange-400 transition-all"
            style={{ width: `${shipment.route_progress_percent}%` }}
          />
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <p className="mt-2 text-xl font-bold text-white">{value}</p>
    </div>
  );
}

function TruckCargoViz({ fillPercent }: { fillPercent: number }) {
  // 12 pallet zones
  const zones = 12;
  const filled = Math.round((fillPercent / 100) * zones);
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <div className="flex items-stretch gap-2">
        {/* Cab */}
        <div className="grid w-14 shrink-0 place-items-center rounded-l-xl rounded-r-md bg-gradient-to-br from-slate-700 to-slate-800 text-[10px] font-bold uppercase text-slate-400">
          Cab
        </div>
        {/* Trailer */}
        <div className="flex flex-1 items-center gap-1 rounded-xl border border-white/10 bg-slate-900/70 p-2">
          {Array.from({ length: zones }).map((_, i) => {
            const active = i < filled;
            return (
              <div
                key={i}
                className={`flex-1 rounded-md transition-all ${
                  active
                    ? i < filled - 2
                      ? "h-12 bg-gradient-to-b from-teal-400 to-teal-600 shadow-lg shadow-teal-500/20"
                      : "h-12 bg-gradient-to-b from-orange-400 to-orange-600 shadow-lg shadow-orange-500/20"
                    : "h-12 bg-white/[0.03] ring-1 ring-inset ring-white/5"
                }`}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
        <LegendDot color="bg-teal-400" label="Standard freight" />
        <LegendDot color="bg-orange-400" label="Priority cargo" />
        <LegendDot color="bg-white/10" label="Empty space" />
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-sm ${color}`} />
      <span>{label}</span>
    </div>
  );
}
