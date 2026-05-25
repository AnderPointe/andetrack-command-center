import { MapPin, Navigation, Flag, CheckCircle2 } from "lucide-react";
import type { Shipment } from "@/types/anderroute";

interface Props {
  shipment: Shipment;
}

export function RouteTimelineCard({ shipment }: Props) {
  const stops = [
    {
      icon: CheckCircle2,
      title: "Picked Up",
      address: shipment.pickup_address,
      state: "done" as const,
      time: "10:48 AM",
    },
    {
      icon: Navigation,
      title: "In Transit",
      address: "I-30 E · Arlington, TX",
      state: "current" as const,
      time: "Now",
    },
    {
      icon: Flag,
      title: "Destination",
      address: shipment.dropoff_address,
      state: "upcoming" as const,
      time: shipment.scheduled_arrival,
    },
  ];

  return (
    <section className="rounded-3xl border border-white/5 bg-slate-900 p-5 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-widest text-teal-300">
          Route Timeline
        </p>
        <span className="text-[11px] text-slate-500">3 stops</span>
      </div>

      <ol className="mt-4 space-y-0.5">
        {stops.map((stop, i) => {
          const Icon = stop.icon;
          const isDone = stop.state === "done";
          const isCurrent = stop.state === "current";
          return (
            <li key={stop.title} className="relative flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 ${
                    isDone
                      ? "bg-emerald-500/20 text-emerald-300 ring-emerald-400/40"
                      : isCurrent
                        ? "bg-orange-500/20 text-orange-300 ring-orange-400/40"
                        : "bg-white/5 text-slate-400 ring-white/10"
                  }`}
                >
                  {isCurrent ? (
                    <span className="absolute h-9 w-9 animate-ping rounded-full bg-orange-400/30" />
                  ) : null}
                  <Icon className="relative h-4 w-4" />
                </div>
                {i < stops.length - 1 && (
                  <div
                    className={`my-1 w-px flex-1 ${
                      isDone ? "bg-emerald-400/40" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 pb-5">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{stop.title}</p>
                  <span className="text-[11px] text-slate-400">{stop.time}</span>
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="h-3 w-3" />
                  {stop.address}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
