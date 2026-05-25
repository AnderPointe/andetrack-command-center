import { Clock } from "lucide-react";
import type { Shipment } from "@/types/anderroute";
import { ArrivalBadge } from "./StatusBadge";

interface Props {
  shipment: Shipment;
}

export function EtaArrivalCard({ shipment }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-teal-600/15 via-slate-900 to-orange-500/10 p-5 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-teal-500/20 ring-1 ring-teal-400/30">
            <Clock className="h-4 w-4 text-teal-300" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-teal-300">
              Estimated Arrival
            </p>
            <p className="text-sm font-semibold text-white">Today</p>
          </div>
        </div>
        <ArrivalBadge status={shipment.arrival_status} />
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-5xl font-black text-white">{shipment.scheduled_arrival}</p>
          <p className="mt-1 text-xs text-slate-400">Scheduled arrival</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-orange-300">
            {shipment.eta_minutes}
            <span className="ml-1 text-base font-semibold text-orange-200/70">min</span>
          </p>
          <p className="mt-1 text-xs text-slate-400">Time remaining</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Route progress</span>
          <span className="font-bold text-white">{shipment.route_progress_percent}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-400 to-orange-400"
            style={{ width: `${shipment.route_progress_percent}%` }}
          />
        </div>
      </div>
    </section>
  );
}
