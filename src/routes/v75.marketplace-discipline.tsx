import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalMarketplaceDiscipline } from "@/v75/hooks";

export const Route = createFileRoute("/v75/marketplace-discipline")({
  head: () => ({ meta: [{ title: "Marketplace Operating Discipline · V7.5 · Anderoute" }] }),
  component: () => {
    const { discipline, trend } = useGlobalMarketplaceDiscipline();
    return (
      <V75Page icon={<Activity className="size-6 text-indigo-300" />} title="Global Marketplace Operating Discipline"
        blurb="Policy adherence, carrier verification/quality/suspension, dispute SLA, load award/settlement/fee controls, regional health.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Discipline score" value={discipline.score} tone="emerald" />
          <ScoreCard label="Exceptions" value={discipline.controls.filter(c => c.status === "exception").length} tone="amber" />
          <ScoreCard label="Regions tracked" value={discipline.regional.length} tone="sky" />
          <ScoreCard label="Trend (6w)" value={`+${discipline.score - trend[0].score}`} tone="violet" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Discipline trend (last 6 weeks)</h3>
          <SimpleTable rows={trend as any} columns={[
            { key: "week",       label: "Week" },
            { key: "score",      label: "Score", render: (r: any) => `${r.score}%` },
            { key: "exceptions", label: "Exceptions" },
          ]} />
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Controls</h3>
          <div className="mt-2">
            <SimpleTable rows={discipline.controls as any} columns={[
              { key: "control", label: "Control" },
              { key: "status",  label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Regional health</h3>
          <div className="mt-2">
            <SimpleTable rows={discipline.regional as any} columns={[
              { key: "region",   label: "Region" },
              { key: "health",   label: "Health", render: (r: any) => <StatusPill status={r.health} /> },
              { key: "carriers", label: "Carriers" },
              { key: "gaps",     label: "Gaps" },
            ]} />
          </div>
        </Card>
      </V75Page>
    );
  },
});
