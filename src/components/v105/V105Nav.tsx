import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, Megaphone, ShieldCheck, Crown, Briefcase, ClipboardList, Tag,
  TrendingUp, ClipboardCheck, BookOpen, Network, Boxes, Wrench, Wallet, FileBarChart,
  Trophy, Map, CalendarClock, Rocket, AlertTriangle, ListChecks,
} from "lucide-react";

const ITEMS = [
  { to: "/v105/overview",        label: "V10.5 Overview",        icon: Gauge },
  { to: "/v105/scope",           label: "Scope",                 icon: Layers },
  { to: "/v105/commercial",      label: "Commercialization",     icon: Megaphone },
  { to: "/v105/trust",           label: "Trust Monetization",    icon: ShieldCheck },
  { to: "/v105/category",        label: "Category Execution",    icon: Crown },
  { to: "/v105/sales-os",        label: "Sales OS",              icon: Briefcase },
  { to: "/v105/deal-desk",       label: "Deal Desk",             icon: ClipboardList },
  { to: "/v105/pricing",         label: "Pricing & Packaging",   icon: Tag },
  { to: "/v105/expansion-rev",   label: "Revenue Expansion",     icon: TrendingUp },
  { to: "/v105/procurement",     label: "Procurement Accel.",    icon: ClipboardCheck },
  { to: "/v105/customer-proof",  label: "Customer Proof",        icon: BookOpen },
  { to: "/v105/mp-proof",        label: "MP Proof",              icon: BookOpen },
  { to: "/v105/partner",         label: "Partner Channel",       icon: Network },
  { to: "/v105/product-lines",   label: "Product Lines",         icon: Boxes },
  { to: "/v105/sales-eng",       label: "Sales Engineering",     icon: Wrench },
  { to: "/v105/capital",         label: "Capital Readiness",     icon: Wallet },
  { to: "/v105/data-room",       label: "Data Room",             icon: FileBarChart },
  { to: "/v105/board",           label: "Board Growth Gov.",     icon: Trophy },
  { to: "/v105/expansion",       label: "Expansion Discipline",  icon: Map },
  { to: "/v105/cadence",         label: "Revenue Cadence",       icon: CalendarClock },
  { to: "/v105/portfolio",       label: "Growth Portfolio",      icon: Rocket },
  { to: "/v105/risk",            label: "Commercial Risk",       icon: AlertTriangle },
  { to: "/v105/reports",         label: "V10.5 Reports",         icon: FileBarChart },
  { to: "/v105/demo",            label: "Demo Flow",             icon: ListChecks },
];

export function V105Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 34 V10.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
