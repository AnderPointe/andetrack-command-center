import { Battery, Fuel, Gauge, Signal } from "lucide-react";
import type { Shipment, Telemetry } from "@/types/dashboard";
import { TripStatusPill } from "./StatusPill";

function Ring({
  value,
  label,
  unit,
  color,
}: {
  value: number;
  label: string;
  unit: string;
  color: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="flex flex-col items-center rounded-2xl bg-slate-50 p-3">
      <div
        className="relative grid h-16 w-16 place-items-center rounded-full"
        style={{
          background: `conic-gradient(${color} ${pct}%, rgb(226,232,240) ${pct}% 100%)`,
        }}
      >
        <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-sm font-bold text-slate-900">
          {Math.round(value)}
          <span className="text-[10px] font-medium text-slate-500">{unit}</span>
        </div>
      </div>
      <p className="mt-2 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}

interface VehicleTelemetryCardProps {
  telemetry: Telemetry;
  shipment: Pick<Shipment, "route_progress" | "trip_status">;
}

export function VehicleTelemetryCard({
  telemetry,
  shipment,
}: VehicleTelemetryCardProps) {
  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-teal-600" />
          <h2 className="text-lg font-bold">Vehicle Telemetry</h2>
        </div>
        <TripStatusPill status={shipment.trip_status} />
      </div>

      <div className="mb-5 rounded-2xl bg-slate-950 px-4 py-3 text-white">
        <p className="text-xs text-slate-400">Current speed</p>
        <p className="mt-0.5 text-3xl font-bold tabular-nums">
          {Math.round(telemetry.speed_mph)}
          <span className="ml-1 text-sm font-normal text-slate-400">MPH</span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Ring
          value={telemetry.fuel_percent}
          label="Fuel"
          unit="%"
          color="rgb(20,184,166)"
        />
        <Ring
          value={telemetry.battery_percent}
          label="Battery"
          unit="%"
          color="rgb(249,115,22)"
        />
        <Ring
          value={telemetry.signal_percent}
          label="Signal"
          unit="%"
          color="rgb(56,189,248)"
        />
      </div>

      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-slate-500">Route progress</span>
          <span className="font-bold text-slate-900">
            {Math.round(shipment.route_progress)}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-orange-500"
            style={{
              width: `${Math.min(100, Math.max(0, shipment.route_progress))}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-1">
          <Fuel className="h-3 w-3" /> Fuel
        </div>
        <div className="flex items-center gap-1">
          <Battery className="h-3 w-3" /> Battery
        </div>
        <div className="flex items-center gap-1">
          <Signal className="h-3 w-3" /> Signal
        </div>
      </div>
    </div>
  );
}
