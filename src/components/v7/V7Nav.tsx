import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, Globe, Compass, Map, Database, Truck, Shield, FileCheck2, Bot,
  Activity, ShieldAlert, Wallet, Receipt, DollarSign, Plug, Boxes, Users, LifeBuoy,
  Crown, AlertTriangle, Route as RouteIcon, FileBarChart, ListChecks,
} from "lucide-react";

const ITEMS = [
  { to: "/v7/overview",                label: "V7 Overview",         icon: Gauge },
  { to: "/v7/scope",                   label: "Scope",               icon: Layers },
  { to: "/v7/network",                 label: "Global Network",      icon: Globe },
  { to: "/v7/readiness",               label: "Readiness Score",     icon: Compass },
  { to: "/v7/country-matrix",          label: "Country Matrix",      icon: Map },
  { to: "/v7/data-residency",          label: "Data Residency",     icon: Database },
  { to: "/v7/cross-border",            label: "Cross-Border",        icon: Truck },
  { to: "/v7/regulated-controls",      label: "Regulated Controls",  icon: Shield },
  { to: "/v7/compliance-matrix",       label: "Compliance Matrix",   icon: FileCheck2 },
  { to: "/v7/ai-gov",                  label: "Regulated AI Gov",    icon: Bot },
  { to: "/v7/marketplace-intel",       label: "Marketplace Intel",   icon: Activity },
  { to: "/v7/trust-safety",            label: "Trust + Safety",      icon: ShieldAlert },
  { to: "/v7/financial-maturity",      label: "Financial Maturity",  icon: Wallet },
  { to: "/v7/audit-readiness",         label: "Audit Readiness",     icon: Receipt },
  { to: "/v7/revenue-ops",             label: "Global Revenue",      icon: DollarSign },
  { to: "/v7/partner-ecosystem",       label: "Partner Ecosystem",   icon: Plug },
  { to: "/v7/intl-marketplace",        label: "Intl Marketplace",    icon: Boxes },
  { to: "/v7/enterprise-customers",    label: "Ent Customers",       icon: Users },
  { to: "/v7/support-model",           label: "Support Model",       icon: LifeBuoy },
  { to: "/v7/exec-dashboard",          label: "Exec Dashboard",      icon: Crown },
  { to: "/v7/risk-register",           label: "Risk Register",       icon: AlertTriangle },
  { to: "/v7/roadmap",                 label: "Expansion Roadmap",   icon: RouteIcon },
  { to: "/v7/reports",                 label: "V7 Reports",          icon: FileBarChart },
  { to: "/v7/demo",                    label: "Demo Flow",           icon: ListChecks },
];

export function V7Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 27 V7 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-indigo-400/50 bg-indigo-500/10 text-indigo-200"
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
