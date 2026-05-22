import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const m = H.useMarketplaceRevenueGovernance();
  return (
    <V12Page icon={<Megaphone className="size-6 text-cyan-300" />} title="Marketplace Revenue Governance" blurb="Fees, carrier subscriptions, liquidity, dispute and settlement placeholders. Margin and preferred-carrier revenue remain placeholders.">
      <ScoreCard label="Governance score" value={m.score} tone="emerald" />
      <KpiGrid cols={5} items={[
        { label: "Fees (Q)",        value: `$${(m.metrics.fees_usd_q/1000).toFixed(0)}k` },
        { label: "Carrier subs (Q)",value: `$${(m.metrics.carrier_subs_usd_q/1000).toFixed(0)}k` },
        { label: "Txn fees (Q)",    value: `$${(m.metrics.txn_fees_usd_q/1000).toFixed(0)}k` },
        { label: "Adoption",        value: `${m.metrics.adoption_pct}%` },
        { label: "Open disputes",   value: String(m.metrics.disputes_open) },
      ]} />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Marketplace revenue risks</h3>
        <SimpleTable rows={m.risks as any} columns={[
          { key: "risk", label: "Risk" }, { key: "severity", label: "Severity" }, { key: "owner", label: "Owner" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/marketplace")({
  head: () => ({ meta: [{ title: "MP Revenue Governance · V12" }] }),
  component: Page,
});
