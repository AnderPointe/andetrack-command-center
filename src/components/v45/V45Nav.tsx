import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, Bot, ShieldCheck, Store, BookOpen, Award, AlertTriangle,
  FileCheck2, Smartphone, Car, Apple, Handshake, Briefcase, FileText,
  Users2, HeartPulse, Headphones, BrainCircuit, DollarSign, Network,
  Map, Activity, FileBarChart, ListChecks,
} from "lucide-react";

const ITEMS = [
  { to: "/v45/overview",                label: "V4.5 Overview",        icon: Gauge },
  { to: "/v45/scope",                   label: "Scope",                icon: Layers },
  { to: "/v45/automation",              label: "Automation Maturity",  icon: Bot },
  { to: "/v45/approvals",               label: "Approval Center",      icon: ShieldCheck },
  { to: "/v45/marketplace-ops",         label: "Marketplace Ops",      icon: Store },
  { to: "/v45/playbooks-marketplace",   label: "MP Playbooks",         icon: BookOpen },
  { to: "/v45/carrier-quality",         label: "Carrier Quality",      icon: Award },
  { to: "/v45/disputes",                label: "Disputes",             icon: AlertTriangle },
  { to: "/v45/certification",           label: "Certification Exec",   icon: FileCheck2 },
  { to: "/v45/soc2",                    label: "SOC 2 Tracker",        icon: FileCheck2 },
  { to: "/v45/mobile-launch",           label: "Mobile Launch",        icon: Smartphone },
  { to: "/v45/android-auto",            label: "Android Auto",         icon: Car },
  { to: "/v45/carplay",                 label: "CarPlay",              icon: Apple },
  { to: "/v45/partnerships",            label: "Partnerships",         icon: Handshake },
  { to: "/v45/acquisition",             label: "Acquisition",          icon: Briefcase },
  { to: "/v45/procurement",             label: "Procurement Packet",   icon: FileText },
  { to: "/v45/enterprise-customers",    label: "Enterprise Customers", icon: Users2 },
  { to: "/v45/customer-success",        label: "Customer Success",     icon: HeartPulse },
  { to: "/v45/support",                 label: "Support Maturity",     icon: Headphones },
  { to: "/v45/ai-governance",           label: "AI Governance",        icon: BrainCircuit },
  { to: "/v45/revenue-ops",             label: "Revenue Ops",          icon: DollarSign },
  { to: "/v45/partner-ecosystem",       label: "Partner Ecosystem",    icon: Network },
  { to: "/v45/playbooks",               label: "Playbook Library",     icon: BookOpen },
  { to: "/v45/national-ops",            label: "National Ops Model",   icon: Map },
  { to: "/v45/platform-metrics",        label: "Platform Metrics",     icon: Activity },
  { to: "/v45/reports",                 label: "V4.5 Reports",         icon: FileBarChart },
  { to: "/v45/demo",                    label: "Demo Flow",            icon: ListChecks },
];

export function V45Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 22 V4.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
