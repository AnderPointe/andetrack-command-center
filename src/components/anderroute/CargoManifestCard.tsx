import { Box, Weight, Thermometer, AlertTriangle, Flame, FileText } from "lucide-react";
import type { CargoManifest } from "@/types/anderroute";

interface Props {
  manifest: CargoManifest;
}

export function CargoManifestCard({ manifest }: Props) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#0f172a] p-6 shadow-2xl shadow-black/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2dd4bf]">
            Cargo Manifest
          </p>
          <h3 className="mt-1 text-base font-bold text-white">{manifest.category}</h3>
        </div>
        <div className="flex items-center gap-1.5">

          {manifest.hazmat && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] font-semibold text-rose-300 ring-1 ring-rose-400/30">
              <AlertTriangle className="h-3 w-3" /> HAZMAT
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-orange-300 ring-1 ring-orange-400/30">
            <Flame className="h-3 w-3" /> {manifest.priority}
          </span>
        </div>
      </div>

      <p className="mt-2 text-sm text-slate-300">
        Priority medical supplies, boxed freight, route-sensitive parcels, and same-day delivery cargo.
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Tile icon={Box} label="Items" value={manifest.item_count.toString()} />
        <Tile icon={Weight} label="Weight" value={`${manifest.weight.toLocaleString()} kg`} />
        <Tile icon={Box} label="Volume" value={`${manifest.volume}`} sub="cu ft" />
      </div>

      <div className="mt-3 space-y-2">
        <Row
          icon={Thermometer}
          label="Temperature"
          value={manifest.temperature_requirement}
        />
        <Row
          icon={FileText}
          label="Special Handling"
          value={manifest.special_handling_notes}
        />
      </div>
    </section>
  );
}

function Tile({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <p className="mt-1 text-base font-bold text-white">
        {value}
        {sub && <span className="ml-1 text-[10px] font-medium text-slate-400">{sub}</span>}
      </p>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <p className="mt-1 text-xs text-slate-200">{value}</p>
    </div>
  );
}
