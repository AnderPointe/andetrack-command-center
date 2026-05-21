import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, Activity, Store, Scale, Map, ShieldAlert, Award, Handshake,
  FileCheck2, Crown, Swords, DollarSign, HeartPulse, Headphones, BookCheck,
  Rocket, Network, BarChart3, Globe2, FolderArchive, FileBarChart, ListChecks,
} from "lucide-react";

const ITEMS = [
  { to: "/v5/overview",            label: "V5 Overview",        icon: Gauge },
  { to: "/v5/scope",               label: "Scope",              icon: Layers },
  { to: "/v5/maturity",            label: "Platform Maturity",  icon: Activity },
  { to: "/v5/liquidity",           label: "MP Liquidity",       icon: Store },
  { to: "/v5/supply-demand",       label: "Supply/Demand",      icon: Scale },
  { to: "/v5/lane-coverage",       label: "Lane Coverage",      icon: Map },
  { to: "/v5/trust-safety",        label: "Trust & Safety",     icon: ShieldAlert },
  { to: "/v5/carrier-quality",     label: "Carrier Quality",    icon: Award },
  { to: "/v5/partnerships",        label: "Partnerships",       icon: Handshake },
  { to: "/v5/certification",       label: "Certification",      icon: FileCheck2 },
  { to: "/v5/soc2",                label: "SOC 2",              icon: FileCheck2 },
  { to: "/v5/board",               label: "Board Reporting",    icon: Crown },
  { to: "/v5/category",            label: "Category Leadership", icon: Crown },
  { to: "/v5/competitive",         label: "Competitive Intel",  icon: Swords },
  { to: "/v5/revenue-ops",         label: "Revenue Ops",        icon: DollarSign },
  { to: "/v5/customer-success",    label: "Customer Success",   icon: HeartPulse },
  { to: "/v5/support",             label: "Support",            icon: Headphones },
  { to: "/v5/governance",          label: "Governance",         icon: BookCheck },
  { to: "/v5/growth",              label: "Growth Planning",    icon: Rocket },
  { to: "/v5/partner-ecosystem",   label: "Partner Ecosystem",  icon: Network },
  { to: "/v5/operating-metrics",   label: "Operating Metrics",  icon: BarChart3 },
  { to: "/v5/national-ops",        label: "National Ops",       icon: Globe2 },
  { to: "/v5/data-room",           label: "Data Room",          icon: FolderArchive },
  { to: "/v5/reports",             label: "V5 Reports",         icon: FileBarChart },
  { to: "/v5/demo",                label: "Demo Flow",          icon: ListChecks },
];

export function V5Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 23 V5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-fuchsia-400/50 bg-fuchsia-500/10 text-fuchsia-200"
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
