import { motion } from "framer-motion";
import { Radio, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import type { DispatchSyncEvent } from "@/types/elitenav";

interface Props {
  events: DispatchSyncEvent[];
  online?: boolean;
}

export function DispatchSyncIndicator({ events, online = true }: Props) {
  // Mock realtime telemetry
  const [latencyMs, setLatencyMs] = useState(42);
  const [packets, setPackets] = useState(1284);
  const [history, setHistory] = useState<number[]>(() =>
    Array.from({ length: 18 }, () => 28 + Math.floor(Math.random() * 50)),
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      const next = 28 + Math.floor(Math.random() * 40);
      setLatencyMs(next);
      setPackets((p) => p + 1);
      setHistory((h) => [...h.slice(-17), next]);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  const signalBars = latencyMs < 60 ? 4 : latencyMs < 100 ? 3 : latencyMs < 160 ? 2 : 1;
  const maxLat = Math.max(80, ...history);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e1820]/95 to-[#0a1218]/95 p-3 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <motion.span
              className={`absolute inline-flex h-full w-full rounded-full ${online ? "bg-emerald-400" : "bg-slate-500"}`}
              animate={{ opacity: [1, 0.2, 1], scale: [1, 2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${online ? "bg-emerald-400" : "bg-slate-500"} shadow-[0_0_8px_rgba(52,211,153,0.7)]`} />
          </span>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-200">Dispatch Telemetry</div>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Signal bars */}
          <div className="flex items-end gap-[2px]" aria-label={`Signal ${signalBars} of 4`}>
            {[1, 2, 3, 4].map((b) => (
              <span
                key={b}
                className={`w-[2.5px] rounded-sm ${b <= signalBars ? "bg-emerald-400" : "bg-white/10"}`}
                style={{ height: `${4 + b * 2}px` }}
              />
            ))}
          </div>
          <Wifi className="h-3 w-3 text-slate-500" />
        </div>
      </div>

      {/* Telemetry strip */}
      <div className="mb-2 grid grid-cols-3 gap-1.5 text-[10px]">
        <div className="rounded-md border border-white/[0.06] bg-white/[0.02] px-1.5 py-1">
          <div className="uppercase tracking-wider text-slate-500">Latency</div>
          <div className="mt-0.5 font-semibold tabular-nums text-emerald-300">{latencyMs}<span className="ml-0.5 font-normal text-slate-500">ms</span></div>
        </div>
        <div className="rounded-md border border-white/[0.06] bg-white/[0.02] px-1.5 py-1">
          <div className="uppercase tracking-wider text-slate-500">Pings</div>
          <div className="mt-0.5 font-semibold tabular-nums text-slate-100">{packets.toLocaleString()}</div>
        </div>
        <div className="rounded-md border border-white/[0.06] bg-white/[0.02] px-1.5 py-1">
          <div className="flex items-center gap-1 uppercase tracking-wider text-slate-500">
            <Radio className="h-2.5 w-2.5" /> Ch
          </div>
          <div className="mt-0.5 font-semibold text-slate-100">live-01</div>
        </div>
      </div>

      {/* Latency sparkline */}
      <div className="mb-2 flex h-7 items-end gap-[2px] rounded-md border border-white/[0.06] bg-white/[0.015] px-1.5 py-1">
        {history.map((v, i) => {
          const h = Math.max(2, (v / maxLat) * 20);
          const tone = v > 120 ? "bg-orange-400/80" : v > 80 ? "bg-amber-300/80" : "bg-emerald-400/80";
          return (
            <span
              key={i}
              className={`w-[3px] rounded-sm transition-all ${tone}`}
              style={{ height: `${h}px` }}
            />
          );
        })}
      </div>

      <div className="max-h-32 space-y-1 overflow-hidden">
        {events.slice(0, 4).map((e, i) => (
          <motion.div
            key={e.id}
            initial={i === 0 ? { opacity: 0, x: -8 } : false}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between gap-2 rounded-md border border-white/[0.04] bg-white/[0.015] px-2 py-1 text-[11px]"
          >
            <span className="flex min-w-0 items-center gap-1.5 text-slate-300">
              <span className="h-1 w-1 shrink-0 rounded-full bg-teal-400" />
              <span className="truncate">{e.message}</span>
            </span>
            <span className="shrink-0 font-mono text-[10px] text-slate-500">{e.at}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
