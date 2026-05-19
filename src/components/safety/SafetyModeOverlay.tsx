import { ShieldCheck } from "lucide-react";

export function SafetyModeOverlay({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute left-1/2 top-3 z-30 -translate-x-1/2">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-500/10 px-3 py-1.5 text-[11px] text-teal-100 backdrop-blur-xl">
        <ShieldCheck className="h-3.5 w-3.5" />
        <span className="font-medium">Safety Mode active</span>
        <span className="text-teal-200/70">· Parked mode unlocks full controls</span>
      </div>
    </div>
  );
}
