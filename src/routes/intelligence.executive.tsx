import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { IntelligenceNav } from "@/components/intelligence/IntelligenceNav";
import { MockBadge } from "@/components/intelligence/MockBadge";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, TrendingUp } from "lucide-react";
import {
  useExecutiveIntelligence, useOperationsHealthScore, useETAConfidence,
} from "@/intelligence/hooks/useIntelligence";

export const Route = createFileRoute("/intelligence/executive")({
  head: () => ({ meta: [{ title: "Executive Intelligence — Anderoute" }] }),
  component: ExecutivePage,
});

function ExecutivePage() {
  const { summary } = useExecutiveIntelligence();
  const { health } = useOperationsHealthScore();
  const { events } = useETAConfidence();
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <LineChart className="size-5 text-blue-300" />
            <h1 className="text-xl font-semibold">Executive Intelligence</h1>
            <Badge variant="outline" className="border-blue-500/40 text-blue-200">CoPilot Executive mode</Badge>
            <MockBadge />
          </div>
          <p className="max-w-2xl text-xs text-muted-foreground">
            Daily executive briefing with operations health, on-time forecast, revenue exposure,
            and the top three actions CoPilot suggests for the next shift.
          </p>
          <IntelligenceNav />
        </header>

        <Card className="border-white/10 bg-gradient-to-br from-blue-500/10 to-violet-500/5 p-5">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">AI-generated executive summary</div>
          <h2 className="mt-1 text-lg font-semibold">{summary.headline}</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-foreground/90">
            {summary.bullets.map((b) => <li key={b}>• {b}</li>)}
          </ul>
        </Card>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Metric label="Health score" value={`${health.score}`} sub={`${health.level} · ${health.delta_24h >= 0 ? "+" : ""}${health.delta_24h}`} tone="emerald" />
          <Metric label="On-time forecast" value={`${summary.on_time_forecast_pct}%`} sub="next 8h" tone="teal" />
          <Metric label="At-risk loads" value={`${summary.at_risk_loads}`} sub="active" tone="amber" />
          <Metric label="Revenue at risk" value={`$${summary.revenue_at_risk_placeholder.toLocaleString()}`} sub="placeholder" tone="rose" />
        </div>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium">Operations health components</h3>
          <div className="mt-3 space-y-2">
            {health.components.map((c) => {
              const bar =
                c.status === "excellent" ? "bg-emerald-400/80" :
                c.status === "stable"    ? "bg-teal-400/70" :
                c.status === "watch"     ? "bg-amber-400/80" :
                                           "bg-rose-400/80";
              return (
                <div key={c.label} className="flex items-center gap-3 text-sm">
                  <div className="w-44 text-muted-foreground">{c.label}</div>
                  <div className="flex-1 h-1.5 rounded bg-white/5 overflow-hidden">
                    <div className={`h-full ${bar}`} style={{ width: `${c.value}%` }} />
                  </div>
                  <div className="w-20 text-right text-xs text-muted-foreground capitalize">{c.value} · {c.status}</div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="size-4 text-teal-300" /> Top recommended actions
          </div>
          <ol className="mt-2 list-decimal pl-5 text-sm text-foreground/90 space-y-1">
            {summary.top_actions.map((a) => <li key={a}>{a}</li>)}
          </ol>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium">ETA confidence (live)</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {events.map((e) => (
              <div key={e.id} className="rounded border border-white/10 bg-black/20 p-3 text-sm">
                <div className="flex justify-between"><span className="font-medium">{e.load_id}</span><span className="text-xs">{e.confidence_pct}% · {e.confidence}</span></div>
                <div className="text-xs text-muted-foreground">{e.driver_name}</div>
                <div className="mt-1 text-xs">{e.reasons.join(" · ")}</div>
                <div className="mt-1 text-xs text-muted-foreground">Suggested: {e.recommended_action}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function Metric({ label, value, sub, tone }: { label: string; value: string; sub: string; tone: string }) {
  const TONE: Record<string, string> = {
    emerald: "text-emerald-300", teal: "text-teal-300", amber: "text-amber-300", rose: "text-rose-300",
  };
  return (
    <Card className="border-white/10 bg-white/[0.02] p-4">
      <div className="text-xs uppercase text-muted-foreground">{label}</div>
      <div className={`mt-1 text-2xl font-semibold ${TONE[tone]}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </Card>
  );
}
