import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PILOT_METRICS_DEFS } from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/metrics")({
  head: () => ({ meta: [{ title: "Pilot Metrics · Anderoute" }] }),
  component: Page,
});

function Page() {
  const groups = Array.from(new Set(PILOT_METRICS_DEFS.map((m) => m.group)));
  const onTrack = PILOT_METRICS_DEFS.filter((m) => m.onTrack).length;
  return (
    <PilotPage
      icon={<Gauge className="size-6 text-teal-300" />}
      title="Pilot Success Metrics"
      blurb="Adoption, workflow, reliability, support, and satisfaction KPIs for the first pilot — grouped, with current vs target and on/off-track status."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between text-sm">
          <span>On track</span>
          <Badge variant="outline" className={onTrack === PILOT_METRICS_DEFS.length ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
            {onTrack} / {PILOT_METRICS_DEFS.length}
          </Badge>
        </div>
      </Card>

      {groups.map((g) => (
        <Card key={g} className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">{g}</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {PILOT_METRICS_DEFS.filter((m) => m.group === g).map((m) => (
              <div key={m.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{m.name}</div>
                  <span className={`size-2 rounded-full ${m.onTrack ? "bg-emerald-400" : "bg-rose-400"}`} />
                </div>
                <div className="mt-2 flex items-baseline justify-between text-xs text-muted-foreground">
                  <span>Target</span><span className="font-mono">{m.target}</span>
                </div>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-muted-foreground">Current</span>
                  <span className={`font-mono ${m.onTrack ? "text-emerald-300" : "text-rose-300"}`}>{m.current}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </PilotPage>
  );
}
