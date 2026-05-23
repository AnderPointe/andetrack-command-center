import { Link, useLocation } from "@tanstack/react-router";
import {
  ShieldCheck, Layers, Network, Users, Briefcase, TrendingUp, Megaphone, Brain,
  Lock, FileSearch, ListChecks, CheckCircle2, Radar, AlertTriangle,
  Wallet, Boxes, Siren, FileBarChart, Map, FileText, GitBranch,
} from "lucide-react";

const ITEMS = [
  { to: "/v22/overview",      label: "V22 Overview",        icon: ShieldCheck },
  { to: "/v22/scope",         label: "Scope",               icon: Layers },
  { to: "/v22/operating",     label: "Operating System",    icon: Network },
  { to: "/v22/customer",      label: "Customer Automation", icon: Users },
  { to: "/v22/partner",       label: "Partner Automation",  icon: GitBranch },
  { to: "/v22/board",         label: "Board Execution",     icon: Brain },
  { to: "/v22/revenue",       label: "Revenue Lifecycle",   icon: TrendingUp },
  { to: "/v22/mp",            label: "MP Lifecycle",        icon: Megaphone },
  { to: "/v22/exec",          label: "Exec Command",        icon: Briefcase },
  { to: "/v22/evidence",      label: "Evidence Lifecycle",  icon: Lock },
  { to: "/v22/cust-boundary", label: "Cust Boundary",       icon: ShieldCheck },
  { to: "/v22/part-boundary", label: "Partner Boundary",    icon: ShieldCheck },
  { to: "/v22/approval",      label: "Approval Lifecycle",  icon: ListChecks },
  { to: "/v22/rec",           label: "Rec Lifecycle",       icon: CheckCircle2 },
  { to: "/v22/outcome",       label: "Outcome Lifecycle",   icon: Radar },
  { to: "/v22/audit",         label: "Audit Lifecycle",     icon: FileSearch },
  { to: "/v22/risk",          label: "Risk Lifecycle",      icon: AlertTriangle },
  { to: "/v22/capital",       label: "Capital Lifecycle",   icon: Wallet },
  { to: "/v22/products",      label: "Product Lifecycle",   icon: Boxes },
  { to: "/v22/category",      label: "Category Lifecycle",  icon: Megaphone },
  { to: "/v22/exception",     label: "Exception Mgmt",      icon: Siren },
  { to: "/v22/board-report",  label: "Board Report",        icon: FileBarChart },
  { to: "/v22/roadmap",       label: "Roadmap",             icon: Map },
  { to: "/v22/reports",       label: "Reports",             icon: FileText },
  { to: "/v22/demo",          label: "Demo Flow",           icon: ListChecks },
];

export function V22Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 57 V22 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
