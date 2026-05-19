import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, MapPin, Navigation } from "lucide-react";
import { maneuverGlyph } from "@/utils/elitenav";
import type { RouteStep } from "@/types/elitenav";

interface Props {
  open: boolean;
  onClose: () => void;
  steps: RouteStep[];
  currentIndex: number;
}

export function TurnByTurnPanel({ open, onClose, steps, currentIndex }: Props) {
  const completed = Math.max(0, Math.min(currentIndex, steps.length));
  const pct = (completed / Math.max(steps.length, 1)) * 100;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="absolute inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 z-50 overflow-hidden rounded-t-3xl border-t border-white/10 bg-gradient-to-b from-[#0d161e]/98 to-[#080d12]/98 backdrop-blur-2xl shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.7)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
          >
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-white/15" />
            <div className="flex items-start justify-between gap-3 px-5 pb-3 pt-3">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[0.2em] text-teal-300/70">Turn-by-Turn Directions</div>
                <div className="mt-0.5 flex items-center gap-2 text-base font-semibold text-white">
                  <Navigation className="h-4 w-4 text-teal-300" />
                  {steps.length} maneuvers
                  <span className="text-xs font-normal text-slate-500">· {completed} of {steps.length} complete</span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close directions"
                className="rounded-full border border-white/10 p-1.5 text-slate-300 hover:bg-white/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mx-5 mb-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-orange-400"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-3 pb-6">
              <ol className="space-y-1.5">
                {steps.map((s, i) => {
                  const done = i < currentIndex;
                  const active = i === currentIndex;
                  return (
                    <li
                      key={s.id}
                      className={`group relative flex items-start gap-3 rounded-xl border p-3 transition ${
                        active
                          ? "border-teal-400/50 bg-gradient-to-r from-teal-500/[0.12] to-transparent shadow-[0_0_30px_-12px_rgba(45,212,191,0.55)]"
                          : done
                          ? "border-white/5 bg-white/[0.015] opacity-55"
                          : "border-white/10 bg-white/[0.025] hover:bg-white/[0.04]"
                      }`}
                    >
                      {/* Step rail */}
                      {i < steps.length - 1 && (
                        <span
                          className={`absolute left-[31px] top-[52px] h-[calc(100%-32px)] w-px ${
                            done ? "bg-white/10" : active ? "bg-teal-400/40" : "bg-white/[0.06]"
                          }`}
                        />
                      )}
                      <div
                        className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl font-medium ${
                          active
                            ? "bg-teal-500/15 text-teal-200 ring-2 ring-teal-400/50"
                            : done
                            ? "bg-white/5 text-slate-500"
                            : "bg-white/[0.04] text-slate-200"
                        }`}
                      >
                        {maneuverGlyph(s.maneuver)}
                        {active && (
                          <motion.span
                            className="absolute -inset-1 rounded-xl border-2 border-teal-400/30"
                            animate={{ opacity: [0.7, 0.2, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                            Step {String(i + 1).padStart(2, "0")}
                          </span>
                          {active && (
                            <span className="rounded-full bg-teal-500/15 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-teal-200">
                              Now
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 text-sm font-semibold leading-snug text-white">{s.instruction}</div>
                        <div className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-slate-400">
                          <MapPin className="h-3 w-3 shrink-0" /> {s.street}
                        </div>
                        {s.alert && (
                          <div className="mt-1.5 inline-flex items-center gap-1 rounded-md border border-orange-500/30 bg-orange-500/[0.08] px-1.5 py-0.5 text-[10px] text-orange-200">
                            <AlertTriangle className="h-3 w-3" /> {s.alert}
                          </div>
                        )}
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-sm font-semibold tabular-nums text-white">{s.distance}</div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-500">{s.duration}</div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
