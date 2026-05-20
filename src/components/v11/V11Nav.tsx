import { Link, useLocation } from "@tanstack/react-router";
import {
  Rocket, Layers, Clock, Map, Scissors, CreditCard, ShieldCheck, Upload,
  CloudOff, BellRing, Globe, ClipboardCheck, FileBarChart, Sparkles, Users,
  UserPlus, LineChart, LifeBuoy, Database, ListChecks,
} from "lucide-react";

const ITEMS = [
  { to: "/v11/overview",      label: "V1.1 Overview",     icon: Rocket },
  { to: "/v11/scope",         label: "Scope",             icon: Layers },
  { to: "/v11/eta",           label: "ETA Engine",        icon: Clock },
  { to: "/v11/navigation",    label: "Nav SDK",           icon: Map },
  { to: "/v11/nav-cutline",   label: "Nav Cutline",       icon: Scissors },
  { to: "/v11/billing",       label: "Billing",           icon: CreditCard },
  { to: "/v11/stripe",        label: "Stripe Boundary",   icon: ShieldCheck },
  { to: "/v11/imports",       label: "CSV Imports",       icon: Upload },
  { to: "/v11/offline",       label: "Offline & Sync",    icon: CloudOff },
  { to: "/v11/notifications", label: "Notifications",     icon: BellRing },
  { to: "/v11/portal",        label: "Customer Portal",   icon: Globe },
  { to: "/v11/dispatcher",    label: "Dispatcher",        icon: ClipboardCheck },
  { to: "/v11/reports",       label: "Reports",           icon: FileBarChart },
  { to: "/v11/copilot",       label: "CoPilot Rules",     icon: Sparkles },
  { to: "/v11/permissions",   label: "Permissions",       icon: Users },
  { to: "/v11/onboarding",    label: "Onboarding",        icon: UserPlus },
  { to: "/v11/growth",        label: "Growth",            icon: LineChart },
  { to: "/v11/support",       label: "Support",           icon: LifeBuoy },
  { to: "/v11/data-quality",  label: "Data Quality",      icon: Database },
  { to: "/v11/security",      label: "Security Review",   icon: ShieldCheck },
  { to: "/v11/demo",          label: "Demo Flow",         icon: ListChecks },
] as const;

export function V11Nav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Phase 15 V1.1 sections"
      className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin"
    >
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-fuchsia-400/50 bg-fuchsia-500/10 text-fuchsia-200"
                : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
            }`}
          >
            <Icon className="size-3.5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
