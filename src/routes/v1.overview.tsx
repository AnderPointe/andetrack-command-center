import { createFileRoute } from "@tanstack/react-router";
import { Rocket } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PILOT_SUMMARY, PILOT_QUOTES, METRIC_GROUPS, BUGS, FEEDBACK,
  v1ReadinessScore,
} from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/overview")({
  head: () => ({ meta: [{ title: "Post-Pilot V1 Overview · Anderoute" }] }),
  component: Page,
});

function Page() {
  const score = v1ReadinessScore();
  const openP0 = BUGS.filter((b) => b.priority === "P0" && b.status !== "released" && b.status !== "fixed").length;
  const acceptedFb = FEEDBACK.filter((f) => f.status === "accepted" || f.status === "planned" || f.status === "in_progress").length;
  return (
    <V1Page
      icon={<Rocket className="size-6 text-indigo-300" />}
      title="Post-Pilot Review Center"
      blurb="Pilot outcomes, V1 readiness, feedback intake, and Go / No-Go signal for the first paid Anderoute customer."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Pilot success score</div>
          <div className="mt-1 text-3xl font-semibold">{PILOT_SUMMARY.successScore}</div>
          <div className="text-xs text-muted-foreground">{PILOT_SUMMARY.pilotCompany} · {PILOT_SUMMARY.pilotWindow}</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">V1 readiness</div>
          <div className="mt-1 text-3xl font-semibold">{score}%</div>
          <div className="text-xs text-muted-foreground">regression · release · security · scaling · data</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Open P0 bugs</div>
          <div className="mt-1 text-3xl font-semibold">{openP0}</div>
          <div className="text-xs text-muted-foreground">{openP0 === 0 ? "Clear" : "Blocks V1 GA"}</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Go / No-Go</div>
          <div className="mt-1 text-3xl font-semibold">{openP0 > 0 ? "CONDITIONAL" : PILOT_SUMMARY.goNoGo}</div>
          <div className="text-xs text-muted-foreground">{acceptedFb} feedback items accepted</div>
        </Card>
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Headline metrics</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {METRIC_GROUPS[0].metrics.slice(0, 3).concat(METRIC_GROUPS[1].metrics.slice(0, 3)).map((m) => (
            <div key={m.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="text-xs text-muted-foreground">{m.label}</div>
              <div className="mt-1 text-lg font-semibold">{m.value}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Pilot voices</h2>
        <div className="mt-3 space-y-2">
          {PILOT_QUOTES.map((q) => (
            <div key={q.author} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="text-muted-foreground italic">"{q.text}"</div>
              <div className="mt-1 text-xs">— {q.author}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Open issues snapshot</h2>
        <div className="mt-3 space-y-2">
          {BUGS.filter((b) => b.status !== "released" && b.status !== "fixed").map((b) => (
            <div key={b.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{b.id}</span>
                <Badge variant="outline" className={b.priority === "P0" ? "border-rose-500/30 text-rose-300" : "border-amber-500/30 text-amber-300"}>{b.priority}</Badge>
                <span>{b.title}</span>
              </div>
              <Badge variant="outline" className="border-white/15 text-muted-foreground">{b.status.replace("_", " ")}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </V1Page>
  );
}
