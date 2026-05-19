import { Activity, AlertTriangle, CloudRain, Fuel, Gauge, MapPinned, ShieldCheck, Coffee } from "lucide-react";
import type { RouteRisk } from "@/types/elitenav";

interface Props {
  risks: RouteRisk[];
  etaConfidence: number;
  averageMpg: number;
  fuelEstimateGal: number;
  fuelCostEstimate: number;
  breakInMin: number;
}

export function RouteIntelligenceCard({ risks, etaConfidence, averageMpg, fuelEstimateGal, fuelCostEstimate, breakInMin }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d141a]/85 p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-slate-500">Route Intelligence</div>
          <div className="text-sm font-semibold text-white">Live analysis</div>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-200">
          ETA confidence {etaConfidence}%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Stat icon={<Fuel className="h-3 w-3" />} label="Fuel est." value={`${fuelEstimateGal.toFixed(1)} gal`} />
        <Stat icon={<Gauge className="h-3 w-3" />} label="Avg MPG" value={`${averageMpg}`} />
        <Stat icon={<Activity className="h-3 w-3" />} label="Fuel cost est." value={`$${fuelCostEstimate.toFixed(0)}`} />
        <Stat icon={<Coffee className="h-3 w-3" />} label="Break in" value={`${breakInMin} min`} />
      </div>

      <div className="mt-3 space-y-1.5">
        {risks.map((r) => (
          <RiskRow key={r.id} risk={r} />
        ))}
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.015] p-2.5">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-slate-500">{icon}{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

const RISK_ICON: Record<RouteRisk["kind"], React.ReactNode> = {
  deviation: <MapPinned className="h-3.5 w-3.5" />,
  low_bridge: <AlertTriangle className="h-3.5 w-3.5" />,
  weight: <AlertTriangle className="h-3.5 w-3.5" />,
  hazmat: <ShieldCheck className="h-3.5 w-3.5" />,
  weather: <CloudRain className="h-3.5 w-3.5" />,
  closure: <ShieldCheck className="h-3.5 w-3.5" />,
  tight_turn: <AlertTriangle className="h-3.5 w-3.5" />,
};

function RiskRow({ risk }: { risk: RouteRisk }) {
  const tone =
    risk.severity === "critical"
      ? "border-red-500/30 bg-red-500/[0.06] text-red-200"
      : risk.severity === "warning"
      ? "border-orange-500/30 bg-orange-500/[0.05] text-orange-200"
      : "border-white/10 bg-white/[0.02] text-slate-300";
  return (
    <div className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[11px] ${tone}`}>
      {RISK_ICON[risk.kind]}
      <span className="truncate">{risk.message}</span>
    </div>
  );
}
