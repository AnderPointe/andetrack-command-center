/**
 * Phase 3 polish — ReroutingOverlay.
 *
 * Soft overlay that appears while the NavigationProvider is computing a new
 * route. Suppresses driver actions and reassures with a calm spinner.
 */
import { Loader2, Route } from "lucide-react";

interface Props {
  visible: boolean;
  reason?: string | null;
}

export function ReroutingOverlay({ visible, reason }: Props) {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute inset-0 z-30 flex items-center justify-center rounded-xl bg-black/55 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="flex w-[min(360px,90%)] items-center gap-3 rounded-2xl border border-white/15 bg-zinc-950/85 px-4 py-3 shadow-xl">
        <div className="relative grid h-10 w-10 place-items-center rounded-full bg-emerald-500/20">
          <Loader2 className="absolute h-8 w-8 animate-spin text-emerald-300/80" />
          <Route className="h-4 w-4 text-emerald-200" />
        </div>
        <div className="min-w-0 leading-tight">
          <div className="text-[13px] font-semibold text-zinc-100">Rerouting</div>
          <div className="truncate text-[11px] text-zinc-400">
            {reason ?? "Finding a faster path with current traffic…"}
          </div>
        </div>
      </div>
    </div>
  );
}
