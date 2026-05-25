import { Gauge, Fuel, Signal, Activity, Thermometer, RefreshCw } from "lucide-react";
import type { Driver, Vehicle } from "@/types/anderroute";

interface Props {
  driver: Driver;
  vehicle: Vehicle;
}

export function VehicleTelemetryCard({ driver, vehicle }: Props) {
  const rows: Array<{
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    label: string;
    value: string;
    accent: string;
  }> = [
    { icon: Gauge, label: "Speed", value: `${driver.speed_mph} mph`, accent: "#2dd4bf" },
    { icon: Fuel, label: "Fuel", value: `${vehicle.fuel_level}%`, accent: "#fb923c" },
    { icon: Signal, label: "Signal", value: "96%", accent: "#34d399" },
    { icon: Activity, label: "Engine", value: vehicle.engine_status, accent: "#2dd4bf" },
    { icon: Thermometer, label: "Cabin", value: "38°F", accent: "#7dd3fc" },
    { icon: RefreshCw, label: "Route", value: "On Path", accent: "#34d399" },
  ];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#0f172a] p-6 shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2dd4bf]">
            Vehicle Telemetry
          </p>
          <h3 className="mt-1 text-base font-bold text-white">
            {vehicle.unit_number} <span className="text-slate-500">·</span>{" "}
            <span className="font-mono">{vehicle.plate}</span>
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
          2s ago
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {rows.map(({ icon: Icon, label, value, accent }) => (
          <div
            key={label}
            className="group rounded-xl border border-white/10 bg-white/[0.02] p-3 transition hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              <Icon className="h-3 w-3" style={{ color: accent }} /> {label}
            </div>
            <p className="mt-1.5 text-sm font-bold text-white">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
