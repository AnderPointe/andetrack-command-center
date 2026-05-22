import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, ShieldCheck, FileCheck2, Wallet, TrendingUp, Sparkles, Users,
  Crown, Star, ClipboardCheck, AlertTriangle, Bot, ServerCog, Database, Boxes,
  Plug, Repeat, Briefcase, Archive, FileBarChart, ListChecks, Award,
} from "lucide-react";

const ITEMS = [
  { to: "/v95/overview",        label: "V9.5 Overview",         icon: Gauge },
  { to: "/v95/scope",           label: "Scope",                 icon: Layers },
  { to: "/v95/stewardship",     label: "Stewardship",           icon: Crown },
  { to: "/v95/trust",           label: "Trust Command",         icon: ShieldCheck },
  { to: "/v95/evidence",        label: "Cert Evidence",         icon: Award },
  { to: "/v95/financial",       label: "Financial Gov",         icon: Wallet },
  { to: "/v95/mp-intel",        label: "MP Intelligence",       icon: TrendingUp },
  { to: "/v95/mp-quality",      label: "MP Quality",            icon: Sparkles },
  { to: "/v95/customer-trust",  label: "Customer Trust",        icon: Users },
  { to: "/v95/category",        label: "Category Leadership",   icon: Star },
  { to: "/v95/board",           label: "Board & Investor",      icon: FileCheck2 },
  { to: "/v95/value",           label: "Value Creation",        icon: TrendingUp },
  { to: "/v95/control-maturity",label: "Control Maturity",      icon: ClipboardCheck },
  { to: "/v95/risk",            label: "Strategic Risk",        icon: AlertTriangle },
  { to: "/v95/ai-gov",          label: "AI Governance",         icon: Bot },
  { to: "/v95/support",         label: "Support & Reliability", icon: ServerCog },
  { to: "/v95/data-gov",        label: "Data Governance",       icon: Database },
  { to: "/v95/durability",      label: "Product Durability",    icon: Boxes },
  { to: "/v95/partner-value",   label: "Partner Value",         icon: Plug },
  { to: "/v95/retention",       label: "Retention & Expansion", icon: Repeat },
  { to: "/v95/procurement",     label: "Procurement Trust",     icon: Briefcase },
  { to: "/v95/continuity",      label: "Legacy & Continuity",   icon: Archive },
  { to: "/v95/reports",         label: "V9.5 Reports",          icon: FileBarChart },
  { to: "/v95/demo",            label: "Demo Flow",             icon: ListChecks },
];

export function V95Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 32 V9.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
