import { CalendarClock, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Shipment } from "@/types/dashboard";
import { TripStatusPill } from "./StatusPill";

function useCountdown(targetIso: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(targetIso).getTime() - now);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { h, m, s };
}

export function EtaCard({
  shipment,
}: {
  shipment: Pick<Shipment, "eta_minutes" | "scheduled_arrival_at" | "trip_status">;
}) {
  const { h, m, s } = useCountdown(shipment.scheduled_arrival_at);
  const arrival = new Date(shipment.scheduled_arrival_at);

  return (
    <div className="rounded-[2rem] bg-slate-100 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock3 className="h-5 w-5 text-orange-500" />
          <h2 className="text-lg font-bold">ETA / Arrival</h2>
        </div>
        <TripStatusPill status={shipment.trip_status} />
      </div>

      <p className="text-sm text-slate-500">Arriving in</p>
      <p className="mt-1 text-xl font-semibold">
        {shipment.eta_minutes >= 60
          ? `${Math.floor(shipment.eta_minutes / 60)}h ${shipment.eta_minutes % 60}m`
          : `${shipment.eta_minutes} min`}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-slate-950 px-3 py-4 text-center text-white">
        {[
          { v: h, l: "HRS" },
          { v: m, l: "MIN" },
          { v: s, l: "SEC" },
        ].map(({ v, l }) => (
          <div key={l}>
            <p className="text-3xl font-bold tabular-nums">
              {String(v).padStart(2, "0")}
            </p>
            <p className="mt-0.5 text-[10px] tracking-widest text-slate-400">
              {l}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm">
        <span className="inline-flex items-center gap-2 text-slate-500">
          <CalendarClock className="h-4 w-4" />
          Scheduled arrival
        </span>
        <span className="font-semibold text-slate-900">
          {arrival.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
