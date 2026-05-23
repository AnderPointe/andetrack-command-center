import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, Command, Wallet, TrendingUp, Megaphone, Radar,
  Brain, Lightbulb, Star, Briefcase, FileBarChart, Users, Network,
  Boxes, Lock, Stamp, AlertTriangle, ShieldCheck, Map, ListChecks,
} from "lucide-react";

const ITEMS = [
  { to: "/v15/overview",        label: "V15 Overview",         icon: Gauge },
  { to: "/v15/scope",           label: "Scope",                icon: Layers },
  { to: "/v15/command",         label: "Performance Command",  icon: Command },
  { to: "/v15/capital",         label: "Capital Execution",    icon: Wallet },
  { to: "/v15/revenue",         label: "Durable Revenue",      icon: TrendingUp },
  { to: "/v15/mp-gov",          label: "MP Scale Gov",         icon: Megaphone },
  { to: "/v15/mp-intel",        label: "MP Scale Intel",       icon: Radar },
  { to: "/v15/intel",           label: "Operating Intel",      icon: Brain },
  { to: "/v15/recommendations", label: "Recommendations",      icon: Lightbulb },
  { to: "/v15/category",        label: "Category OS",          icon: Star },
  { to: "/v15/exec",            label: "Exec Control",         icon: Briefcase },
  { to: "/v15/board-intel",     label: "Board Intel",          icon: FileBarChart },
  { to: "/v15/accounts",        label: "Strategic Accounts",   icon: Users },
  { to: "/v15/partners",        label: "Partner Performance",  icon: Network },
  { to: "/v15/product-lines",   label: "Product Performance",  icon: Boxes },
  { to: "/v15/cap-evidence",    label: "Capital Evidence",     icon: Lock },
  { to: "/v15/diligence",       label: "Commercial Diligence", icon: Stamp },
  { to: "/v15/risk",            label: "Strategic Risk",       icon: AlertTriangle },
  { to: "/v15/controls",        label: "Performance Controls", icon: ShieldCheck },
  { to: "/v15/roadmap",         label: "LT Roadmap",           icon: Map },
  { to: "/v15/board-reports",   label: "Board Reports",        icon: FileBarChart },
  { to: "/v15/reports",         label: "Reports",              icon: ShieldCheck },
  { to: "/v15/demo",            label: "Demo Flow",            icon: ListChecks },
];

export function V15Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 43 V15 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
