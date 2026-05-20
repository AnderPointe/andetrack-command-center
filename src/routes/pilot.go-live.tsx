import { createFileRoute } from "@tanstack/react-router";
import { CalendarRange } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GO_LIVE_PHASES, READINESS_LABEL, READINESS_TONE } from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/go-live")({
  head: () => ({ meta: [{ title: "Pilot Go-Live Plan · Anderoute" }] }),
  component: Page,
});

function Page() {
  const done = GO_LIVE_PHASES.filter((p) => p.status === "ready" || p.status === "passed").length;
  const total = GO_LIVE_PHASES.length;
  const pct = Math.round((done / total) * 100);
  const current = GO_LIVE_PHASES.find((p) => p.status === "in_progress")
              ?? GO_LIVE_PHASES.find((p) => p.status === "needs_review")
              ?? GO_LIVE_PHASES.find((p) => p.status === "not_started");

  return (
    <PilotPage
      icon={<CalendarRange className="size-6 text-teal-300" />}
      title="Pilot Go-Live Plan"
      blurb="Phased rollout from internal smoke test to first live load, first POD, and pilot review cadence."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between text-sm">
          <span>Progress</span>
          <span className="font-mono">{done} / {total} · {pct}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full bg-teal-400/70" style={{ width: `${pct}%` }} />
        </div>
        {current && (
          <div className="mt-3 rounded-lg border border-sky-500/30 bg-sky-500/5 p-3 text-xs text-sky-100">
            Current phase: <strong>{current.phase}</strong> · owner {current.owner} · success: {current.success}
          </div>
        )}
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-2">
          {GO_LIVE_PHASES.map((p, i) => (
            <li key={p.id} className={`rounded-lg border bg-black/20 p-3 text-sm ${p.id === current?.id ? "border-sky-500/30" : "border-white/10"}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-full border border-white/10 text-xs text-muted-foreground">{i + 1}</span>
                  <span className="font-medium">{p.phase}</span>
                  <Badge variant="outline" className="border-white/15 text-muted-foreground">owner: {p.owner}</Badge>
                </div>
                <Badge variant="outline" className={READINESS_TONE[p.status]}>{READINESS_LABEL[p.status]}</Badge>
              </div>
              <p className="mt-1 pl-9 text-xs text-muted-foreground">Success: {p.success}</p>
            </li>
          ))}
        </ol>
      </Card>
    </PilotPage>
  );
}
