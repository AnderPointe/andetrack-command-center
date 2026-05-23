import { Link, useLocation } from "@tanstack/react-router";
import {
  ShieldCheck, Layers, Gauge, Activity, Brain, TrendingUp, Megaphone,
  Briefcase, Settings2, ListChecks, CheckCircle2, Radar, Lock, AlertTriangle,
  Wallet, Users, Network, Boxes, FileSearch, FileBarChart, Map, FileText, Siren,
} from "lucide-react";

const ITEMS = [
  { to: "/v19/overview",        label: "V19 Overview",      icon: ShieldCheck },
  { to: "/v19/scope",           label: "Scope",             icon: Layers },
  { to: "/v19/os",              label: "Assurance OS",      icon: Gauge },
  { to: "/v19/resilience",      label: "Resilience",        icon: Activity },
  { to: "/v19/board-exec",      label: "Board Execution",   icon: Brain },
  { to: "/v19/revenue",         label: "Revenue Assurance", icon: TrendingUp },
  { to: "/v19/mp",              label: "MP Assurance",      icon: Megaphone },
  { to: "/v19/exec",            label: "Exec Command",      icon: Briefcase },
  { to: "/v19/evidence",        label: "Evidence",          icon: Lock },
  { to: "/v19/audit",           label: "Audit Execution",   icon: FileSearch },
  { to: "/v19/approval",        label: "Approval Maturity", icon: ListChecks },
  { to: "/v19/rec",             label: "Rec Maturity",      icon: CheckCircle2 },
  { to: "/v19/outcome",         label: "Outcome Maturity",  icon: Radar },
  { to: "/v19/risk",            label: "Risk Maturity",     icon: AlertTriangle },
  { to: "/v19/capital",         label: "Capital",           icon: Wallet },
  { to: "/v19/accounts",        label: "Accounts",          icon: Users },
  { to: "/v19/partners",        label: "Partners",          icon: Network },
  { to: "/v19/products",        label: "Products",          icon: Boxes },
  { to: "/v19/category",        label: "Category",          icon: Megaphone },
  { to: "/v19/exception",       label: "Exception Cmd",     icon: Siren },
  { to: "/v19/board-report",    label: "Board Report",      icon: FileBarChart },
  { to: "/v19/roadmap",         label: "Roadmap",           icon: Map },
  { to: "/v19/reports",         label: "Reports",           icon: FileText },
  { to: "/v19/demo",            label: "Demo Flow",         icon: ListChecks },
  { to: "/v19/settings",        label: "Settings",          icon: Settings2 },
];

export function V19Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 51 V19 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-violet-400/50 bg-violet-500/10 text-violet-200"
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
