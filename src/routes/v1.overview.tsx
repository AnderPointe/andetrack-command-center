import { createFileRoute, Link } from "@tanstack/react-router";
import { Rocket, AlertTriangle } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  PILOT_SUMMARY, PILOT_QUOTES, METRIC_GROUPS, BUGS, FEEDBACK,
  v1ReadinessScore, v1ReadinessBreakdown, v1Blockers, bugStats,
} from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/overview")({
  head: () => ({ meta: [{ title: "Post-Pilot V1 Overview · Anderoute" }] }),
  component: Page,
});

function Page() {
  const score = v1ReadinessScore();
  const breakdown = v1ReadinessBreakdown();
  const blockers = v1Blockers();
  const bs = bugStats();
  const goNoGo = bs.p0 > 0 ? "CONDITIONAL" : PILOT_SUMMARY.goNoGo;
  const acceptedFb = FEEDBACK.filter((f) => f.status === "accepted" || f.status === "planned" || f.status === "in_progress").length;
  return (
    <V1Page
      icon={<Rocket className="size-6 text-indigo-300" />}
      title="Post-Pilot Review Center"
      blurb={`${PILOT_SUMMARY.pilotCompany} · ${PILOT_SUMMARY.pilotWindow}. Pilot outcomes, V1 readiness, and Go / No-Go signal for the first paid Anderoute customer.`}
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile
          label="Pilot success"
          value={PILOT_SUMMARY.successScore}
          hint={`${PILOT_SUMMARY.loadsCompleted}/${PILOT_SUMMARY.loadsCreated} loads · ${Math.round(PILOT_SUMMARY.podCompletion * 100)}% POD`}
          tone={PILOT_SUMMARY.successScore >= 80 ? "good" : "warn"}
        />
        <StatTile
          label="V1 readiness"
          value={`${score}%`}
          hint="weighted: reg · rel · sec · scal · dq"
          tone={score >= 85 ? "good" : score >= 70 ? "warn" : "bad"}
        />
        <StatTile
          label="Open P0 / P1 bugs"
          value={`${bs.p0} / ${bs.p1}`}
          hint={bs.p0 === 0 ? "No GA blockers" : "Blocks V1 GA"}
          tone={bs.p0 === 0 ? "good" : "bad"}
        />
        <StatTile
          label="Go / No-Go"
          value={goNoGo}
          hint={`${acceptedFb} feedback items in flight`}
          tone={goNoGo === "GO" ? "good" : goNoGo === "CONDITIONAL" ? "warn" : "bad"}
        />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">V1 readiness composition</h2>
          <Badge variant="outline" className="border-white/15 text-muted-foreground">weighted score</Badge>
        </div>
        <div className="mt-3 space-y-3">
          {breakdown.map((b) => (
            <div key={b.id}>
              <div className="flex items-center justify-between text-xs">
                <span>{b.label} <span className="text-muted-foreground">· weight {b.weight}</span></span>
                <span className={b.pct >= 90 ? "text-emerald-300" : b.pct >= 70 ? "text-sky-300" : "text-amber-300"}>{b.pct}%</span>
              </div>
              <Progress value={b.pct} className="mt-1 h-1.5" />
              {b.note && <div className="text-[11px] text-muted-foreground">{b.note}</div>}
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <AlertTriangle className="size-4 text-amber-300" />
            Open blockers
          </h2>
          <Badge variant="outline" className={blockers.length === 0 ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
            {blockers.length} open
          </Badge>
        </div>
        <div className="mt-3 space-y-2">
          {blockers.length === 0 ? (
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-sm text-emerald-200">All gates clear — V1 GA unblocked.</div>
          ) : blockers.map((b) => (
            <div key={`${b.source}-${b.id}`} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{b.id}</span>
                <span>{b.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-white/15 text-muted-foreground">{b.source}</Badge>
                <Badge variant="outline" className={b.severity === "critical" ? "border-rose-500/30 text-rose-300" : b.severity === "high" ? "border-amber-500/30 text-amber-300" : "border-sky-500/30 text-sky-300"}>
                  {b.severity}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Headline pilot metrics</h2>
          <Link to="/v1/metrics" className="text-xs text-indigo-300 hover:underline">Full dashboard →</Link>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {METRIC_GROUPS[0].metrics.slice(0, 3).concat(METRIC_GROUPS[2].metrics.slice(0, 3)).map((m) => (
            <div key={m.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="text-xs text-muted-foreground">{m.label}</div>
              <div className="mt-1 text-lg font-semibold">{m.value}</div>
              {m.hint && <div className="text-[11px] text-muted-foreground">{m.hint}</div>}
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Pilot voices</h2>
        <div className="mt-3 space-y-2">
          {PILOT_QUOTES.map((q) => (
            <div key={q.author} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="italic text-muted-foreground">&ldquo;{q.text}&rdquo;</div>
              <div className="mt-1 text-xs">— {q.author}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Bug pipeline</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-4">
          <StatTile label="P0 open" value={bs.p0} tone={bs.p0 ? "bad" : "good"} />
          <StatTile label="P1 open" value={bs.p1} tone={bs.p1 ? "warn" : "good"} />
          <StatTile label="Fixed" value={bs.fixed} tone="info" />
          <StatTile label="Released" value={bs.released} tone="good" />
        </div>
        <div className="mt-3">
          <Link to="/v1/bugs" className="text-xs text-indigo-300 hover:underline">Open bug triage board →</Link>
        </div>
      </Card>
    </V1Page>
  );
}
