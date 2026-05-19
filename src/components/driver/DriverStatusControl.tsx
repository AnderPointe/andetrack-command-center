import { AnimatePresence, motion } from "framer-motion";
import { X, Check } from "lucide-react";
import type { DriverStatusKey } from "@/types/elitenav";
import { STATUS_META, STATUS_ORDER } from "@/utils/elitenav";

interface Props {
  open: boolean;
  current: DriverStatusKey;
  onClose: () => void;
  onChange: (s: DriverStatusKey) => void;
}

const TONE_DOT: Record<string, string> = {
  neutral: "bg-slate-400",
  info: "bg-teal-400",
  warn: "bg-orange-400",
  success: "bg-emerald-400",
  alert: "bg-red-400",
};

export function DriverStatusControl({ open, current, onClose, onChange }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="absolute inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute inset-x-3 bottom-3 z-50 rounded-3xl border border-white/10 bg-[#0b1218]/95 p-4 backdrop-blur-xl sm:inset-x-auto sm:right-4 sm:w-[420px]"
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">Driver Status</div>
                <div className="text-base font-semibold text-white">Update your state</div>
              </div>
              <button onClick={onClose} className="rounded-full border border-white/10 p-1.5 text-slate-300 hover:bg-white/5">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {STATUS_ORDER.map((k) => {
                const meta = STATUS_META[k];
                const active = current === k;
                return (
                  <button
                    key={k}
                    onClick={() => { onChange(k); onClose(); }}
                    className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left text-xs transition ${
                      active
                        ? "border-teal-400/40 bg-teal-500/10 text-teal-100"
                        : "border-white/10 bg-white/[0.02] text-slate-200 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className={`h-2 w-2 rounded-full ${TONE_DOT[meta.tone]}`} />
                      <span className="truncate">{meta.label}</span>
                    </span>
                    {active && <Check className="h-3.5 w-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
