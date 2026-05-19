import { ShieldCheck, AlertTriangle, Truck, Ruler, Weight, Flame } from "lucide-react";
import type { Vehicle } from "@/types/elitenav";

export function CDLRestrictionCard({ vehicle }: { vehicle: Vehicle }) {
  const metrics = [
    {
      icon: Ruler,
      label: "Height",
      value: `${vehicle.heightFt}′`,
      tone: "text-teal-300",
    },
    {
      icon: Weight,
      label: "GVW",
      value: `${(vehicle.weightLbs / 1000).toFixed(1)}k lb`,
      tone: "text-teal-300",
    },
    {
      icon: Ruler,
      label: "Length",
      value: `${vehicle.lengthFt}′`,
      tone: "text-teal-300",
    },
    {
      icon: Flame,
      label: "Hazmat",
      value: vehicle.hazmatEnabled ? "Yes" : "None",
      tone: vehicle.hazmatEnabled ? "text-orange-300" : "text-slate-400",
    },
  ];

  const checks = [
    { label: "Low-clearance avoidance", ok: true },
    { label: "Weight-restricted bridges", ok: true },
    { label: "Hazmat-restricted routing", ok: !vehicle.hazmatEnabled },
    { label: "Tight-turn / no-truck zones", ok: true },
    { label: "National truck-route compliance", ok: true },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-teal-400/25 bg-gradient-to-br from-teal-500/[0.08] via-[#0c1620]/90 to-[#0a1218]/90 p-4 backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-teal-400/10 blur-2xl" />

      <div className="relative mb-3 flex items-start justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-teal-300/80">CDL Truck Routing</div>
          <div className="mt-0.5 flex items-center gap-2 text-sm font-semibold text-white">
            <Truck className="h-4 w-4 text-teal-300" />
            {vehicle.type}
            <span className="text-xs font-normal text-slate-500">· {vehicle.unit}</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-200">
          <ShieldCheck className="h-3 w-3" /> Truck-Safe
        </span>
      </div>

      {/* Vehicle dimensions strip */}
      <div className="relative mb-3 grid grid-cols-4 gap-1.5">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-lg border border-white/[0.06] bg-white/[0.025] px-2 py-1.5">
            <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-slate-500">
              <m.icon className="h-2.5 w-2.5" /> {m.label}
            </div>
            <div className={`mt-0.5 text-sm font-semibold tabular-nums ${m.tone}`}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Compliance checks */}
      <ul className="relative space-y-1">
        {checks.map((c) => (
          <li
            key={c.label}
            className="flex items-center justify-between rounded-md border border-white/[0.05] bg-white/[0.015] px-2.5 py-1.5 text-[11px]"
          >
            <span className="flex items-center gap-2 text-slate-200">
              {c.ok ? (
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
              ) : (
                <AlertTriangle className="h-3.5 w-3.5 text-orange-300" />
              )}
              {c.label}
            </span>
            <span className={`text-[10px] font-medium uppercase tracking-wider ${c.ok ? "text-emerald-300/80" : "text-orange-300"}`}>
              {c.ok ? "Pass" : "Review"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
