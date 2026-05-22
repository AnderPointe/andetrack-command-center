import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const m = H.useMarketplaceRevenueIntelligence();
  return (
    <V125Page icon={<Megaphone className="size-6 text-teal-300" />} title="Marketplace Revenue Intelligence" blurb="Regional marketplace revenue, quality drivers, dispute / settlement placeholders, action plan.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Intel score"      value={m.score} tone="emerald" />
        <ScoreCard label="MP revenue"       value={`$${(m.metrics.revenue_usd / 1e6).toFixed(1)}M`} tone="sky" />
        <ScoreCard label="Adoption"         value={`${m.metrics.adoption_pct}%`} tone="violet" />
        <ScoreCard label="Coverage"         value={`${m.quality.coverage_pct}%`} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Regional revenue map</h3>
        <SimpleTable rows={m.regions as any} columns={[
          { key: "region", label: "Region" }, { key: "revenue_usd", label: "Revenue", render: (r: any) => `$${(r.revenue_usd / 1e6).toFixed(1)}M` }, { key: "density", label: "Density" }, { key: "risk", label: "Risk" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Quality drivers (placeholder)</h3>
        <ul className="grid gap-1 text-sm md:grid-cols-3">
          <li>Bid density: {m.quality.bid_density}</li>
          <li>TT-Award: {m.quality.tt_award_min} min</li>
          <li>Dispute cost: ${m.quality.dispute_cost_usd_placeholder.toLocaleString()}</li>
          <li>Settlement hold: ${m.quality.settlement_hold_usd_placeholder.toLocaleString()}</li>
          <li>Load txn fees: ${m.metrics.load_txn_fees_usd.toLocaleString()}</li>
          <li>Carrier sub: ${m.metrics.carrier_sub_usd.toLocaleString()}</li>
        </ul>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Action plan</h3>
        <SimpleTable rows={m.action_plan as any} columns={[{ key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "impact", label: "Impact" }]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/marketplace")({
  head: () => ({ meta: [{ title: "MP Intel · V12.5" }] }),
  component: Page,
});
