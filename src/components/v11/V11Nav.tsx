import { useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, TrendingUp, ClipboardList, BookOpen, Boxes, Tag,
  ClipboardCheck, ShieldCheck, BadgeCheck, Megaphone, Network, Wrench,
  Briefcase, Trophy, AlertTriangle, FileBarChart, Map, ListChecks, Rocket, Building2, Repeat,
} from "lucide-react";

const ITEMS = [
  { to: "/v11/overview",        label: "V11 Overview",          icon: Gauge },
  { to: "/v11/scope",           label: "Scope",                 icon: Layers },
  { to: "/v11/revenue-engine",  label: "Revenue Engine",        icon: TrendingUp },
  { to: "/v11/accounts",        label: "Account Expansion",     icon: Building2 },
  { to: "/v11/account-plan",    label: "Account Planning",      icon: ClipboardList },
  { to: "/v11/playbooks",       label: "Expansion Playbooks",   icon: BookOpen },
  { to: "/v11/monetization",    label: "Monetization Maturity", icon: Boxes },
  { to: "/v11/pricing",         label: "Pricing & Packaging",   icon: Tag },
  { to: "/v11/deal-desk",       label: "Deal Desk",             icon: ClipboardCheck },
  { to: "/v11/trust-sales",     label: "Trust-Led Sales",       icon: ShieldCheck },
  { to: "/v11/procurement",     label: "Procurement Accel.",    icon: BadgeCheck },
  { to: "/v11/proof",           label: "Customer Proof",        icon: BookOpen },
  { to: "/v11/marketplace",     label: "MP Monetization",       icon: Megaphone },
  { to: "/v11/api-edi",         label: "API/EDI Monetization",  icon: Boxes },
  { to: "/v11/partners",        label: "Partner Commercial.",   icon: Network },
  { to: "/v11/partner-rev",     label: "Partner Revenue",       icon: Repeat },
  { to: "/v11/sales-eng",       label: "Sales Engineering",     icon: Wrench },
  { to: "/v11/revops",          label: "RevOps Governance",     icon: Briefcase },
  { to: "/v11/renewal",         label: "Renewal & Expansion",   icon: Repeat },
  { to: "/v11/risk",            label: "Revenue Risk",          icon: AlertTriangle },
  { to: "/v11/board",           label: "Board Revenue",         icon: Trophy },
  { to: "/v11/roadmap",         label: "Monetization Roadmap",  icon: Map },
  { to: "/v11/reports",         label: "V11 Reports",           icon: FileBarChart },
  { to: "/v11/demo",            label: "Demo Flow",             icon: ListChecks },
];

export function V11Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 35 V11 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <a key={to} href={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-200"
                : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
            }`}>
            <Icon className="size-3.5" />
            {label}
          </a>
        );
      })}
    </nav>
  );
}
