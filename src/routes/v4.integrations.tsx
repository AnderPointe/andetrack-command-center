import { createFileRoute } from "@tanstack/react-router";
import { Plug } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { STRATEGIC_INTEGRATIONS, INTEGRATION_ROLLUP } from "@/v4/data/mockPhase21";

const STATUS_TONE: Record<string, string> = {
  live: "border-emerald-400/40 text-emerald-300",
  test: "border-sky-400/40 text-sky-300",
  security_review: "border-amber-400/40 text-amber-300",
  launch_review: "border-amber-400/40 text-amber-300",
  discovery: "border-white/15",
};

export const Route = createFileRoute("/v4/integrations")({
  head: () => ({ meta: [{ title: "Strategic Integrations · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Plug className="size-6 text-sky-300" />} title="Strategic Integration Program"
      blurb="TMS, telematics, accounting, EDI, ERPs, broker platforms, fuel, maintenance, notifications, AI and mapping — tracked from discovery to launch with category readiness rollups.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Category readiness</h3>
        <div className="mt-2 grid gap-2 md:grid-cols-3">
          {INTEGRATION_ROLLUP.map(c => (
            <div key={c.category} className="rounded border border-white/10 bg-black/20 p-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{c.category}</span>
                <span className="text-xs text-muted-foreground">{c.readiness}%</span>
              </div>
              <Progress value={c.readiness} className="mt-1 h-1.5" />
              <div className="mt-1 text-[10px] text-muted-foreground">
                live {c.live} · in-flight {c.in_flight} · planned {c.planned}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Integration pipeline</h3>
        <div className="mt-2 grid gap-2 text-sm">
          {STRATEGIC_INTEGRATIONS.map(i => (
            <div key={i.id} className="flex items-center justify-between gap-3 rounded border border-white/10 bg-black/20 p-2">
              <div className="min-w-0">
                <div className="font-medium">{i.name}</div>
                <div className="text-xs text-muted-foreground">{i.type} · value {i.value} · complexity {i.complexity} · {i.owner}</div>
              </div>
              <Badge variant="outline" className={STATUS_TONE[i.status] ?? "border-white/15"}>{i.status.replace(/_/g," ")}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </V4Page>
  ),
});
