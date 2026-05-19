/**
 * Phase 3 polish — OffRouteBanner.
 *
 * High-contrast amber banner that appears whenever the active provider
 * fires an off-route event. Auto-clears when the driver returns within
 * tolerance or a reroute completes.
 */
import { AlertTriangle, Navigation, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  distance_m: number;
  onReroute?: () => void;
  onDismiss?: () => void;
  compact?: boolean;
}

export function OffRouteBanner({ distance_m, onReroute, onDismiss, compact }: Props) {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 rounded-xl border border-amber-400/60 bg-amber-500/15 px-3 py-2.5 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.15)] animate-in slide-in-from-top-2 duration-300"
    >
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-500/25 ring-2 ring-amber-400/50">
        <AlertTriangle className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1 leading-tight">
        <div className="text-[13px] font-semibold tracking-wide">Off route</div>
        <div className="text-[11px] text-amber-200/80">
          {Math.round(distance_m)} m from planned path · CoPilot is recalculating
        </div>
      </div>
      {!compact && (
        <div className="flex items-center gap-1">
          {onReroute && (
            <Button
              size="sm"
              variant="secondary"
              className="h-7 gap-1 bg-amber-400/90 text-amber-950 hover:bg-amber-300"
              onClick={onReroute}
            >
              <RotateCcw className="h-3 w-3" /> Reroute
            </Button>
          )}
          {onDismiss && (
            <Button size="sm" variant="ghost" className="h-7 px-2 text-amber-100 hover:bg-amber-500/20" onClick={onDismiss}>
              <Navigation className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
