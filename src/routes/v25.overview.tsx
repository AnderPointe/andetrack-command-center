import { createFileRoute } from "@tanstack/react-router";
import { Rocket } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { V25_READINESS, v25ReadinessScore } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/overview")({
  head: () => ({ meta: [{ title: "V2.5 Overview · Anderoute" }] }),
  component: () => (
    <V25Page icon={<Rocket className="size-6 text-emerald-300" />} title="Anderoute V2.5 Overview"
      blurb="Enterprise-ready logistics SaaS: production EDI, monetized APIs, advanced optimization, white-label portals, larger fleet scaling, and stronger enterprise administration.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">V2.5 release readiness</h2>
          <Badge variant="outline" className="border-emerald-500/40 text-emerald-300">{v25ReadinessScore()} / 100</Badge>
        </div>
        <Progress value={v25ReadinessScore()} className="mt-3 h-1.5" />
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {V25_READINESS.byArea.map((a) => (
            <div key={a.area} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between"><span>{a.area}</span><span className="font-mono text-xs">{a.score}</span></div>
              <Progress value={a.score} className="mt-2 h-1" />
              <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{a.status.replace("_"," ")}</div>
            </div>
          ))}
        </div>
      </Card>
    </V25Page>
  ),
});
