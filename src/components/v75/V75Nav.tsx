import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, Globe, Flag, PlayCircle, ShieldCheck, FileText, Receipt,
  Wallet, DollarSign, Plug, Award, Activity, MapPin, Database, Truck,
  LifeBuoy, FileCheck2, AlertTriangle, Crown, CalendarClock, Users, FileBarChart, ListChecks,
} from "lucide-react";

const ITEMS = [
  { to: "/v75/overview",            label: "V7.5 Overview",          icon: Gauge },
  { to: "/v75/scope",               label: "Scope",                  icon: Layers },
  { to: "/v75/expansion",           label: "Expansion Execution",    icon: Globe },
  { to: "/v75/country-launch",      label: "Country Launch",         icon: Flag },
  { to: "/v75/country-pilot",       label: "Controlled Pilot",       icon: PlayCircle },
  { to: "/v75/regulated-onboarding", label: "Regulated Onboarding",  icon: ShieldCheck },
  { to: "/v75/control-pack",        label: "Control Pack",           icon: FileText },
  { to: "/v75/financial-audit",     label: "Financial Audit",        icon: Receipt },
  { to: "/v75/revenue-recon",       label: "Revenue Recon",          icon: Wallet },
  { to: "/v75/global-revenue",      label: "Global Revenue",         icon: DollarSign },
  { to: "/v75/partner-launch",      label: "Partner Launch",         icon: Plug },
  { to: "/v75/partner-cert",        label: "Partner Certification",  icon: Award },
  { to: "/v75/marketplace-discipline", label: "Marketplace Discipline", icon: Activity },
  { to: "/v75/regional-mkt",        label: "Regional Marketplace",   icon: MapPin },
  { to: "/v75/data-residency",      label: "Data Residency",         icon: Database },
  { to: "/v75/cross-border",        label: "Cross-Border",           icon: Truck },
  { to: "/v75/support",             label: "Support Readiness",      icon: LifeBuoy },
  { to: "/v75/compliance",          label: "Compliance Execution",   icon: FileCheck2 },
  { to: "/v75/regional-risk",       label: "Regional Risk",          icon: AlertTriangle },
  { to: "/v75/launch-governance",   label: "Launch Governance",      icon: Crown },
  { to: "/v75/cadence",             label: "Operating Cadence",      icon: CalendarClock },
  { to: "/v75/intl-customers",      label: "Intl Customer Success",  icon: Users },
  { to: "/v75/reports",             label: "V7.5 Reports",           icon: FileBarChart },
  { to: "/v75/demo",                label: "Demo Flow",              icon: ListChecks },
];

export function V75Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 28 V7.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
