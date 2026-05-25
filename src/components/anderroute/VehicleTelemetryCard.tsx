import { Gauge, Fuel, Signal, Activity, Thermometer, RefreshCw } from "lucide-react";
import type { Driver, Vehicle } from "@/types/anderroute";

interface Props {
  driver: Driver;
  vehicle: Vehicle;
}

export function VehicleTelemetryCard({ driver, vehicle }: Props) {
  const rows: Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    accent: string;
  }> = [
    { icon: Gauge, label: "Speed", value: `${driver.speed_mph} mph`, accent: "text-teal-300" },
    { icon: Fuel, label: "Fuel", value: `${vehicle.fuel_level}%`, accent: "text-orange-300" },
    { icon: Signal, label: "Signal", value: "96%", accent: "text-emerald-300" },
    { icon: Activity, label: "Engine", value: vehicle.engine_status, accent: "text-teal-300" },
    { icon: Thermometer, label: "Cabin", value: "38°F", accent: "text-sky-300" },
    { icon: RefreshCw, label: "Route", value: "On Path", accent: "text-emerald-300" },
  ];

  return (
    <section className="rounded-3xl border border-white/5 bg-slate-900 p-5 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-teal-300">
            Vehicle Telemetry
          </p>
          <h3 className="mt-0.5 text-base font-bold text-white">
            {vehicle.unit_number} · {vehicle.plate}
          </h3>
        </div>
        <span className="text-[11px] text-slate-500">Updated 2s ago</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {rows.map(({ icon: Icon, label, value, accent }) => (
          <div
            key={label}
            className="rounded-xl border border-white/5 bg-white/[0.02] p-3"
          >
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500">
              <Icon className={`h-3 w-3 ${accent}`} /> {label}
            </div>
            <p className="mt-1.5 text-sm font-bold text-white">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
