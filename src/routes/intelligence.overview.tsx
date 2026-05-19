import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { IntelligenceNav } from "@/components/intelligence/IntelligenceNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain, ShieldAlert, Sparkles, BotMessageSquare, LineChart, Gauge,
  ClipboardList, Users, BellRing, ScrollText, ArrowRight, Wrench,
} from "lucide-react";
import {
  useOperationsHealthScore, useExecutiveIntelligence, usePredictiveRisks,
  useAIApprovalQueue,
} from "@/intelligence/hooks/useIntelligence";

export const Route = createFileRoute("/intelligence/overview")({
  head: () => ({
    meta: [
      { title: "AI Operations Intelligence — Anderoute" },
      { name: "description", content: "Predictive risk, recommendations, executive intelligence, capacity, and AI governance for Anderoute operations." },
    ],
  }),
  component: IntelligenceOverview,
});

const AREAS = [
  { to: "/intelligence/risk",            icon: ShieldAlert,    title: "Predictive Risk",     summary: "Delay, compliance, GPS, vehicle, and customer-impact risk scoring with confidence.",      tone: "rose"    },
  { to: "/intelligence/recommendations", icon: Sparkles,       title: "AI Recommendations",  summary: "Explainable next-best actions with approval levels and one-click previews.",              tone: "violet"  },
  { to: "/intelligence/dispatch",        icon: BotMessageSquare, title: "Autonomous Dispatch", summary: "Suggested driver matches, drafts, escalations — human-in-the-loop.",                     tone: "indigo"  },
  { to: "/intelligence/executive",       icon: LineChart,      title: "Executive Intelligence", summary: "Operations health, on-time forecast, revenue at risk (placeholder), top actions.",   tone: "blue"    },
  { to: "/intelligence/capacity",        icon: Gauge,          title: "Capacity Forecasting", summary: "Driver, vehicle, and dispatcher workload by hour with coverage gaps.",                  tone: "teal"    },
  { to: "/intelligence/handoff",         icon: ClipboardList,  title: "Shift Handoff",       summary: "AI-generated shift summaries with priority actions and recommended next steps.",          tone: "emerald" },
  { to: "/intelligence/customers",       icon: Users,          title: "Customer Impact",     summary: "VIP exposure, proactive update drafts, customer communication queue.",                    tone: "amber"   },
  { to: "/intelligence/alerts",          icon: BellRing,       title: "Smart Alerts",        summary: "Alerts ranked by impact, severity, customer priority, and dispatch workload.",            tone: "orange"  },
  { to: "/intelligence/governance",      icon: ScrollText,     title: "AI Governance",       summary: "Safety policy, audit trail, cost controls, model abstraction, maintenance placeholder.", tone: "slate"   },
] as const;

const TONE: Record<string, string> = {
  rose:    "border-rose-500/30 text-rose-300",
  violet:  "border-violet-500/30 text-violet-300",
  indigo:  "border-indigo-500/30 text-indigo-300",
  blue:    "border-blue-500/30 text-blue-300",
  teal:    "border-teal-500/30 text-teal-300",
  emerald: "border-emerald-500/30 text-emerald-300",
  amber:   "border-amber-500/30 text-amber-300",
  orange:  "border-orange-500/30 text-orange-300",
  slate:   "border-slate-500/30 text-slate-300",
};

function IntelligenceOverview() {
  const { health } = useOperationsHealthScore();
  const { summary } = useExecutiveIntelligence();
  const { risks } = usePredictiveRisks();
  const { queue } = useAIApprovalQueue();
  const criticals = risks.filter((r) => r.risk_level === "critical").length;

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-violet-500/40 text-violet-300">Phase 9</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">Mock / demo</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Brain className="size-6 text-violet-300" />
            <h1 className="text-2xl font-semibold">AI Operations Intelligence</h1>
          </div>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Predict delays, explain risk, and recommend the next best action. Anderoute CoPilot
            assists dispatchers and executives — every high-impact action requires human approval
            and is fully audited.
          </p>
          <IntelligenceNav />
        </header>

        <div className="grid gap-3 md:grid-cols-4">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs uppercase text-muted-foreground">Health score</div>
            <div className="mt-1 text-2xl font-semibold text-emerald-300">{health.score}</div>
            <div className="text-xs text-muted-foreground capitalize">{health.level} · {health.trend} {health.delta_24h >= 0 ? "+" : ""}{health.delta_24h}</div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs uppercase text-muted-foreground">On-time forecast</div>
            <div className="mt-1 text-2xl font-semibold text-teal-300">{summary.on_time_forecast_pct}%</div>
            <div className="text-xs text-muted-foreground">next 8h</div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs uppercase text-muted-foreground">Critical risks</div>
            <div className="mt-1 text-2xl font-semibold text-rose-300">{criticals}</div>
            <div className="text-xs text-muted-foreground">{risks.length} total active</div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs uppercase text-muted-foreground">Approvals pending</div>
            <div className="mt-1 text-2xl font-semibold text-amber-300">{queue.length}</div>
            <div className="text-xs text-muted-foreground">human-in-the-loop</div>
          </Card>
        </div>

        <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {AREAS.map(({ to, icon: Icon, title, summary, tone }) => (
            <Link key={to} to={to} className="group">
              <Card className={`h-full border bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04] ${TONE[tone]}`}>
                <div className="flex items-center gap-2">
                  <Icon className="size-4" />
                  <h3 className="text-sm font-medium text-foreground">{title}</h3>
                  <ArrowRight className="ml-auto size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{summary}</p>
              </Card>
            </Link>
          ))}
        </section>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Wrench className="size-4 text-muted-foreground" />
            Related surfaces
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Link to="/optimization/center" className="rounded-full border border-white/10 px-3 py-1 hover:border-white/20">Optimization Center (Phase 7)</Link>
            <Link to="/dispatch/command-center" className="rounded-full border border-white/10 px-3 py-1 hover:border-white/20">Dispatch Command (Phase 6)</Link>
            <Link to="/security/overview" className="rounded-full border border-white/10 px-3 py-1 hover:border-white/20">Security & Compliance (Phase 8)</Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
