import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { IntelligenceNav } from "@/components/intelligence/IntelligenceNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain, ShieldAlert, Sparkles, BotMessageSquare, LineChart, Gauge,
  ClipboardList, Users, BellRing, ScrollText, Rocket,
} from "lucide-react";

export const Route = createFileRoute("/intelligence/phase9-overview")({
  head: () => ({ meta: [{ title: "Phase 9 Overview — Anderoute Intelligence" }] }),
  component: Phase9Overview,
});

const AREAS = [
  { to: "/intelligence/overview",        icon: Brain,            area: "AI Operations Intelligence", result: "Main predictive operations command center",                   tone: "violet" },
  { to: "/intelligence/risk",            icon: ShieldAlert,      area: "Predictive Risk",            result: "Delay, ETA, GPS, route, customer, vehicle, compliance risk",  tone: "rose"   },
  { to: "/intelligence/recommendations", icon: Sparkles,         area: "AI Recommendations",         result: "Suggested dispatcher actions with confidence and explanation", tone: "violet" },
  { to: "/intelligence/recommendations", icon: BotMessageSquare, area: "Human Approval",             result: "Approval workflow for high-impact actions",                   tone: "indigo" },
  { to: "/intelligence/executive",       icon: LineChart,        area: "Executive Dashboard",        result: "Operations health, risk forecast, customer impact, AI summary", tone: "blue" },
  { to: "/intelligence/eta-confidence",  icon: Gauge,            area: "ETA Confidence",             result: "Explains ETA reliability and delivery risk",                  tone: "teal"   },
  { to: "/intelligence/capacity",        icon: Gauge,            area: "Capacity Forecasting",       result: "Driver, vehicle, workload, and coverage forecast",            tone: "emerald"},
  { to: "/intelligence/handoff",         icon: ClipboardList,    area: "Shift Handoff",              result: "AI-generated operational handoff summary",                    tone: "amber"  },
  { to: "/intelligence/governance",      icon: ScrollText,       area: "AI Governance",              result: "Audit logs, safety rules, cost controls, RBAC boundaries",    tone: "slate"  },
] as const;

const TONE: Record<string, string> = {
  rose: "border-rose-500/30 text-rose-300",
  violet: "border-violet-500/30 text-violet-300",
  indigo: "border-indigo-500/30 text-indigo-300",
  blue: "border-blue-500/30 text-blue-300",
  teal: "border-teal-500/30 text-teal-300",
  emerald: "border-emerald-500/30 text-emerald-300",
  amber: "border-amber-500/30 text-amber-300",
  orange: "border-orange-500/30 text-orange-300",
  slate: "border-slate-500/30 text-slate-300",
};

function Phase9Overview() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-violet-500/40 text-violet-300">Phase 9</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">Mock / demo</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Rocket className="size-6 text-violet-300" />
            <h1 className="text-2xl font-semibold">Phase 9 — AI Operations Intelligence</h1>
          </div>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Predict delays, explain risk, recommend action, and help dispatchers + executives make
            better decisions before problems become failures. Every AI action is explainable,
            human-approved when impactful, and fully audited.
          </p>
          <IntelligenceNav />
        </header>

        <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {AREAS.map(({ to, icon: Icon, title, tags, tone }) => (
            <Link key={to} to={to}>
              <Card className={`h-full border bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04] ${TONE[tone]}`}>
                <div className="flex items-center gap-2">
                  <Icon className="size-4" />
                  <h3 className="text-sm font-medium text-foreground">{title}</h3>
                </div>
                <div className="mt-2 flex flex-wrap gap-1 text-[10px]">
                  {tags.map((t) => <span key={t} className="rounded border border-white/10 px-2 py-0.5 text-muted-foreground">{t}</span>)}
                </div>
              </Card>
            </Link>
          ))}
        </section>

        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
          Builds on Phases 1–8. Phase 10 will package the product for investor / customer demos,
          onboarding, pricing strategy, and go-to-market.
        </Card>
      </div>
    </AppShell>
  );
}
