import { ShieldCheck, AlertTriangle, Truck } from "lucide-react";
import type { Vehicle } from "@/types/elitenav";

export function CDLRestrictionCard({ vehicle }: { vehicle: Vehicle }) {
  const checks = [
    { label: "Low bridge avoidance", ok: true, note: `${vehicle.heightFt}′ tracked` },
    { label: "Weight restriction avoidance", ok: true, note: `${vehicle.weightLbs.toLocaleString()} lb` },
    { label: "Hazmat restriction", ok: !vehicle.hazmatEnabled, note: vehicle.hazmatEnabled ? "HAZMAT routing" : "Not required" },
    { label: "Tight turn warning", ok: true, note: `${vehicle.lengthFt}′ trailer` },
    { label: "Truck route compliance", ok: true, note: "National Network" },
    { label: "Restricted road warning", ok: true, note: "Armed" },
  ];

  return (
    <div className="rounded-2xl border border-teal-400/20 bg-gradient-to-br from-teal-500/[0.06] to-transparent p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-teal-300/80">CDL Routing</div>
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Truck className="h-4 w-4 text-teal-300" /> {vehicle.type} · {vehicle.unit}
          </div>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-200">
          Truck-safe
        </span>
      </div>
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5 text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-200">
              {c.ok ? <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" /> : <AlertTriangle className="h-3.5 w-3.5 text-orange-300" />}
              {c.label}
            </span>
            <span className="text-slate-400">{c.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
