import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, ShieldCheck, Globe2, ClipboardList, Lock, Users, Activity,
  TrendingUp, Megaphone, Briefcase, Network, FileBarChart, AlertTriangle,
  Wallet, Map, ListChecks, BookOpen, Stamp, Command, CalendarClock,
} from "lucide-react";

const ITEMS = [
  { to: "/v13/overview",          label: "V13 Overview",            icon: Gauge },
  { to: "/v13/scope",             label: "Scope",                   icon: Layers },
  { to: "/v13/capital-readiness", label: "Capital Readiness",       icon: Command },
  { to: "/v13/revenue-intel",     label: "Revenue Intel Maturity",  icon: Globe2 },
  { to: "/v13/diligence",         label: "Commercial Diligence",    icon: ClipboardList },
  { to: "/v13/data-room",         label: "Data Room",               icon: Lock },
  { to: "/v13/investor-evidence", label: "Investor/Acquirer",       icon: BookOpen },
  { to: "/v13/revenue-quality",   label: "Revenue Quality Evid.",   icon: Activity },
  { to: "/v13/concentration",     label: "Concentration Gov.",      icon: Users },
  { to: "/v13/strategic-acct",    label: "Strategic Acct Value",    icon: Users },
  { to: "/v13/retention",         label: "Retention & Expansion",   icon: TrendingUp },
  { to: "/v13/marketplace",       label: "MP Economics Gov.",       icon: Megaphone },
  { to: "/v13/mp-unit-econ",      label: "MP Unit Economics",       icon: Megaphone },
  { to: "/v13/api-edi",           label: "API/EDI Maturity",        icon: Briefcase },
  { to: "/v13/partner-value",     label: "Partner Value Gov.",      icon: Network },
  { to: "/v13/forecast",          label: "Forecast Evidence",       icon: CalendarClock },
  { to: "/v13/growth-investment", label: "Growth Investment",       icon: Wallet },
  { to: "/v13/exec-value",        label: "Exec Value Creation",     icon: Stamp },
  { to: "/v13/board",             label: "Board Capital Gov.",      icon: FileBarChart },
  { to: "/v13/risk",              label: "Capital Risk Register",   icon: AlertTriangle },
  { to: "/v13/valuation",         label: "Valuation Drivers",       icon: ShieldCheck },
  { to: "/v13/roadmap",           label: "Capital Strategy",        icon: Map },
  { to: "/v13/reports",           label: "Reports",                 icon: FileBarChart },
  { to: "/v13/demo",              label: "Demo Flow",               icon: ListChecks },
];

export function V13Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 39 V13 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-indigo-400/50 bg-indigo-500/10 text-indigo-200"
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
