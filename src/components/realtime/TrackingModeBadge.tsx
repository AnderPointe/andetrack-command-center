import { Activity, Gauge, Moon, Pause, Power } from "lucide-react";
import type { TrackingMode } from "@/types/location";

const META: Record<TrackingMode, { label: string; icon: any; tone: string }> = {
  off: { label: "Tracking off", icon: Power, tone: "border-slate-700 bg-slate-800/60 text-slate-400" },
  foreground: { label: "Foreground", icon: Activity, tone: "border-teal-400/40 bg-teal-500/10 text-teal-200" },
  background: { label: "Background", icon: Moon, tone: "border-sky-400/40 bg-sky-500/10 text-sky-200" },
  active_load: { label: "Active load · high accuracy", icon: Gauge, tone: "border-emerald-400/40 bg-emerald-500/10 text-emerald-200" },
  reduced_frequency: { label: "Reduced frequency", icon: Moon, tone: "border-amber-400/30 bg-amber-500/10 text-amber-200" },
  paused: { label: "Paused", icon: Pause, tone: "border-slate-700 bg-slate-800/60 text-slate-300" },
};

export function TrackingModeBadge({ mode, className = "" }: { mode: TrackingMode; className?: string }) {
  const m = META[mode];
  const Icon = m.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${m.tone} ${className}`}>
      <Icon className="h-3 w-3" /> {m.label}
    </span>
  );
}
