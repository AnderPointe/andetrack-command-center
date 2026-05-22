import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const p = H.usePartnerMonetization();
  return (
    <V115Page icon={<Network className="size-6 text-emerald-300" />} title="Partner Ecosystem Monetization" blurb="Partner P&L, sourced and influenced ARR, payouts under review. Mock-only.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Partner ARR share"  value={p.summary.partner_arr_share_pct} tone="emerald" />
        <ScoreCard label="Partner sourced"    value={p.summary.partner_sourced_pct} tone="sky" />
        <ScoreCard label="Active partners"    value={String(p.summary.active_partners)} tone="violet" />
        <ScoreCard label="Paying MP partners" value={String(p.summary.paying_marketplace_partners)} tone="amber" />
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Influenced pipeline" value={`$${(p.ops.influenced_pipeline_usd / 1_000_000).toFixed(1)}M`} tone="emerald" />
        <ScoreCard label="Payout accuracy" value={p.ops.payout_accuracy_pct} tone="sky" />
        <ScoreCard label="Co-sell win rate" value={p.ops.co_sell_win_rate_pct} tone="violet" />
        <ScoreCard label="Recruited QTR" value={String(p.ops.recruited_this_qtr)} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Partner revenue operations</h3>
        <SimpleTable rows={p.partners as any} columns={[
          { key: "partner",         label: "Partner" },
          { key: "sourced_arr",     label: "Sourced ARR",    render: (r: any) => `$${(r.sourced_arr/1000).toFixed(0)}k` },
          { key: "influenced_arr",  label: "Influenced ARR", render: (r: any) => `$${(r.influenced_arr/1000).toFixed(0)}k` },
          { key: "payout_due",      label: "Payout due",     render: (r: any) => `$${(r.payout_due/1000).toFixed(0)}k` },
          { key: "status",          label: "Status",         render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Commercialization focus</h3>
        <p className="mt-2 text-sm text-muted-foreground">Partner monetization is treated as a governed revenue channel with payout integrity, co-sell quality, and marketplace contribution tracked in the same operating system as direct sales.</p>
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/partner")({
  head: () => ({ meta: [{ title: "Partner Monetization · V11.5" }] }),
  component: Page,
});
