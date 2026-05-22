import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Marketplace Value Proof Center";
const BLURB = "Quantified marketplace proof: coverage, bids, time-to-award, dispute rate, regional liquidity.";

function Page() {
  const m = H.useMarketplaceValueProof();
  return (
    <V10Page icon={<TrendingUp className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="MP proof score" value={m.summary.score} tone="emerald" />
        <ScoreCard label="Trend"          value={`+${m.summary.trend_pts} pts`} tone="sky" />
        <ScoreCard label="Regions covered" value={m.regional.length} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Proof metrics</h3>
        <SimpleTable rows={m.metrics as any} columns={[{ key: "metric", label: "Metric" }, { key: "value", label: "Value" }]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Regional liquidity</h3>
        <SimpleTable rows={m.regional as any} columns={[
          { key: "region", label: "Region" },
          { key: "liquidity", label: "Liquidity", render: (r: any) => `${r.liquidity}%` },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/mp-proof")({
  head: () => ({ meta: [{ title: "Marketplace Value Proof Center · Anderoute V10" }] }),
  component: Page,
});
