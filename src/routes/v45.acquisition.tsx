import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { ScoreCard } from "@/components/v45/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ACQUISITION_READINESS, DATA_ROOM_CHECKLIST } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/acquisition")({
  head: () => ({ meta: [{ title: "Acquisition · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Briefcase className="size-6 text-violet-300" />} title="Acquisition Readiness Dashboard"
      blurb="Maturity across product, revenue, customers, marketplace, security, compliance, technical, documentation, support, team, data room, and IP. Restricted to platform owners.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Overall" value={ACQUISITION_READINESS.overall} tone="violet" />
        {Object.entries(ACQUISITION_READINESS).filter(([k]) => k !== "overall").map(([k, v]) => (
          <ScoreCard key={k} label={k} value={v as number} tone={(v as number) >= 75 ? "emerald" : (v as number) >= 60 ? "amber" : "rose"} />
        ))}
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Data room checklist</h3>
        <div className="mt-3 space-y-2">
          {DATA_ROOM_CHECKLIST.map(s => (
            <div key={s.section}>
              <div className="flex justify-between text-xs"><span>{s.section}</span><span className="text-muted-foreground">{s.done}/{s.items}</span></div>
              <Progress value={(s.done / s.items) * 100} className="h-1.5 mt-1" />
            </div>
          ))}
        </div>
      </Card>
    </V45Page>
  ),
});
