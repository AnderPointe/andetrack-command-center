import {
  Radio,
  CheckCircle2,
  PackageCheck,
  Timer,
  MessageSquare,
  Route as RouteIcon,
  type LucideIcon,
} from "lucide-react";

type Tone = "teal" | "orange" | "emerald" | "slate";

interface Event {
  icon: LucideIcon;
  title: string;
  detail: string;
  time: string;
  tone: Tone;
}

const TONE: Record<Tone, { bg: string; text: string; ring: string }> = {
  teal: { bg: "bg-teal-500/15", text: "text-teal-300", ring: "ring-teal-400/30" },
  orange: { bg: "bg-orange-500/15", text: "text-orange-300", ring: "ring-orange-400/30" },
  emerald: { bg: "bg-emerald-500/15", text: "text-emerald-300", ring: "ring-emerald-400/30" },
  slate: { bg: "bg-white/5", text: "text-slate-300", ring: "ring-white/10" },
};

const EVENTS: Event[] = [
  { icon: Radio, title: "GPS ping received", detail: "32.85, -97.10 · 45 mph", time: "2s ago", tone: "teal" },
  { icon: RouteIcon, title: "Route updated", detail: "Rerouted around I-30 congestion", time: "4m ago", tone: "orange" },
  { icon: MessageSquare, title: "Dispatcher message sent", detail: '"Confirm pallet A temperature"', time: "12m ago", tone: "teal" },
  { icon: Timer, title: "ETA recalculated", detail: "44 min → 12:12 PM (on time)", time: "18m ago", tone: "orange" },
  { icon: PackageCheck, title: "Pickup confirmed", detail: "Fort Worth dock B · 184 items", time: "1h 12m ago", tone: "emerald" },
  { icon: CheckCircle2, title: "Driver accepted load", detail: "SHP-228841 · Marcus Anderson", time: "1h 38m ago", tone: "emerald" },
];

export function DriverActivityLog() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#0f172a] p-6 shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2dd4bf]">
            Activity Log
          </p>
          <h3 className="mt-1 text-base font-bold text-white">Recent Events</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-emerald-300 ring-1 ring-emerald-400/30">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live
        </span>
      </div>

      <ol className="mt-5 space-y-3">
        {EVENTS.map((e, i) => {
          const Icon = e.icon;
          const t = TONE[e.tone];
          return (
            <li key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className={`grid h-8 w-8 place-items-center rounded-full ${t.bg} ring-1 ${t.ring} ${t.text}`}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {i < EVENTS.length - 1 && (
                  <span className="my-1 w-px flex-1 bg-white/5" />
                )}
              </div>
              <div className="flex-1 pb-3">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{e.title}</p>
                  <span className="shrink-0 text-[10px] uppercase tracking-wider text-slate-500">
                    {e.time}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-400">{e.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
