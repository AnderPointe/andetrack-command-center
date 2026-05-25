import { Clock } from "lucide-react";
import type { Shipment } from "@/types/anderroute";
import { ArrivalBadge } from "./StatusBadge";

interface Props {
  shipment: Shipment;
}

export function EtaArrivalCard({ shipment }: Props) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#14b8a6]/15 via-[#0f172a] to-[#f97316]/10 p-6 shadow-2xl shadow-black/50">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#14b8a6]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#f97316]/15 blur-3xl" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#14b8a6]/20 ring-1 ring-[#14b8a6]/40 shadow-lg shadow-[#14b8a6]/20">
            <Clock className="h-4 w-4 text-[#2dd4bf]" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#2dd4bf]">
              Estimated Arrival
            </p>
            <p className="text-sm font-semibold text-white">Today</p>
          </div>
        </div>
        <ArrivalBadge status={shipment.arrival_status} />
      </div>

      <div className="relative mt-6">
        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
          Scheduled arrival
        </p>
        <p className="mt-1 text-6xl font-black leading-none tracking-tight text-white drop-shadow-[0_0_24px_rgba(20,184,166,0.25)]">
          {shipment.scheduled_arrival}
        </p>
      </div>

      <div className="relative mt-5 flex items-end justify-between border-t border-white/10 pt-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Time remaining
          </p>
          <p className="mt-1 text-3xl font-black text-[#fb923c]">
            {shipment.eta_minutes}
            <span className="ml-1 text-sm font-semibold text-[#fb923c]/70">min</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Progress
          </p>
          <p className="mt-1 text-3xl font-black text-white">
            {shipment.route_progress_percent}%
          </p>
        </div>
      </div>

      <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#14b8a6] to-[#f97316] shadow-[0_0_12px_rgba(20,184,166,0.6)]"
          style={{ width: `${shipment.route_progress_percent}%` }}
        />
      </div>
    </section>
  );
}
