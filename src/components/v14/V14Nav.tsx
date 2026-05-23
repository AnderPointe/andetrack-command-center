import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, Activity, ShieldCheck, TrendingUp, Megaphone, Network,
  FileBarChart, AlertTriangle, Map, ListChecks, Command, CalendarClock,
  Users, BookOpen, Briefcase, Lock, Wallet, Stamp, Boxes, Compass, Star,
} from "lucide-react";

const ITEMS = [
  { to: "/v14/overview",            label: "V14 Overview",            icon: Gauge },
  { to: "/v14/scope",               label: "Scope",                   icon: Layers },
  { to: "/v14/sos",                 label: "Strategic OS",            icon: Command },
  { to: "/v14/capital-exec",        label: "Capital Execution",       icon: Wallet },
  { to: "/v14/revenue-durability",  label: "Revenue Durability",      icon: TrendingUp },
  { to: "/v14/revenue-controls",    label: "Revenue Controls",        icon: ShieldCheck },
  { to: "/v14/mp-econ",             label: "MP Economics",            icon: Megaphone },
  { to: "/v14/mp-controls",         label: "MP Controls",             icon: ShieldCheck },
  { to: "/v14/category",            label: "Category Leadership",     icon: Star },
  { to: "/v14/category-evidence",   label: "Category Evidence",       icon: BookOpen },
  { to: "/v14/value-tower",         label: "Value Control Tower",     icon: Compass },
  { to: "/v14/board-exec",          label: "Board Execution",         icon: FileBarChart },
  { to: "/v14/cadence",             label: "Strategic Cadence",       icon: CalendarClock },
  { to: "/v14/strategic-risk",      label: "Strategic Risk",          icon: AlertTriangle },
  { to: "/v14/strategic-acct",      label: "Strategic Accts",         icon: Users },
  { to: "/v14/partner-value",       label: "Partner Value",           icon: Network },
  { to: "/v14/product-line",        label: "Product Stewardship",     icon: Boxes },
  { to: "/v14/strategic-invest",    label: "Strategic Invest",        icon: Briefcase },
  { to: "/v14/capital-evidence",    label: "Capital Evidence",        icon: Lock },
  { to: "/v14/diligence",           label: "Diligence Control",       icon: Stamp },
  { to: "/v14/reporting",           label: "Value Reporting",         icon: Activity },
  { to: "/v14/roadmap",             label: "LT Roadmap",              icon: Map },
  { to: "/v14/reports",             label: "Reports",                 icon: ShieldCheck },
  { to: "/v14/demo",                label: "Demo Flow",               icon: ListChecks },
];

export function V14Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 41 V14 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
