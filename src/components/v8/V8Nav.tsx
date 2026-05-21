import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, Globe, Flag, MapPin, Truck, Activity, Compass,
  Receipt, Wallet, DollarSign, FileCheck2, ShieldCheck, Users, LifeBuoy,
  Plug, Crown, FileBarChart, AlertTriangle, BarChart3, Target, Building2, ListChecks,
} from "lucide-react";

const ITEMS = [
  { to: "/v8/overview",             label: "V8 Overview",            icon: Gauge },
  { to: "/v8/scope",                label: "Scope",                  icon: Layers },
  { to: "/v8/network-scale",        label: "Network Scale",          icon: Globe },
  { to: "/v8/country-command",      label: "Country Command",        icon: Flag },
  { to: "/v8/intl-marketplace",     label: "Intl Marketplace",       icon: MapPin },
  { to: "/v8/regional-liquidity",   label: "Regional Liquidity",     icon: Activity },
  { to: "/v8/carrier-ops",          label: "Carrier Ops",            icon: Truck },
  { to: "/v8/cross-border",         label: "Cross-Border",           icon: Compass },
  { to: "/v8/financial-maturity",   label: "Financial Maturity",     icon: Receipt },
  { to: "/v8/revenue-recon",        label: "Revenue Recon",          icon: Wallet },
  { to: "/v8/billing-controls",     label: "Billing Controls",       icon: DollarSign },
  { to: "/v8/compliance",           label: "Compliance Execution",   icon: FileCheck2 },
  { to: "/v8/country-compliance",   label: "Country Compliance",     icon: ShieldCheck },
  { to: "/v8/customer-success",     label: "Customer Success",       icon: Users },
  { to: "/v8/support-ops",          label: "Intl Support",           icon: LifeBuoy },
  { to: "/v8/partner-ops",          label: "Partner Ops",            icon: Plug },
  { to: "/v8/governance",           label: "Strategic Governance",   icon: Crown },
  { to: "/v8/board-report",         label: "Board Report",           icon: FileBarChart },
  { to: "/v8/risk-control",         label: "Risk & Control",         icon: AlertTriangle },
  { to: "/v8/adoption",             label: "Product Adoption",       icon: BarChart3 },
  { to: "/v8/expansion-decision",   label: "Expansion Engine",       icon: Target },
  { to: "/v8/operating-model",      label: "Operating Model",        icon: Building2 },
  { to: "/v8/reports",              label: "V8 Reports",             icon: FileBarChart },
  { to: "/v8/demo",                 label: "Demo Flow",              icon: ListChecks },
];

export function V8Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 29 V8 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-violet-400/50 bg-violet-500/10 text-violet-200"
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
