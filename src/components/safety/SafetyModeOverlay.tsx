import { motion } from "framer-motion";
import { ShieldCheck, Lock } from "lucide-react";

export function SafetyModeOverlay({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute left-1/2 top-3 z-30 -translate-x-1/2">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-teal-400/40 bg-teal-500/[0.12] px-3.5 py-1.5 text-[11px] text-teal-50 shadow-[0_10px_30px_-10px_rgba(45,212,191,0.5)] backdrop-blur-xl"
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full bg-teal-400/30"
            animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <ShieldCheck className="h-3.5 w-3.5 text-teal-200" />
        </span>
        <span className="font-semibold uppercase tracking-wider text-teal-100">Safety Mode</span>
        <span className="h-3 w-px bg-teal-400/40" />
        <span className="inline-flex items-center gap-1 text-teal-200/80">
          <Lock className="h-3 w-3" /> Hands-free · large UI · controls locked while moving
        </span>
      </motion.div>
    </div>
  );
}
