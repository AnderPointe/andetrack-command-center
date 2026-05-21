import { Link, useLocation } from "@tanstack/react-router";
import {
  Rocket, Layers, Map, MapPin, Compass, Route, Navigation, Activity,
  CreditCard, ShieldCheck, Lock, Plug, Webhook, Sparkles, Truck,
  ClipboardList, Globe, Users, FileBarChart, ListChecks, RefreshCcw, Gauge,
} from "lucide-react";

const ITEMS = [
  { to: "/v15/overview",          label: "V1.5 Overview",       icon: Rocket },
  { to: "/v15/scope",             label: "Scope",               icon: Layers },
  { to: "/v15/navigation",        label: "Nav Providers",       icon: Map },
  { to: "/v15/mapbox",            label: "Mapbox",              icon: MapPin },
  { to: "/v15/google",            label: "Google",              icon: Compass },
  { to: "/v15/sessions",          label: "Sessions",            icon: Activity },
  { to: "/v15/rendering",         label: "Route Render",        icon: Route },
  { to: "/v15/eta-sync",          label: "ETA Sync",            icon: RefreshCcw },
  { to: "/v15/reroute",           label: "Reroute",             icon: Navigation },
  { to: "/v15/provider-health",   label: "Provider Health",     icon: Gauge },
  { to: "/v15/billing",           label: "Billing",             icon: CreditCard },
  { to: "/v15/stripe",            label: "Stripe Plan",         icon: ShieldCheck },
  { to: "/v15/plan-limits",       label: "Plan Limits",         icon: Lock },
  { to: "/v15/integrations",      label: "Integrations",        icon: Plug },
  { to: "/v15/webhooks",          label: "Webhooks",            icon: Webhook },
  { to: "/v15/copilot",           label: "CoPilot V1.5",        icon: Sparkles },
  { to: "/v15/driver-nav",        label: "Driver Nav",          icon: Truck },
  { to: "/v15/dispatcher-routes", label: "Dispatcher Routes",   icon: ClipboardList },
  { to: "/v15/portal",            label: "Portal V1.5",         icon: Globe },
  { to: "/v15/paid-customers",    label: "Paid Customers",      icon: Users },
  { to: "/v15/reports",           label: "Reports",             icon: FileBarChart },
  { to: "/v15/security",          label: "Security",            icon: ShieldCheck },
  { to: "/v15/demo",              label: "Demo Flow",           icon: ListChecks },
] as const;

export function V15Nav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Phase 16 V1.5 sections"
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
                ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-200"
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
