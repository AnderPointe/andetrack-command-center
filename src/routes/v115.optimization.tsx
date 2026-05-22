import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const o = H.useRevenueOptimization();
  return (
    <V115Page icon={<TrendingUp className="size-6 text-emerald-300" />} title="Revenue Optimization Command Center" blurb="Cross-lever optimization: discount, packaging, take-rate, renewal uplift, partner mix.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Optimization score" value={o.summary.score} tone="emerald" />
        <ScoreCard label="QoQ trend"          value={`+${o.summary.trend_qoq}`} tone="sky" />
        <ScoreCard label="Net uplift"         value={`${o.summary.net_revenue_uplift_pct}%`} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Active optimization levers</h3>
        <SimpleTable rows={o.levers as any} columns={[
          { key: "lever",      label: "Lever" },
          { key: "uplift_pct", label: "Uplift %", render: (r: any) => `${r.uplift_pct}%` },
          { key: "status",     label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "owner",      label: "Owner" },
        ]} />
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/optimization")({
  head: () => ({ meta: [{ title: "Revenue Optimization · V11.5" }] }),
  component: Page,
});
