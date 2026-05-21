import { createFileRoute } from "@tanstack/react-router";
import { Users2 } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ENTERPRISE_PIPELINE, LIFECYCLE_KPIS } from "@/v4/data/mockPhase21";

const STAGE_TONE: Record<string,string> = {
  "At Risk": "border-amber-400/40 text-amber-300",
  "Expansion": "border-emerald-400/40 text-emerald-300",
  "Live": "border-sky-400/40 text-sky-300",
};

export const Route = createFileRoute("/v4/lifecycle")({
  head: () => ({ meta: [{ title: "Customer Lifecycle · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Users2 className="size-6 text-sky-300" />} title="Enterprise Customer Lifecycle"
      blurb="Pipeline, health, renewal, expansion and at-risk views across enterprise accounts.">
      <div className="grid gap-3 md:grid-cols-6">
        {Object.entries(LIFECYCLE_KPIS).map(([k,v]) => (
          <Card key={k} className="border-white/10 bg-white/[0.02] p-3">
            <div className="text-[10px] uppercase text-muted-foreground">{k.replace(/_/g," ")}</div>
            <div className="mt-1 text-lg font-semibold">{typeof v === "number" && k.includes("arr") ? `$${(v/1000).toFixed(0)}k` : `${v}${k.endsWith("pct") ? "%" : ""}`}</div>
          </Card>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">{ENTERPRISE_PIPELINE.map(a => (
        <Card key={a.id} className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold">{a.name}</div>
            <Badge variant="outline" className={STAGE_TONE[a.stage] ?? "border-white/15"}>{a.stage}</Badge>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Owner {a.owner} · Renewal {a.renewal}</div>
          <div className="mt-3 text-xs">Health {a.health}</div>
          <Progress value={a.health} className="mt-1 h-1.5" />
          {a.risk && <div className="mt-2 text-xs text-amber-300">⚠ {a.risk}</div>}
        </Card>))}
      </div>
    </V4Page>
  ),
});
