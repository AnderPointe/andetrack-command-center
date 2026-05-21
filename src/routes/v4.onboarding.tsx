import { createFileRoute } from "@tanstack/react-router";
import { Factory } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ONBOARDING_STAGES_DETAIL, ONBOARDING_KPIS } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/onboarding")({
  head: () => ({ meta: [{ title: "Enterprise Onboarding · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Factory className="size-6 text-sky-300" />} title="Enterprise Onboarding Factory"
      blurb="Repeatable enterprise onboarding template with ownership, SLA per stage, and automation status across 14 stages.">
      <div className="grid gap-3 md:grid-cols-5">
        {Object.entries(ONBOARDING_KPIS).map(([k,v]) => (
          <Card key={k} className="border-white/10 bg-white/[0.02] p-3">
            <div className="text-[10px] uppercase text-muted-foreground">{k.replace(/_/g," ")}</div>
            <div className="mt-1 text-xl font-semibold">{v}</div>
          </Card>
        ))}
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Stage template</h3>
        <ol className="mt-2 grid gap-2 text-sm md:grid-cols-2">
          {ONBOARDING_STAGES_DETAIL.map((s,i) => (
            <li key={s.stage} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
              <div className="min-w-0">
                <div className="text-[10px] uppercase text-muted-foreground">Step {i+1} · {s.owner}</div>
                <div>{s.stage}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-white/15 text-[10px]">{s.status}</Badge>
                <Badge variant="outline" className="border-white/15 text-[10px]">{s.sla_days}d</Badge>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </V4Page>
  ),
});
