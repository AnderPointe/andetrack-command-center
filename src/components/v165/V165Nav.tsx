import { Link, useLocation } from "@tanstack/react-router";
import {
  ShieldCheck, Layers, Gauge, Brain, FileBarChart, TrendingUp, Megaphone,
  Radar, ListChecks, Briefcase, Activity, Lock, FileSearch, AlertTriangle,
  CheckCircle2, Settings2, Wallet, Users, Network, Boxes, Map, FileText,
} from "lucide-react";

const ITEMS = [
  { to: "/v165/overview",         label: "V16.5 Overview",       icon: ShieldCheck },
  { to: "/v165/scope",            label: "Scope",                icon: Layers },
  { to: "/v165/command",          label: "Pred Gov Command",     icon: Gauge },
  { to: "/v165/board-os",         label: "AI Board OS",          icon: Brain },
  { to: "/v165/board-packet",     label: "Board Packet Intel",   icon: FileBarChart },
  { to: "/v165/revenue-auto",     label: "Revenue Automation",   icon: TrendingUp },
  { to: "/v165/revenue-gov",      label: "Revenue Auto Gov",     icon: Settings2 },
  { to: "/v165/mp-maturity",      label: "MP Intel Maturity",    icon: Radar },
  { to: "/v165/mp-gov",           label: "MP Auto Gov",          icon: Megaphone },
  { to: "/v165/approvals",        label: "Approval Orch",        icon: ListChecks },
  { to: "/v165/exec-routing",     label: "Exec Decision",        icon: Briefcase },
  { to: "/v165/control-monitor",  label: "Control Monitoring",   icon: Activity },
  { to: "/v165/evidence-auto",    label: "Evidence Automation",  icon: Lock },
  { to: "/v165/rec-evidence",     label: "Rec Evidence Auto",    icon: FileSearch },
  { to: "/v165/risk-routing",     label: "Risk Routing",         icon: AlertTriangle },
  { to: "/v165/automation-queue", label: "Human-Approved Queue", icon: CheckCircle2 },
  { to: "/v165/policy-tuning",    label: "Policy Tuning",        icon: Settings2 },
  { to: "/v165/capital-auto",     label: "Capital Auto Gov",     icon: Wallet },
  { to: "/v165/account-auto",     label: "Account Auto",         icon: Users },
  { to: "/v165/partner-auto",     label: "Partner Auto Gov",     icon: Network },
  { to: "/v165/product-auto",     label: "Product Auto Gov",     icon: Boxes },
  { to: "/v165/board-report",     label: "Board Pred Report",    icon: FileBarChart },
  { to: "/v165/roadmap",          label: "Roadmap",              icon: Map },
  { to: "/v165/reports",          label: "Reports",              icon: FileText },
  { to: "/v165/demo",             label: "Demo Flow",            icon: ListChecks },
];

export function V165Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 46 V16.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
