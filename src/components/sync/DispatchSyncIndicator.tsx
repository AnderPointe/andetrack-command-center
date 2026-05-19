import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import type { DispatchSyncEvent } from "@/types/elitenav";

interface Props {
  events: DispatchSyncEvent[];
  online?: boolean;
}

export function DispatchSyncIndicator({ events, online = true }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d141a]/85 p-3 backdrop-blur-xl">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <motion.span
              className={`absolute inline-flex h-full w-full rounded-full ${online ? "bg-emerald-400" : "bg-slate-500"}`}
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.8, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className={`relative inline-flex h-2 w-2 rounded-full ${online ? "bg-emerald-400" : "bg-slate-500"}`} />
          </span>
          <div className="text-[11px] font-medium text-slate-200">Dispatch Sync</div>
          <Radio className="h-3 w-3 text-slate-500" />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-slate-500">{online ? "Online" : "Offline"}</span>
      </div>
      <div className="max-h-28 space-y-1 overflow-hidden">
        {events.slice(0, 4).map((e) => (
          <div key={e.id} className="flex items-center justify-between gap-2 text-[11px]">
            <span className="truncate text-slate-300">{e.message}</span>
            <span className="shrink-0 text-slate-500">{e.at}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
