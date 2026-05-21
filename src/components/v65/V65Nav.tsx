import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, Briefcase, Wallet, Receipt, FileSpreadsheet, Store, Plug, Globe,
  Languages, FileCheck2, Boxes, PackagePlus, DollarSign, Crown, Vote, TrendingUp,
  Activity, ShieldAlert, ArchiveRestore, Scale, Lock, ListChecks, FileBarChart, Map,
} from "lucide-react";

const ITEMS = [
  { to: "/v65/overview",              label: "V6.5 Overview",        icon: Gauge },
  { to: "/v65/scope",                 label: "Scope",                icon: Layers },
  { to: "/v65/platform-os",           label: "Platform OS",          icon: Briefcase },
  { to: "/v65/financial-controls",    label: "Financial Controls",   icon: Wallet },
  { to: "/v65/billing",               label: "Billing Controls",     icon: Receipt },
  { to: "/v65/revenue-rec",           label: "Rev Recognition",      icon: FileSpreadsheet },
  { to: "/v65/mkt-financial",         label: "Mkt Financial",        icon: Store },
  { to: "/v65/api-billing",           label: "API/Partner Billing",  icon: Plug },
  { to: "/v65/global",                label: "Global Expansion",     icon: Globe },
  { to: "/v65/i18n",                  label: "i18n Planning",        icon: Languages },
  { to: "/v65/regional-compliance",   label: "Regional Compliance",  icon: FileCheck2 },
  { to: "/v65/partner-marketplace",   label: "Partner Marketplace",  icon: Boxes },
  { to: "/v65/partner-products",      label: "Partner Products",     icon: PackagePlus },
  { to: "/v65/partner-revshare",      label: "Partner Rev Share",    icon: DollarSign },
  { to: "/v65/governance",            label: "Governance",           icon: Crown },
  { to: "/v65/decisions",             label: "Exec Decisions",       icon: Vote },
  { to: "/v65/product-lines",         label: "Product-Line Inv.",    icon: TrendingUp },
  { to: "/v65/economics",             label: "Platform Economics",   icon: Activity },
  { to: "/v65/risk-matrix",           label: "Risk + Controls",      icon: ShieldAlert },
  { to: "/v65/audit-evidence",        label: "Audit Evidence",       icon: ArchiveRestore },
  { to: "/v65/compliance-ops",        label: "Compliance Ops",       icon: Scale },
  { to: "/v65/mkt-controls",          label: "Marketplace Controls", icon: Lock },
  { to: "/v65/operating-model",       label: "Operating Model",      icon: Map },
  { to: "/v65/reports",               label: "V6.5 Reports",         icon: FileBarChart },
  { to: "/v65/demo",                  label: "Demo Flow",            icon: ListChecks },
];

export function V65Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 26 V6.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
