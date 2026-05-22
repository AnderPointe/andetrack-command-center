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
        <ScoreCard label="Active partners"    value={p.summary.active_partners} tone="violet" />
        <ScoreCard label="Paying MP partners" value={p.summary.paying_marketplace_partners} tone="amber" />
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
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/partner")({
  head: () => ({ meta: [{ title: "Partner Monetization · V11.5" }] }),
  component: Page,
});
