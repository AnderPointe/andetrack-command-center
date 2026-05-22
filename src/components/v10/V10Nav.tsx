import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, Crown, ShieldCheck, BookOpen, Wallet, TrendingUp, Shield, Megaphone,
  ClipboardCheck, Repeat, Sparkles, Rocket, Plug, Boxes, FileBarChart, Activity,
  Swords, Briefcase, Trophy, Map, ListChecks,
} from "lucide-react";

const ITEMS = [
  { to: "/v10/overview",      label: "V10 Overview",          icon: Gauge },
  { to: "/v10/scope",         label: "Scope",                 icon: Layers },
  { to: "/v10/category",      label: "Category Leadership",   icon: Crown },
  { to: "/v10/trust-commerce",label: "Trust Commercial",      icon: ShieldCheck },
  { to: "/v10/proof",         label: "Proof Library",         icon: BookOpen },
  { to: "/v10/economics",     label: "Platform Economics",    icon: Wallet },
  { to: "/v10/mp-proof",      label: "MP Value Proof",        icon: TrendingUp },
  { to: "/v10/defensibility", label: "Defensibility",         icon: Shield },
  { to: "/v10/sales",         label: "Sales Enablement",      icon: Megaphone },
  { to: "/v10/procurement",   label: "Procurement Sales",     icon: ClipboardCheck },
  { to: "/v10/retention",     label: "Retention & Expansion", icon: Repeat },
  { to: "/v10/outcomes",      label: "Customer Outcomes",     icon: Sparkles },
  { to: "/v10/expansion",     label: "Strategic Expansion",   icon: Rocket },
  { to: "/v10/partner",       label: "Partner Value",         icon: Plug },
  { to: "/v10/product",       label: "Product Durability",    icon: Boxes },
  { to: "/v10/narrative",     label: "Board Narrative",       icon: FileBarChart },
  { to: "/v10/growth",        label: "Growth Execution",      icon: Activity },
  { to: "/v10/competitive",   label: "Competitive",           icon: Swords },
  { to: "/v10/exec-model",    label: "Exec Operating Model",  icon: Briefcase },
  { to: "/v10/value",         label: "Value Realization",     icon: Trophy },
  { to: "/v10/references",    label: "Reference Readiness",   icon: BookOpen },
  { to: "/v10/roadmap",       label: "Leadership Roadmap",    icon: Map },
  { to: "/v10/reports",       label: "V10 Reports",           icon: FileBarChart },
  { to: "/v10/demo",          label: "Demo Flow",             icon: ListChecks },
];

export function V10Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 33 V10 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-amber-400/50 bg-amber-500/10 text-amber-200"
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
