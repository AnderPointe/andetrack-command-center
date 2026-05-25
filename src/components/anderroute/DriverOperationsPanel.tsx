import {
  Phone,
  MessageSquare,
  Repeat,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  FileText,
  type LucideIcon,
} from "lucide-react";
import type { Driver } from "@/types/anderroute";

interface Action {
  icon: LucideIcon;
  label: string;
  tone: "teal" | "orange" | "rose" | "emerald" | "slate";
  hint?: string;
  onClick?: () => void;
}

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

interface DriverOperationsPanelProps {
  driver?: Pick<Driver, "id" | "name" | "phone" | "status"> | null;
  onAction?: (actionId: string) => void;
}

export function DriverOperationsPanel({ driver, onAction }: DriverOperationsPanelProps) {
  const isOffline = driver?.status === "offline";

  const actions: Action[] = [
    { icon: Phone, label: "Call Driver", tone: "teal", hint: driver?.phone ?? "Direct line",
      onClick: () => onAction?.("call") },
    { icon: MessageSquare, label: "Message Driver", tone: "teal", hint: "Push to cab",
      onClick: () => onAction?.("message") },
    { icon: Navigation, label: "Ping Location", tone: "teal", hint: "Force GPS refresh",
      onClick: () => onAction?.("ping") },
    { icon: Clock, label: "Update ETA", tone: "orange", hint: "Recalculate route",
      onClick: () => onAction?.("eta") },
    { icon: Repeat, label: "Reassign Load", tone: "orange", hint: "Transfer shipment",
      onClick: () => onAction?.("reassign") },
    { icon: FileText, label: "Request Documents", tone: "slate", hint: "BOL / POD upload",
      onClick: () => onAction?.("docs") },
    { icon: AlertTriangle, label: "Report Issue", tone: "rose", hint: "Flag dispatcher",
      onClick: () => onAction?.("issue") },
    { icon: CheckCircle2, label: "Mark Delivered", tone: "emerald", hint: "Close shipment",
      onClick: () => onAction?.("delivered") },
  ];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#0f172a] p-5 shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2dd4bf]">
          Operations
        </p>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            isOffline
              ? "bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30"
              : "bg-[#14b8a6]/15 text-[#2dd4bf] ring-1 ring-[#14b8a6]/30"
          }`}
        >
          {isOffline ? "Offline" : "Live"}
        </span>
      </div>
      <h3 className="mt-1 text-base font-bold text-white">Dispatch Control</h3>
      {driver?.name && (
        <p className="mt-0.5 text-xs text-slate-400">
          Actions target <span className="text-white">{driver.name}</span>
        </p>
      )}

      <div className="mt-4 grid gap-2">
        {actions.map(({ icon: Icon, label, tone, hint, onClick }) => {
          const t = TONE[tone];
          return (
            <button
              key={label}
              onClick={onClick}
              disabled={isOffline && tone !== "slate"}
              className={`group flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-r ${t.bg} px-3.5 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 ${t.glow} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none`}
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-black/40 ring-1 ${t.ring} ${t.text}`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{label}</p>
                {hint && (
                  <p className="truncate text-[10px] uppercase tracking-wider text-slate-500">
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

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Quick Status
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-white/5 px-2 py-2">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">HOS</p>
            <p className="mt-0.5 text-sm font-bold text-white">7h 12m</p>
          </div>
          <div className="rounded-xl bg-white/5 px-2 py-2">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Fuel</p>
            <p className="mt-0.5 text-sm font-bold text-[#2dd4bf]">68%</p>
          </div>
          <div className="rounded-xl bg-white/5 px-2 py-2">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Score</p>
            <p className="mt-0.5 text-sm font-bold text-[#fb923c]">94</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DriverOperationsPanel;
