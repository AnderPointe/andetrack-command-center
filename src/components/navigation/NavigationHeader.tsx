import { AlertTriangle, Navigation2 } from "lucide-react";
import { maneuverGlyph } from "@/utils/elitenav";
import type { RouteStep } from "@/types/elitenav";

interface Props {
  step: RouteStep;
  upcoming?: RouteStep;
  distanceToTurn: string;
  big?: boolean;
  onClick?: () => void;
}

export function NavigationHeader({ step, upcoming, distanceToTurn, big = false, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e1820]/95 via-[#0b141b]/95 to-[#0a1218]/95 p-4 text-left backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] transition hover:border-teal-500/40"
    >
      {/* Top accent */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />

      <div className="flex items-start gap-4">
        <div
          className={
            "relative flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400/25 to-teal-600/5 text-teal-200 ring-1 ring-teal-400/40 shadow-[inset_0_1px_0_rgba(94,234,212,0.25)] " +
            (big ? "h-24 w-24 text-6xl" : "h-16 w-16 text-4xl")
          }
        >
          {maneuverGlyph(step.maneuver)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Navigation2 className="h-3 w-3 text-teal-300" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-teal-300/80">
              In <span className="font-semibold tabular-nums text-teal-200">{distanceToTurn}</span>
            </span>
          </div>
          <div className={"mt-1 truncate font-semibold text-white tracking-tight " + (big ? "text-3xl" : "text-xl")}>
            {step.instruction}
          </div>
          <div className="mt-0.5 truncate text-xs text-slate-400">{step.street}</div>
          {step.alert && (
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-orange-500/30 bg-orange-500/[0.08] px-2 py-0.5 text-[11px] text-orange-200">
              <AlertTriangle className="h-3 w-3" /> {step.alert}
            </div>
          )}
        </div>
      </div>
      {upcoming && (
        <div className="mt-3 flex items-center gap-2 border-t border-white/5 pt-3 text-[11px]">
          <span className="text-base text-slate-500">{maneuverGlyph(upcoming.maneuver)}</span>
          <span className="uppercase tracking-wider text-slate-500">Then</span>
          <span className="truncate text-slate-200">{upcoming.instruction}</span>
          <span className="ml-auto shrink-0 rounded-full bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
            {upcoming.distance}
          </span>
        </div>
      )}
    </button>
  );
}
