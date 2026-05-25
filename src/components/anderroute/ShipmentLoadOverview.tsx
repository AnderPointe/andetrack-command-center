import { Package, Weight, Box, Gauge, Flame } from "lucide-react";
import type { Shipment, Vehicle } from "@/types/anderroute";

interface Props {
  shipment: Shipment;
  vehicle: Vehicle;
}

export function ShipmentLoadOverview({ shipment, vehicle }: Props) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#0b1326] to-black p-6 shadow-2xl shadow-black/60 md:p-8">
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/3 translate-x-1/3 rounded-full bg-[#14b8a6]/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 translate-y-1/3 -translate-x-1/3 rounded-full bg-[#f97316]/12 blur-3xl" />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2dd4bf]">
            Active Shipment
          </p>
          <h2 className="mt-1.5 text-3xl font-black tracking-tight text-white">
            {shipment.id}
          </h2>
          <p className="mt-1.5 text-sm text-slate-300">
            {vehicle.make} {vehicle.model}{" "}
            <span className="text-slate-500">·</span> {vehicle.type}{" "}
            <span className="text-slate-500">·</span>{" "}
            <span className="font-mono text-slate-400">{vehicle.unit_number}</span>
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f97316]/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#fb923c] ring-1 ring-[#f97316]/40 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
          <Flame className="h-3 w-3" /> High Priority
        </span>
      </div>

      <p className="relative mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
        Hauling{" "}
        <span className="font-semibold text-white">{shipment.cargo_type}</span> —
        priority medical supplies, boxed freight, and same-day delivery cargo.
      </p>

      <div className="relative mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat icon={Gauge} label="Space Used" value={`${shipment.space_used_percent}%`} accent="#2dd4bf" />
        <Stat icon={Weight} label="Weight" value={`${shipment.weight.toLocaleString()} kg`} accent="#fb923c" />
        <Stat icon={Box} label="Volume" value={`${shipment.volume}`} sub="cu ft" accent="#2dd4bf" />
        <Stat icon={Package} label="Capacity" value={`${shipment.capacity_used_percent}%`} accent="#fb923c" />
      </div>

      <div className="relative mt-6">
        <div className="mb-2.5 flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Cargo Distribution
          </p>
          <p className="text-xs font-bold text-[#2dd4bf]">
            {shipment.route_progress_percent}% Route Complete
          </p>
        </div>

        <TruckCargoViz fillPercent={shipment.space_used_percent} />

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#14b8a6] via-[#2dd4bf] to-[#f97316] shadow-[0_0_12px_rgba(20,184,166,0.6)] transition-all"
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
  sub,
  accent,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  sub?: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        <Icon className="h-3 w-3" style={{ color: accent }} /> {label}
      </div>
      <p className="mt-2 text-2xl font-black text-white">
        {value}
        {sub && (
          <span className="ml-1 text-xs font-medium text-slate-400">{sub}</span>
        )}
      </p>
    </div>
  );
}

function TruckCargoViz({ fillPercent }: { fillPercent: number }) {
  const zones = 12;
  const filled = Math.round((fillPercent / 100) * zones);
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
      <div className="flex items-stretch gap-2">
        <div className="grid w-14 shrink-0 place-items-center rounded-l-xl rounded-r-md bg-gradient-to-br from-slate-700 to-slate-900 text-[10px] font-bold uppercase tracking-wider text-slate-400 ring-1 ring-white/5">
          Cab
        </div>
        <div className="flex flex-1 items-center gap-1 rounded-xl border border-white/10 bg-[#020617] p-2">
          {Array.from({ length: zones }).map((_, i) => {
            const active = i < filled;
            const priority = active && i >= filled - 2;
            return (
              <div
                key={i}
                className={`flex-1 rounded-md transition-all duration-300 ${
                  active
                    ? priority
                      ? "h-12 bg-gradient-to-b from-[#fb923c] to-[#f97316] shadow-[0_0_12px_rgba(249,115,22,0.4)]"
                      : "h-12 bg-gradient-to-b from-[#2dd4bf] to-[#14b8a6] shadow-[0_0_10px_rgba(20,184,166,0.35)]"
                    : "h-12 bg-white/[0.02] ring-1 ring-inset ring-white/5"
                }`}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
        <LegendDot color="bg-[#14b8a6]" label="Standard freight" />
        <LegendDot color="bg-[#f97316]" label="Priority cargo" />
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
