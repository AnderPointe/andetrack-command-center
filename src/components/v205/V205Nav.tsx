import { Link, useLocation } from "@tanstack/react-router";
import {
  ShieldCheck, Layers, Gauge, Brain, TrendingUp, Megaphone, Users, Network,
  Briefcase, Lock, FileSearch, Settings2, ListChecks, CheckCircle2, Radar,
  AlertTriangle, Wallet, Boxes, Siren, FileBarChart, Map, FileText,
} from "lucide-react";

const ITEMS = [
  { to: "/v205/overview",     label: "V20.5 Overview",   icon: ShieldCheck },
  { to: "/v205/scope",        label: "Scope",            icon: Layers },
  { to: "/v205/scale",        label: "Trust Scale Cmd",  icon: Gauge },
  { to: "/v205/board",        label: "Board Assurance",  icon: Brain },
  { to: "/v205/revenue",      label: "Revenue Opt",      icon: TrendingUp },
  { to: "/v205/mp",           label: "MP Governance",    icon: Megaphone },
  { to: "/v205/customer",     label: "Customer Trust",   icon: Users },
  { to: "/v205/partner",      label: "Partner Trust",    icon: Network },
  { to: "/v205/exec",         label: "Exec Assurance",   icon: Briefcase },
  { to: "/v205/evidence",     label: "Evidence Scale",   icon: Lock },
  { to: "/v205/audit",        label: "Audit Maturity",   icon: FileSearch },
  { to: "/v205/control",      label: "Control Scale",    icon: Settings2 },
  { to: "/v205/approval",     label: "Approval Scale",   icon: ListChecks },
  { to: "/v205/rec",          label: "Rec Quality",      icon: CheckCircle2 },
  { to: "/v205/outcome",      label: "Outcome Mat",      icon: Radar },
  { to: "/v205/risk",         label: "Predictive Risk",  icon: AlertTriangle },
  { to: "/v205/capital",      label: "Capital Trust",    icon: Wallet },
  { to: "/v205/products",     label: "Product Scale",    icon: Boxes },
  { to: "/v205/category",     label: "Category Mat",     icon: Megaphone },
  { to: "/v205/exception",    label: "Exception Mgmt",   icon: Siren },
  { to: "/v205/board-report", label: "Board Report",     icon: FileBarChart },
  { to: "/v205/roadmap",      label: "Roadmap",          icon: Map },
  { to: "/v205/reports",      label: "Reports",          icon: FileText },
  { to: "/v205/demo",         label: "Demo Flow",        icon: ListChecks },
];

export function V205Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 54 V20.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-teal-400/50 bg-teal-500/10 text-teal-200"
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
