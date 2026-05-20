import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Rocket, Scissors, Table2, CalendarRange, ListChecks, BookOpen, Wrench,
  FileText, ShieldCheck, FlaskConical, ClipboardCheck, Users, GraduationCap,
  AlertTriangle, Map, Scale, DollarSign, PlayCircle,
} from "lucide-react";

export const Route = createFileRoute("/mvp/overview")({
  head: () => ({ meta: [{ title: "Phase 11 — MVP Planning · Anderoute" }] }),
  component: MvpOverview,
});

const AREAS = [
  { to: "/mvp/cutline",        icon: Scissors,       area: "MVP Cutline",      result: "Build now vs mock for demo vs defer",            tone: "rose"    },
  { to: "/mvp/feature-matrix", icon: Table2,         area: "Feature Matrix",   result: "Every feature with status, priority, owner",     tone: "violet"  },
  { to: "/mvp/sprints",        icon: CalendarRange,  area: "Sprints",          result: "Sprint 0–7 implementation plan",                 tone: "indigo"  },
  { to: "/mvp/backlog",        icon: ListChecks,     area: "Backlog",          result: "AR-001+ engineering backlog with priority",      tone: "blue"    },
  { to: "/mvp/user-stories",   icon: BookOpen,       area: "User Stories",     result: "Role-based stories with acceptance criteria",    tone: "teal"    },
  { to: "/mvp/tech-debt",      icon: Wrench,         area: "Technical Debt",   result: "Cleanup register before pilot hardening",        tone: "amber"   },
  { to: "/mvp/adrs",           icon: FileText,       area: "ADRs",             result: "Architecture decision records",                  tone: "slate"   },
  { to: "/mvp/security",       icon: ShieldCheck,    area: "Security Cutline", result: "What ships in MVP vs what defers",               tone: "emerald" },
  { to: "/mvp/qa",             icon: FlaskConical,   area: "QA Plan",          result: "Test scenarios across auth, RLS, GPS, workflow", tone: "violet"  },
  { to: "/mvp/release",        icon: ClipboardCheck, area: "Release Plan",     result: "Environments, gates, and sign-off",              tone: "teal"    },
  { to: "/mvp/pilot",          icon: Users,          area: "Pilot Launch",     result: "Checklist, success metrics, risks",              tone: "amber"   },
  { to: "/mvp/training",       icon: GraduationCap,  area: "Training Plan",    result: "Admin / dispatcher / driver / customer / CS",    tone: "indigo"  },
  { to: "/mvp/risks",          icon: AlertTriangle,  area: "Product Risks",    result: "Adoption, GPS, scope, AI, store approval",       tone: "rose"    },
  { to: "/mvp/roadmap",        icon: Map,            area: "Roadmap",          result: "MVP · Post-Pilot · V1.5 · V2 · Enterprise",      tone: "blue"    },
  { to: "/mvp/build-vs-buy",   icon: Scale,          area: "Build vs Buy",     result: "Recommended approach by capability",             tone: "slate"   },
  { to: "/mvp/costs",          icon: DollarSign,     area: "Cost Awareness",   result: "Monthly cost model worksheet",                   tone: "emerald" },
  { to: "/mvp/demo-script",    icon: PlayCircle,     area: "MVP Demo Script",  result: "Pilot-only demo, no aspirational features",      tone: "teal"    },
] as const;

const TONE: Record<string, string> = {
  rose: "border-rose-500/30 text-rose-300",
  violet: "border-violet-500/30 text-violet-300",
  indigo: "border-indigo-500/30 text-indigo-300",
  blue: "border-blue-500/30 text-blue-300",
  teal: "border-teal-500/30 text-teal-300",
  emerald: "border-emerald-500/30 text-emerald-300",
  amber: "border-amber-500/30 text-amber-300",
  slate: "border-slate-500/30 text-slate-300",
};

function MvpOverview() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">Mock / planning</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Rocket className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">Phase 11 — MVP Cutline & Pilot Launch</h1>
          </div>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Reduce the full Anderoute enterprise vision into a practical, buildable MVP for a first
            pilot customer. Build now, mock for demo, or defer — without losing the long-term roadmap.
          </p>
          <MvpNav />
        </header>

        <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {AREAS.map(({ to, icon: Icon, area, result, tone }) => (
            <Link key={area} to={to}>
              <Card className={`h-full border bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04] ${TONE[tone]}`}>
                <div className="flex items-center gap-2">
                  <Icon className="size-4" />
                  <h3 className="text-sm font-medium text-foreground">{area}</h3>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{result}</p>
              </Card>
            </Link>
          ))}
        </section>

        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
          Builds on Phases 1–10. Phase 12 will move from planning to actual MVP coding,
          repository cleanup, Supabase migration execution, and the first working pilot build.
        </Card>
      </div>
    </AppShell>
  );
}
