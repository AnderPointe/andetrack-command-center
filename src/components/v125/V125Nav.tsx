import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, Command, ShieldCheck, Globe2, Users, TrendingUp, ClipboardList,
  AlertTriangle, Lock, Megaphone, Briefcase, Network, FileBarChart, BookOpen,
  CalendarClock, Map, ListChecks, Activity, Wallet, Stamp,
} from "lucide-react";

const ITEMS = [
  { to: "/v125/overview",        label: "V12.5 Overview",          icon: Gauge },
  { to: "/v125/scope",           label: "Scope",                   icon: Layers },
  { to: "/v125/growth-ops",      label: "Growth Operations",       icon: Command },
  { to: "/v125/auditability",    label: "Commercial Auditability", icon: ShieldCheck },
  { to: "/v125/revenue-intel",   label: "Revenue Intelligence",    icon: Globe2 },
  { to: "/v125/revenue-quality", label: "Revenue Quality Ctrl",    icon: Activity },
  { to: "/v125/evidence",        label: "Revenue Evidence",        icon: BookOpen },
  { to: "/v125/evidence-vault",  label: "Evidence Vault",          icon: BookOpen },
  { to: "/v125/pipeline-audit",  label: "Pipeline Audit",          icon: ClipboardList },
  { to: "/v125/deal-audit",      label: "Deal Audit",              icon: ClipboardList },
  { to: "/v125/expansion",       label: "Expansion Evidence",      icon: TrendingUp },
  { to: "/v125/strategic-acct",  label: "Strategic Accts",         icon: Users },
  { to: "/v125/partner-opt",     label: "Partner Optimization",    icon: Network },
  { to: "/v125/partner-gov",     label: "Partner Governance",      icon: Network },
  { to: "/v125/marketplace",     label: "MP Revenue Intel",        icon: Megaphone },
  { to: "/v125/api-edi",         label: "API/EDI Intel",           icon: Briefcase },
  { to: "/v125/steward",         label: "Exec Stewardship",        icon: Wallet },
  { to: "/v125/risk",            label: "Growth Risk Matrix",      icon: AlertTriangle },
  { to: "/v125/proof",           label: "Proof Control",           icon: Stamp },
  { to: "/v125/board",           label: "Board Growth Report",     icon: FileBarChart },
  { to: "/v125/data-room",       label: "Data Room Evidence",     icon: Lock },
  { to: "/v125/governance",      label: "Long-Term Governance",    icon: Map },
  { to: "/v125/reports",         label: "Reports",                 icon: FileBarChart },
  { to: "/v125/demo",            label: "Demo Flow",               icon: ListChecks },
];

export function V125Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 38 V12.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
