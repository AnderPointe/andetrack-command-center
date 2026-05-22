import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, Command, ShieldCheck, Globe2, Users, TrendingUp, ClipboardList,
  AlertTriangle, RefreshCcw, Lock, Megaphone, Briefcase, Network, FileBarChart,
  BookOpen, CalendarClock, Map, ListChecks, Wallet, Activity,
} from "lucide-react";

const ITEMS = [
  { to: "/v12/overview",         label: "V12 Overview",            icon: Gauge },
  { to: "/v12/scope",            label: "Scope",                   icon: Layers },
  { to: "/v12/command",          label: "Commercial Command",      icon: Command },
  { to: "/v12/revenue-quality",  label: "Revenue Quality Gov.",    icon: ShieldCheck },
  { to: "/v12/global-expansion", label: "Global Expansion",        icon: Globe2 },
  { to: "/v12/strategic-acct",   label: "Strategic Accounts",      icon: Users },
  { to: "/v12/growth",           label: "Growth Discipline",       icon: TrendingUp },
  { to: "/v12/deal-execution",   label: "Deal Execution",          icon: ClipboardList },
  { to: "/v12/risk",             label: "Commercial Risk",         icon: AlertTriangle },
  { to: "/v12/retention",        label: "Expansion & Retention",   icon: RefreshCcw },
  { to: "/v12/procurement",      label: "Trust-Led Procurement",   icon: Lock },
  { to: "/v12/marketplace",      label: "MP Revenue Gov.",         icon: Megaphone },
  { to: "/v12/api-edi",          label: "API/EDI Revenue Gov.",    icon: Briefcase },
  { to: "/v12/partner-channel",  label: "Partner Channel",         icon: Network },
  { to: "/v12/partner-revenue",  label: "Partner Revenue Gov.",    icon: Wallet },
  { to: "/v12/forecast",         label: "Forecast Gov.",           icon: Activity },
  { to: "/v12/capital",          label: "Capital-Grade Report",    icon: FileBarChart },
  { to: "/v12/board",            label: "Board-Ready Revenue",     icon: FileBarChart },
  { to: "/v12/data-room",        label: "Data Room",               icon: BookOpen },
  { to: "/v12/proof",            label: "Proof Governance",        icon: BookOpen },
  { to: "/v12/cadence",          label: "Commercial Cadence",      icon: CalendarClock },
  { to: "/v12/operating-model",  label: "Operating Model",         icon: Map },
  { to: "/v12/reports",          label: "Reports",                 icon: FileBarChart },
  { to: "/v12/demo",             label: "Demo Flow",               icon: ListChecks },
];

export function V12Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 37 V12 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-200"
                : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
            }`}>
            <Icon className="size-3.5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
