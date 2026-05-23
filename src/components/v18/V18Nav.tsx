import { Link, useLocation } from "@tanstack/react-router";
import {
  ShieldCheck, Layers, Gauge, Brain, FileBarChart, TrendingUp, Megaphone,
  Radar, ListChecks, Briefcase, Activity, Lock, FileSearch, AlertTriangle,
  CheckCircle2, Settings2, Wallet, Users, Network, Boxes, Map, FileText, Sparkles, ShieldAlert,
} from "lucide-react";

const ITEMS = [
  { to: "/v18/overview",        label: "V18 Overview",        icon: ShieldCheck },
  { to: "/v18/scope",           label: "Scope",               icon: Layers },
  { to: "/v18/command",         label: "Assist Scale Gov",    icon: Gauge },
  { to: "/v18/pred-ops",        label: "Predictive Ops",      icon: Sparkles },
  { to: "/v18/board-maturity",  label: "Board Maturity",      icon: Brain },
  { to: "/v18/revenue-auto",    label: "Revenue Auto",        icon: TrendingUp },
  { to: "/v18/mp-scale",        label: "MP Scale Controls",   icon: Megaphone },
  { to: "/v18/exec-assurance",  label: "Exec Assurance",      icon: Briefcase },
  { to: "/v18/evidence",        label: "Gov Evidence",        icon: Lock },
  { to: "/v18/policy",          label: "Policy Enforcement",  icon: ShieldAlert },
  { to: "/v18/hitl-scale",      label: "HITL Scale",          icon: ListChecks },
  { to: "/v18/rec-qa",          label: "Rec QA",              icon: CheckCircle2 },
  { to: "/v18/outcomes",        label: "Outcome Gov",         icon: Radar },
  { to: "/v18/approval-rel",    label: "Approval Reliability", icon: Activity },
  { to: "/v18/risk-gov",        label: "Risk Governance",     icon: AlertTriangle },
  { to: "/v18/capital",         label: "Capital Controls",    icon: Wallet },
  { to: "/v18/accounts",        label: "Account Controls",    icon: Users },
  { to: "/v18/partners",        label: "Partner Controls",    icon: Network },
  { to: "/v18/products",        label: "Product Controls",    icon: Boxes },
  { to: "/v18/category",        label: "Category Controls",   icon: Megaphone },
  { to: "/v18/audit",           label: "Control Audit",       icon: Settings2 },
  { to: "/v18/board-report",    label: "Board Scale Report",  icon: FileBarChart },
  { to: "/v18/roadmap",         label: "Roadmap",             icon: Map },
  { to: "/v18/reports",         label: "Reports",             icon: FileText },
  { to: "/v18/demo",            label: "Demo Flow",           icon: ListChecks },
];

export function V18Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 49 V18 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
