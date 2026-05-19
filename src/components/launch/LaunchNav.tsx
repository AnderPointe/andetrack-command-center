import { Link, useLocation } from "@tanstack/react-router";
import {
  Rocket, PlayCircle, Megaphone, BookOpen, DollarSign, LifeBuoy,
  ClipboardCheck, Users, Calculator, Map, Sparkles, Palette, Presentation,
} from "lucide-react";

/** Phase 10 — Product Launch Center sub-navigation. */
const ITEMS = [
  { to: "/launch/overview",       label: "Launch Center",   icon: Rocket },
  { to: "/launch/demo",           label: "Demo Mode",       icon: PlayCircle },
  { to: "/launch/marketing",      label: "Marketing Site",  icon: Megaphone },
  { to: "/launch/pricing",        label: "Pricing",         icon: DollarSign },
  { to: "/launch/onboarding",     label: "Onboarding",      icon: ClipboardCheck },
  { to: "/launch/documentation",  label: "Docs",            icon: BookOpen },
  { to: "/launch/sales",          label: "Sales Kit",       icon: Sparkles },
  { to: "/launch/roi",            label: "ROI Calculator",  icon: Calculator },
  { to: "/launch/pilot",          label: "Pilot Program",   icon: Users },
  { to: "/launch/success",        label: "Customer Success",icon: Users },
  { to: "/launch/support",        label: "Support",         icon: LifeBuoy },
  { to: "/launch/roadmap",        label: "Roadmap",         icon: Map },
  { to: "/launch/release-notes",  label: "Release Notes",   icon: Presentation },
  { to: "/launch/brand",          label: "Brand System",    icon: Palette },
] as const;

export function LaunchNav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Product Launch Center sections"
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
                ? "border-teal-400/50 bg-teal-500/10 text-teal-200"
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
