import { Box, Layers, Package, Percent, Truck, Weight } from "lucide-react";
import type { Shipment } from "@/types/dashboard";

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/30 px-4 py-3 backdrop-blur">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/60 text-slate-800">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-900/70">{label}</p>
        <p className="mt-0.5 text-base font-bold">{value}</p>
      </div>
    </div>
  );
}

export function ShipmentLoadCard({ shipment }: { shipment: Shipment }) {
  return (
    <div className="rounded-[2rem] bg-gradient-to-br from-orange-400 to-orange-500 p-6 text-slate-950 shadow-sm">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-900/60">
            Shipment Load Overview
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight">
            {shipment.cargo_type}
          </h2>
          <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium opacity-80">
            <Truck className="h-4 w-4" />
            {shipment.vehicle_type}
          </p>
        </div>

        <div className="rounded-2xl bg-white/70 px-4 py-3 text-sm font-bold">
          {shipment.id}
        </div>
      </div>

      {/* Cargo visualization placeholder */}
      <div className="mt-6 flex h-32 items-end gap-1.5 overflow-hidden rounded-2xl bg-white/25 p-4 backdrop-blur">
        {Array.from({ length: 14 }).map((_, i) => {
          const filled = i / 14 < shipment.space_utilization_percent / 100;
          return (
            <div
              key={i}
              className={`flex-1 rounded-md transition-all ${
                filled ? "bg-slate-900" : "bg-white/60"
              }`}
              style={{ height: `${30 + ((i * 17) % 60)}%` }}
            />
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
        <Metric
          icon={<Weight className="h-4 w-4" />}
          label="Weight"
          value={`${shipment.weight_kg.toLocaleString()} kg`}
        />
        <Metric
          icon={<Percent className="h-4 w-4" />}
          label="Capacity Used"
          value={`${shipment.capacity_percent}%`}
        />
        <Metric
          icon={<Box className="h-4 w-4" />}
          label="Load Volume"
          value={`${shipment.volume_cuft.toLocaleString()} cu ft`}
        />
        <Metric
          icon={<Layers className="h-4 w-4" />}
          label="Space Utilization"
          value={`${shipment.space_utilization_percent}%`}
        />
        <Metric
          icon={<Package className="h-4 w-4" />}
          label="Cargo Type"
          value={shipment.cargo_type.split(" ")[0]}
        />
        <Metric
          icon={<Truck className="h-4 w-4" />}
          label="Vehicle"
          value={shipment.vehicle_type.split(" ").slice(-1)[0]}
        />
      </div>
    </div>
  );
}
