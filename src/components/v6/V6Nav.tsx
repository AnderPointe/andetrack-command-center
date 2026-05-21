import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, Crown, Network, Map, Workflow, ShieldCheck, Brain, Store, DollarSign,
  Boxes, Trophy, FolderArchive, Briefcase, AlertTriangle, Activity, FileCheck2, Lock,
  TrendingUp, Users, Shield, BookOpen, FileBarChart, ListChecks,
} from "lucide-react";

const ITEMS = [
  { to: "/v6/overview",         label: "V6 Overview",          icon: Gauge },
  { to: "/v6/scope",            label: "Scope",                icon: Layers },
  { to: "/v6/category",         label: "Category Platform",    icon: Crown },
  { to: "/v6/network",          label: "Logistics Network",    icon: Network },
  { to: "/v6/network-ops",      label: "Network Ops Intel",    icon: Map },
  { to: "/v6/automation-gov",   label: "Automation Gov",       icon: Workflow },
  { to: "/v6/automation-tower", label: "Automation Tower",     icon: ShieldCheck },
  { to: "/v6/ai-gov",           label: "AI Governance",        icon: Brain },
  { to: "/v6/liquidity",        label: "Liquidity Intel",      icon: Store },
  { to: "/v6/economics",        label: "Platform Economics",   icon: DollarSign },
  { to: "/v6/ecosystem",        label: "Ecosystem Scale",      icon: Boxes },
  { to: "/v6/exit-readiness",   label: "Exit/IPO Readiness",   icon: Trophy },
  { to: "/v6/data-room",        label: "Data Room",            icon: FolderArchive },
  { to: "/v6/board",            label: "Board OS",             icon: Briefcase },
  { to: "/v6/risks",            label: "Strategic Risks",      icon: AlertTriangle },
  { to: "/v6/roadmap",          label: "Roadmap Gov",          icon: Map },
  { to: "/v6/reliability",      label: "Reliability",          icon: Activity },
  { to: "/v6/evidence",         label: "Cert Evidence",        icon: FileCheck2 },
  { to: "/v6/security-model",   label: "Security Model",       icon: Lock },
  { to: "/v6/revenue-quality",  label: "Revenue Quality",      icon: TrendingUp },
  { to: "/v6/ecosystem-mat",    label: "Cust/Partner Mat.",    icon: Users },
  { to: "/v6/defensibility",    label: "Defensibility",        icon: Shield },
  { to: "/v6/narrative",        label: "Narrative + Edu",      icon: BookOpen },
  { to: "/v6/reports",          label: "V6 Reports",           icon: FileBarChart },
  { to: "/v6/demo",             label: "Demo Flow",            icon: ListChecks },
];

export function V6Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 25 V6 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
