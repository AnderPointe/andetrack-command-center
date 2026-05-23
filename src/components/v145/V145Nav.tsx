import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, Command, Wallet, TrendingUp, Activity, Megaphone, ShieldCheck,
  Star, BookOpen, Users, Network, Boxes, Lock, Stamp, AlertTriangle, ListChecks,
  CalendarClock, FileBarChart, Compass, Map, Briefcase,
} from "lucide-react";

const ITEMS = [
  { to: "/v145/overview",          label: "V14.5 Overview",         icon: Gauge },
  { to: "/v145/scope",             label: "Scope",                  icon: Layers },
  { to: "/v145/opex",              label: "Operating Excellence",   icon: Command },
  { to: "/v145/capital",           label: "Capital Discipline",     icon: Wallet },
  { to: "/v145/rev-systems",       label: "Durable Revenue",        icon: TrendingUp },
  { to: "/v145/rev-exec",          label: "Revenue Execution",      icon: Activity },
  { to: "/v145/mp-scale",          label: "MP Economics Scale",     icon: Megaphone },
  { to: "/v145/mp-controls",       label: "MP Scale Controls",      icon: ShieldCheck },
  { to: "/v145/category",          label: "Category Execution",     icon: Star },
  { to: "/v145/proofs",            label: "Category Proof",         icon: BookOpen },
  { to: "/v145/exec-perf",         label: "Exec Performance",       icon: Briefcase },
  { to: "/v145/board",             label: "Board Execution",        icon: FileBarChart },
  { to: "/v145/accounts",          label: "Strategic Accounts",     icon: Users },
  { to: "/v145/partners",          label: "Partner Value",          icon: Network },
  { to: "/v145/product-lines",     label: "Product-Line OpEx",      icon: Boxes },
  { to: "/v145/cap-evidence",      label: "Capital Evidence",       icon: Lock },
  { to: "/v145/diligence",         label: "Commercial Diligence",   icon: Stamp },
  { to: "/v145/risk",              label: "Strategic Risk",         icon: AlertTriangle },
  { to: "/v145/op-controls",       label: "Operating Controls",     icon: Compass },
  { to: "/v145/cadence",           label: "Operating Cadence",      icon: CalendarClock },
  { to: "/v145/lt-perf",           label: "LT Performance",         icon: Map },
  { to: "/v145/reports",           label: "Reports",                icon: ShieldCheck },
  { to: "/v145/demo",              label: "Demo Flow",              icon: ListChecks },
];

export function V145Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 42 V14.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
