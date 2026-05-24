import { Link, useLocation } from "@tanstack/react-router";
import {
  ShieldCheck, Layers, Network, Users, Briefcase, TrendingUp, Megaphone, Brain,
  Lock, FileSearch, ListChecks, CheckCircle2, Radar, AlertTriangle,
  Wallet, Boxes, Siren, FileBarChart, Map, FileText, GitBranch,
} from "lucide-react";

const ITEMS = [
  { to: "/v23/overview",      label: "V23 Overview",          icon: ShieldCheck },
  { to: "/v23/scope",         label: "Scope",                 icon: Layers },
  { to: "/v23/operating",     label: "Operating Network",     icon: Network },
  { to: "/v23/customer",      label: "Customer Intel",        icon: Users },
  { to: "/v23/partner",       label: "Partner Intel",         icon: GitBranch },
  { to: "/v23/board",         label: "Board Assurance",       icon: Brain },
  { to: "/v23/revenue",       label: "Revenue Auto",          icon: TrendingUp },
  { to: "/v23/mp",            label: "MP Auto Gov",           icon: Megaphone },
  { to: "/v23/exec",          label: "Exec Command",          icon: Briefcase },
  { to: "/v23/evidence",      label: "Evidence Network",      icon: Lock },
  { to: "/v23/cust-boundary", label: "Cust Boundary",         icon: ShieldCheck },
  { to: "/v23/part-boundary", label: "Partner Boundary",      icon: ShieldCheck },
  { to: "/v23/approval",      label: "Approval Gov",          icon: ListChecks },
  { to: "/v23/rec",           label: "Rec Gov",               icon: CheckCircle2 },
  { to: "/v23/outcome",       label: "Outcome Intel",         icon: Radar },
  { to: "/v23/audit",         label: "Audit Network",         icon: FileSearch },
  { to: "/v23/risk",          label: "Risk Intel",            icon: AlertTriangle },
  { to: "/v23/capital",       label: "Capital Readiness",     icon: Wallet },
  { to: "/v23/products",      label: "Product Intel",         icon: Boxes },
  { to: "/v23/category",      label: "Category Leadership",   icon: Megaphone },
  { to: "/v23/exception",     label: "Exception Mgmt",        icon: Siren },
  { to: "/v23/board-report",  label: "Board Report",          icon: FileBarChart },
  { to: "/v23/roadmap",       label: "Roadmap",               icon: Map },
  { to: "/v23/reports",       label: "Reports",               icon: FileText },
  { to: "/v23/demo",          label: "Demo Flow",             icon: ListChecks },
];

export function V23Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 59 V23 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-200"
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
