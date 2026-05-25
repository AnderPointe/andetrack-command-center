import {
  Phone,
  MessageSquare,
  Repeat,
  Clock,
  AlertTriangle,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

interface Action {
  icon: LucideIcon;
  label: string;
  tone: "teal" | "orange" | "rose" | "emerald" | "slate";
  hint?: string;
}

const ACTIONS: Action[] = [
  { icon: Phone, label: "Call Driver", tone: "teal", hint: "Direct line" },
  { icon: MessageSquare, label: "Message Driver", tone: "teal", hint: "Push to cab" },
  { icon: Repeat, label: "Reassign Load", tone: "orange", hint: "Transfer shipment" },
  { icon: Clock, label: "Update ETA", tone: "orange", hint: "Recalculate" },
  { icon: AlertTriangle, label: "Report Issue", tone: "rose", hint: "Flag dispatcher" },
  { icon: CheckCircle2, label: "Mark Delivered", tone: "emerald", hint: "Close shipment" },
];

const TONE: Record<Action["tone"], { bg: string; ring: string; text: string; glow: string }> = {
  teal: {
    bg: "from-[#14b8a6]/15 to-[#0f766e]/5",
    ring: "ring-[#14b8a6]/30",
    text: "text-[#2dd4bf]",
    glow: "hover:shadow-[0_12px_30px_-12px_rgba(20,184,166,0.55)]",
  },
  orange: {
    bg: "from-[#f97316]/15 to-[#c2410c]/5",
    ring: "ring-[#f97316]/30",
    text: "text-[#fb923c]",
    glow: "hover:shadow-[0_12px_30px_-12px_rgba(249,115,22,0.55)]",
  },
  rose: {
    bg: "from-rose-500/15 to-rose-700/5",
    ring: "ring-rose-400/30",
    text: "text-rose-300",
    glow: "hover:shadow-[0_12px_30px_-12px_rgba(244,63,94,0.5)]",
  },
  emerald: {
    bg: "from-emerald-500/15 to-emerald-700/5",
    ring: "ring-emerald-400/30",
    text: "text-emerald-300",
    glow: "hover:shadow-[0_12px_30px_-12px_rgba(16,185,129,0.5)]",
  },
  slate: {
    bg: "from-white/5 to-white/0",
    ring: "ring-white/10",
    text: "text-slate-300",
    glow: "hover:shadow-[0_12px_30px_-12px_rgba(148,163,184,0.3)]",
  },
};

export function OperationsPanel() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#0f172a] p-5 shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2dd4bf]">
          Operations
        </p>
        <span className="text-[10px] uppercase tracking-wider text-slate-500">
          Command
        </span>
      </div>
      <h3 className="mt-1 text-base font-bold text-white">Dispatch Control</h3>

      <div className="mt-4 grid gap-2">
        {ACTIONS.map(({ icon: Icon, label, tone, hint }) => {
          const t = TONE[tone];
          return (
            <button
              key={label}
              className={`group flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-r ${t.bg} px-3.5 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 ${t.glow}`}
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-black/40 ring-1 ${t.ring} ${t.text}`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{label}</p>
                {hint && (
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    {hint}
                  </p>
                )}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${t.text} opacity-0 transition group-hover:opacity-100`}
              >
                Run →
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
