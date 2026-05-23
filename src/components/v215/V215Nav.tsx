import { Link, useLocation } from "@tanstack/react-router";
import {
  ShieldCheck, Layers, Network, Users, Briefcase, TrendingUp, Megaphone, Brain,
  Lock, FileSearch, ListChecks, CheckCircle2, Radar, AlertTriangle,
  Wallet, Boxes, Siren, FileBarChart, Map, FileText, GitBranch,
} from "lucide-react";

const ITEMS = [
  { to: "/v215/overview",     label: "V21.5 Overview",     icon: ShieldCheck },
  { to: "/v215/scope",        label: "Scope",              icon: Layers },
  { to: "/v215/scale",        label: "Network Scale",      icon: Network },
  { to: "/v215/customer",     label: "Customer Lifecycle", icon: Users },
  { to: "/v215/partner",      label: "Partner Lifecycle",  icon: GitBranch },
  { to: "/v215/board",        label: "Board Maturity",     icon: Brain },
  { to: "/v215/revenue",      label: "Revenue Optim.",     icon: TrendingUp },
  { to: "/v215/mp",           label: "MP Governance",      icon: Megaphone },
  { to: "/v215/exec",         label: "Exec Command",       icon: Briefcase },
  { to: "/v215/evidence",     label: "Evidence Lifecycle", icon: Lock },
  { to: "/v215/cust-boundary",label: "Cust Boundary",      icon: ShieldCheck },
  { to: "/v215/part-boundary",label: "Partner Boundary",   icon: ShieldCheck },
  { to: "/v215/risk",         label: "Risk Network",       icon: AlertTriangle },
  { to: "/v215/audit",        label: "Audit Maturity",     icon: FileSearch },
  { to: "/v215/approval",     label: "Approval Lifecycle", icon: ListChecks },
  { to: "/v215/rec",          label: "Rec Lifecycle",      icon: CheckCircle2 },
  { to: "/v215/outcome",      label: "Outcome Lifecycle",  icon: Radar },
  { to: "/v215/capital",      label: "Capital Readiness",  icon: Wallet },
  { to: "/v215/products",     label: "Product Lifecycle",  icon: Boxes },
  { to: "/v215/category",     label: "Category Leadership",icon: Megaphone },
  { to: "/v215/exception",    label: "Exception Lifecycle",icon: Siren },
  { to: "/v215/board-report", label: "Board Report",       icon: FileBarChart },
  { to: "/v215/roadmap",      label: "Roadmap",            icon: Map },
  { to: "/v215/reports",      label: "Reports",            icon: FileText },
  { to: "/v215/demo",         label: "Demo Flow",          icon: ListChecks },
];

export function V215Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 56 V21.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
