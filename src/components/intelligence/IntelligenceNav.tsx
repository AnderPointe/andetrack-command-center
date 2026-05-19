import { Link, useLocation } from "@tanstack/react-router";
import {
  Brain, ShieldAlert, Sparkles, BotMessageSquare, LineChart, Gauge,
  ClipboardList, Users, BellRing, ScrollText, Timer,
} from "lucide-react";

/** Phase 9 — AI Operations Intelligence sub-navigation. */
const ITEMS = [
  { to: "/intelligence/overview",        label: "Overview",         icon: Brain },
  { to: "/intelligence/risk",            label: "Predictive Risk",  icon: ShieldAlert },
  { to: "/intelligence/recommendations", label: "Recommendations",  icon: Sparkles },
  { to: "/intelligence/dispatch",        label: "Auto Dispatch",    icon: BotMessageSquare },
  { to: "/intelligence/eta-confidence",  label: "ETA Confidence",   icon: Timer },
  { to: "/intelligence/executive",       label: "Executive",        icon: LineChart },
  { to: "/intelligence/capacity",        label: "Capacity",         icon: Gauge },
  { to: "/intelligence/handoff",         label: "Shift Handoff",    icon: ClipboardList },
  { to: "/intelligence/customers",       label: "Customer Impact",  icon: Users },
  { to: "/intelligence/alerts",          label: "Smart Alerts",     icon: BellRing },
  { to: "/intelligence/governance",      label: "AI Governance",    icon: ScrollText },
] as const;

export function IntelligenceNav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="AI Operations Intelligence sections"
      className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin"
    >
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-violet-400/50 bg-violet-500/10 text-violet-200"
                : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
            }`}
          >
            <Icon className="size-3.5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
