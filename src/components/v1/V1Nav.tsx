import { Link, useLocation } from "@tanstack/react-router";
import {
  Rocket, BarChart3, MessageSquare, Bug, Scissors, ListOrdered, Smartphone,
  ClipboardCheck, Globe, Satellite, BellRing, FileBarChart, LifeBuoy,
  HeartHandshake, UserPlus, GraduationCap, Banknote, Repeat, PackageCheck,
  FlaskConical, Activity, Database, ShieldCheck, Map,
} from "lucide-react";

const ITEMS = [
  { to: "/v1/overview",          label: "Overview",          icon: Rocket },
  { to: "/v1/metrics",           label: "Pilot Metrics",     icon: BarChart3 },
  { to: "/v1/feedback",          label: "Feedback",          icon: MessageSquare },
  { to: "/v1/bugs",              label: "Bug Triage",        icon: Bug },
  { to: "/v1/cutline",           label: "V1 Cutline",        icon: Scissors },
  { to: "/v1/prioritization",    label: "Prioritization",    icon: ListOrdered },
  { to: "/v1/driver",            label: "Driver Stab.",      icon: Smartphone },
  { to: "/v1/dispatcher",        label: "Dispatcher Stab.",  icon: ClipboardCheck },
  { to: "/v1/portal",            label: "Portal Stab.",      icon: Globe },
  { to: "/v1/gps",               label: "GPS Reliability",   icon: Satellite },
  { to: "/v1/notifications",     label: "Notifications",     icon: BellRing },
  { to: "/v1/reports",           label: "V1 Reports",        icon: FileBarChart },
  { to: "/v1/support",           label: "Support Ops",       icon: LifeBuoy },
  { to: "/v1/customer-success",  label: "Customer Success",  icon: HeartHandshake },
  { to: "/v1/onboarding",        label: "Onboarding",        icon: UserPlus },
  { to: "/v1/training",          label: "Training",          icon: GraduationCap },
  { to: "/v1/commercial",        label: "Commercial",        icon: Banknote },
  { to: "/v1/conversion",        label: "Pilot → Paid",      icon: Repeat },
  { to: "/v1/release",           label: "Release",           icon: PackageCheck },
  { to: "/v1/regression",        label: "Regression",        icon: FlaskConical },
  { to: "/v1/scaling",           label: "Scaling",           icon: Activity },
  { to: "/v1/data-quality",      label: "Data Quality",      icon: Database },
  { to: "/v1/security",          label: "Security Review",   icon: ShieldCheck },
  { to: "/v1/roadmap",           label: "Roadmap",           icon: Map },
] as const;

export function V1Nav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Phase 14 V1 rollout sections"
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
                ? "border-indigo-400/50 bg-indigo-500/10 text-indigo-200"
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
