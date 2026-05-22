import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const e = H.useRevenueExpansionMaturity();
  return (
    <V105Page icon={<TrendingUp className="size-6 text-fuchsia-300" />} title="Revenue Expansion Maturity" blurb="Expansion pipeline across product, seats, marketplace, API/EDI, CoPilot, support.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Expansion maturity" value={e.summary.score} tone="emerald" />
        <ScoreCard label="Pipeline count"     value={e.summary.pipeline_count} tone="sky" />
        <ScoreCard label="At risk"            value={e.summary.at_risk} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Expansion pipeline</h3>
        <SimpleTable rows={e.pipeline as any} columns={[
          { key: "account", label: "Account" }, { key: "motion", label: "Motion" }, { key: "arr_band", label: "ARR band" },
          { key: "stage", label: "Stage" },
          { key: "risk",  label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/expansion-rev")({
  head: () => ({ meta: [{ title: "Revenue Expansion · V10.5" }] }),
  component: Page,
});
