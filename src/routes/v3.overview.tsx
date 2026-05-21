import { createFileRoute } from "@tanstack/react-router";
import { Rocket } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { V3_READINESS, v3ReadinessScore } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/overview")({
  head: () => ({ meta: [{ title: "V3 Overview · Anderoute" }] }),
  component: () => (
    <V3Page icon={<Rocket className="size-6 text-sky-300" />} title="Anderoute V3 Overview"
      blurb="Mobile-native expansion: native driver app, advanced CoPilot voice, Android Auto / CarPlay planning, telematics foundation, carrier marketplace, and enterprise certification readiness. No autonomous dispatch, no certification claims.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">V3 release readiness</h2>
          <Badge variant="outline" className="border-sky-500/40 text-sky-300">{v3ReadinessScore()} / 100</Badge>
        </div>
        <Progress value={v3ReadinessScore()} className="mt-3 h-1.5" />
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {V3_READINESS.byArea.map((a) => (
            <div key={a.area} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between"><span>{a.area}</span><span className="font-mono text-xs">{a.score}</span></div>
              <Progress value={a.score} className="mt-2 h-1" />
              <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{a.status.replace("_", " ")}</div>
            </div>
          ))}
        </div>
      </Card>
    </V3Page>
  ),
});
