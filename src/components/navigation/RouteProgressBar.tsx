import { motion } from "framer-motion";

interface Props {
  progress: number; // 0..100
  totalMiles: number;
  remainingMiles: number;
}

export function RouteProgressBar({ progress, totalMiles, remainingMiles }: Props) {
  const pct = Math.max(0, Math.min(100, progress));
  const traveled = totalMiles - remainingMiles;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-500">
        <span>Route Progress</span>
        <span className="font-semibold tabular-nums text-teal-300">{Math.round(pct)}%</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-white/[0.05] ring-1 ring-inset ring-white/5">
        {/* Origin pip */}
        <span className="absolute left-0 top-1/2 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-teal-400 bg-[#0a0e12]" />
        {/* Destination pip */}
        <span className="absolute right-0 top-1/2 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-orange-400 bg-[#0a0e12]" />
        {/* Fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-teal-400 via-teal-300 to-orange-400"
          style={{ boxShadow: "0 0 18px -2px rgba(45,212,191,0.7)" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        {/* Moving driver pip */}
        <motion.div
          className="absolute top-1/2 z-20 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]"
          animate={{ left: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
        <span><span className="tabular-nums font-medium text-slate-200">{traveled.toFixed(1)}</span> mi traveled</span>
        <span><span className="tabular-nums font-medium text-slate-200">{remainingMiles.toFixed(1)}</span> mi remaining</span>
      </div>
    </div>
  );
}
