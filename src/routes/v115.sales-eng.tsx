import { createFileRoute } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const s = H.useSalesEngineeringScale();
  return (
    <V115Page icon={<Wrench className="size-6 text-emerald-300" />} title="Sales Engineering Scale Center" blurb="Coverage, reusable assets, POC win rate, trust deliverables.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Coverage" value={s.summary.coverage_pct} tone="emerald" />
        <ScoreCard label="Reuse" value={s.summary.reuse_pct} tone="sky" />
        <ScoreCard label="Trust pack hit rate" value={s.summary.trust_pack_hit_rate_pct} tone="violet" />
        <ScoreCard label="Active POCs" value={String(s.summary.active_pocs)} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={s.areas as any} columns={[
          { key: "area",   label: "Area" },
          { key: "score",  label: "Score", render: (r: any) => `${r.score}%` },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/sales-eng")({
  head: () => ({ meta: [{ title: "Sales Engineering · V11.5" }] }),
  component: Page,
});
