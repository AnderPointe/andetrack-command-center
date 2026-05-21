import { Link, useLocation } from "@tanstack/react-router";
import {
  Rocket, Layers, Coins, Network, ShieldCheck, ClipboardCheck, Trophy,
  Wallet, Handshake, Building2, Radio, HeartPulse, Gauge, ListTodo,
  Award, FileQuestion, FileText, Briefcase, KeyRound, Users2,
  Activity, MapPinned, DollarSign, FileBarChart, ListChecks,
} from "lucide-react";

const ITEMS = [
  { to: "/v35/overview",                 label: "V3.5 Overview",        icon: Rocket },
  { to: "/v35/scope",                    label: "Scope",                icon: Layers },
  { to: "/v35/marketplace-monetization", label: "Marketplace $",        icon: Coins },
  { to: "/v35/carrier-network",          label: "Carrier Network",      icon: Network },
  { to: "/v35/carrier-verification",     label: "Verification",         icon: ShieldCheck },
  { to: "/v35/carrier-compliance",       label: "Carrier Compliance",   icon: ClipboardCheck },
  { to: "/v35/carrier-performance",      label: "Carrier Performance",  icon: Trophy },
  { to: "/v35/carrier-settlement",       label: "Settlement",           icon: Wallet },
  { to: "/v35/partner-portal",           label: "Partner Portal",       icon: Building2 },
  { to: "/v35/partnerships",             label: "Strategic Partners",   icon: Handshake },
  { to: "/v35/telematics",               label: "Adv. Telematics",      icon: Radio },
  { to: "/v35/vehicle-health",           label: "Vehicle Health",       icon: HeartPulse },
  { to: "/v35/driver-behavior",          label: "Driver Behavior",      icon: Gauge },
  { to: "/v35/compliance",               label: "Compliance Auto",      icon: ListTodo },
  { to: "/v35/certification",            label: "Cert. Execution",      icon: Award },
  { to: "/v35/questionnaire",            label: "Security Q'naire",     icon: FileQuestion },
  { to: "/v35/vendor-packet",            label: "Vendor Packet",        icon: FileText },
  { to: "/v35/procurement",              label: "Procurement",          icon: Briefcase },
  { to: "/v35/partner-api",              label: "Partner API",          icon: KeyRound },
  { to: "/v35/customer-success",         label: "Customer Success",     icon: Users2 },
  { to: "/v35/commercial-ops",           label: "Commercial Ops",       icon: Activity },
  { to: "/v35/multi-region",             label: "Multi-Region",         icon: MapPinned },
  { to: "/v35/platform-revenue",         label: "Platform Revenue",     icon: DollarSign },
  { to: "/v35/reports",                  label: "V3.5 Reports",         icon: FileBarChart },
  { to: "/v35/demo",                     label: "Demo Flow",            icon: ListChecks },
];

export function V35Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 20 V3.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
