import { Link, useLocation } from "@tanstack/react-router";
import {
  Rocket, Scissors, Table2, CalendarRange, ListChecks, BookOpen,
  Wrench, FileText, ShieldCheck, FlaskConical, ClipboardCheck,
  Users, GraduationCap, AlertTriangle, Map, Scale, DollarSign, PlayCircle,
} from "lucide-react";

/** Phase 11 — MVP planning sub-navigation. */
const ITEMS = [
  { to: "/mvp/overview",       label: "Overview",        icon: Rocket },
  { to: "/mvp/cutline",        label: "MVP Cutline",     icon: Scissors },
  { to: "/mvp/feature-matrix", label: "Feature Matrix",  icon: Table2 },
  { to: "/mvp/sprints",        label: "Sprints",         icon: CalendarRange },
  { to: "/mvp/backlog",        label: "Backlog",         icon: ListChecks },
  { to: "/mvp/user-stories",   label: "User Stories",    icon: BookOpen },
  { to: "/mvp/tech-debt",      label: "Tech Debt",       icon: Wrench },
  { to: "/mvp/adrs",           label: "ADRs",            icon: FileText },
  { to: "/mvp/security",       label: "Security",        icon: ShieldCheck },
  { to: "/mvp/qa",             label: "QA",              icon: FlaskConical },
  { to: "/mvp/release",        label: "Release",         icon: ClipboardCheck },
  { to: "/mvp/pilot",          label: "Pilot",           icon: Users },
  { to: "/mvp/training",       label: "Training",        icon: GraduationCap },
  { to: "/mvp/risks",          label: "Risks",           icon: AlertTriangle },
  { to: "/mvp/roadmap",        label: "Roadmap",         icon: Map },
  { to: "/mvp/build-vs-buy",   label: "Build vs Buy",    icon: Scale },
  { to: "/mvp/costs",          label: "Costs",           icon: DollarSign },
  { to: "/mvp/demo-script",    label: "Demo Script",     icon: PlayCircle },
] as const;

export function MvpNav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Phase 11 MVP planning sections"
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
