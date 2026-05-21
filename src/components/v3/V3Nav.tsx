import { Link, useLocation } from "@tanstack/react-router";
import {
  Rocket, Layers, Smartphone, Sparkles, Mic, Car, Apple, Radio,
  Truck, ShieldCheck, Cpu, WifiOff, Activity, Users2, FileBarChart,
  ListChecks, Building2, Settings2, MessageSquare, Award, ClipboardCheck,
} from "lucide-react";

const ITEMS = [
  { to: "/v3/overview",           label: "V3 Overview",       icon: Rocket },
  { to: "/v3/scope",              label: "Scope",             icon: Layers },
  { to: "/v3/driver-app",         label: "Native Driver App", icon: Smartphone },
  { to: "/v3/driver-ux",          label: "Driver UX",         icon: Sparkles },
  { to: "/v3/android-auto",       label: "Android Auto",      icon: Car },
  { to: "/v3/carplay",            label: "CarPlay",           icon: Apple },
  { to: "/v3/voice",              label: "Advanced Voice",    icon: Mic },
  { to: "/v3/voice-intents",      label: "Voice Intents",     icon: MessageSquare },
  { to: "/v3/telematics",         label: "Telematics",        icon: Radio },
  { to: "/v3/fleet-hardware",     label: "Fleet Hardware",    icon: Cpu },
  { to: "/v3/marketplace",        label: "Carrier Marketplace", icon: Truck },
  { to: "/v3/carrier-profiles",   label: "Carrier Profiles",  icon: Users2 },
  { to: "/v3/carrier-compliance", label: "Carrier Compliance",icon: ClipboardCheck },
  { to: "/v3/offline",            label: "Mobile Offline",    icon: WifiOff },
  { to: "/v3/observability",      label: "Mobile Observability", icon: Activity },
  { to: "/v3/engagement",         label: "Driver Engagement", icon: Award },
  { to: "/v3/certification",      label: "Certification",     icon: ShieldCheck },
  { to: "/v3/questionnaire",      label: "Security Q'naire",  icon: ClipboardCheck },
  { to: "/v3/admin",              label: "Enterprise Admin",  icon: Settings2 },
  { to: "/v3/reports",            label: "V3 Reports",        icon: FileBarChart },
  { to: "/v3/demo",               label: "Demo Flow",         icon: ListChecks },
  { to: "/v3/enterprise-onboarding", label: "Enterprise Onboarding", icon: Building2 },
];

export function V3Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 19 V3 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-sky-400/50 bg-sky-500/10 text-sky-200"
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
