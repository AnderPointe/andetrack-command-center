import { createFileRoute } from "@tanstack/react-router";
import { Cpu } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { OPT_GOALS, MULTI_LOAD_ASSIGNMENTS } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/optimization")({
  head: () => ({ meta: [{ title: "Advanced Optimization · Anderoute" }] }),
  component: () => (
    <V25Page icon={<Cpu className="size-6 text-emerald-300" />} title="Advanced Optimization Center" blurb="Multi-load assignments, deadhead reduction, driver and vehicle utilization, customer priority, and delivery window protection — all with human approval.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Optimization goals (weighted)</h2>
        <div className="mt-3 space-y-2">
          {OPT_GOALS.map((g) => (
            <div key={g.id} className="flex items-center gap-3 text-sm">
              <div className="w-48">{g.label}</div>
              <Progress value={g.weight * 2} className="h-1 flex-1" />
              <div className="w-12 text-right font-mono text-xs">{g.weight}%</div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Multi-load assignment suggestions</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {MULTI_LOAD_ASSIGNMENTS.map((a) => (
            <div key={a.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between">
                <div><span className="font-medium">{a.driver}</span> <span className="text-xs text-muted-foreground">· {a.loads.join(" + ")}</span></div>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">{a.savings}</Badge>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div><span className="text-muted-foreground">Miles:</span> {a.miles}</div>
                <div><span className="text-muted-foreground">Deadhead:</span> {a.deadhead}</div>
                <div><span className="text-muted-foreground">ETA conf:</span> {a.etaConfidence}%</div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{a.explanation}</div>
            </div>
          ))}
        </div>
      </Card>
    </V25Page>
  ),
});
