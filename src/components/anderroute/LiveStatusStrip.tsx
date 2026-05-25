import {
  Activity,
  Signal,
  Radio,
  Timer,
  Route as RouteIcon,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import type { Driver, Shipment } from "@/types/anderroute";

interface Props {
  driver: Driver;
  shipment: Shipment;
}

type Tone = "teal" | "orange" | "rose" | "slate";

const TONE: Record<Tone, { dot: string; text: string; ring: string }> = {
  teal: {
    dot: "bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]",
    text: "text-teal-300",
    ring: "ring-teal-400/30",
  },
  orange: {
    dot: "bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]",
    text: "text-orange-300",
    ring: "ring-orange-400/30",
  },
  rose: {
    dot: "bg-rose-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]",
    text: "text-rose-300",
    ring: "ring-rose-400/30",
  },
  slate: {
    dot: "bg-slate-500",
    text: "text-slate-300",
    ring: "ring-white/10",
  },
};

export function LiveStatusStrip({ driver, shipment }: Props) {
  const items: {
    icon: LucideIcon;
    label: string;
    value: string;
    tone: Tone;
  }[] = [
    {
      icon: Activity,
      label: "Driver",
      value: driver.status.replace("_", " "),
      tone: driver.status === "delayed" ? "rose" : "teal",
    },
    { icon: Signal, label: "GPS Signal", value: "96% · Strong", tone: "teal" },
    { icon: Radio, label: "Last Ping", value: "2s ago", tone: "teal" },
    {
      icon: Timer,
      label: "ETA Accuracy",
      value: shipment.arrival_status === "on_time" ? "±2 min" : "±9 min",
      tone: shipment.arrival_status === "on_time" ? "teal" : "orange",
    },
    {
      icon: RouteIcon,
      label: "Route",
      value: `${shipment.route_progress_percent}% on path`,
      tone: "orange",
    },
    { icon: UserCheck, label: "Customer", value: "Notified", tone: "teal" },
  ];

  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-gradient-to-r from-[#0f172a] via-[#0b1326] to-[#0f172a] p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {items.map(({ icon: Icon, label, value, tone }) => {
          const t = TONE[tone];
          return (
            <div
              key={label}
              className={`group flex items-center gap-2.5 rounded-xl bg-white/[0.03] px-3 py-2 ring-1 ${t.ring} transition hover:bg-white/[0.06]`}
            >
              <span
                className={`relative grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/[0.04] ${t.text}`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span
                  className={`absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full ${t.dot}`}
                />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {label}
                </p>
                <p className={`truncate text-xs font-bold capitalize ${t.text}`}>
                  {value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
