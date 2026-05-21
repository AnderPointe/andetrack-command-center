import { createFileRoute } from "@tanstack/react-router";
import { DollarSign } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { KpiGrid, ScoreCard } from "@/components/v45/ui-bits";
import { REVENUE_OPS_MATURITY } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/revenue-ops")({
  head: () => ({ meta: [{ title: "Revenue Ops · Anderoute" }] }),
  component: () => (
    <V45Page icon={<DollarSign className="size-6 text-violet-300" />} title="Revenue Operations Maturity"
      blurb="SaaS, marketplace, API, support and partner revenue lines plus expansion, renewal, churn risk, and concentration risk.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Concentration risk (top-3)" value={REVENUE_OPS_MATURITY.concentration_top3_pct} tone={REVENUE_OPS_MATURITY.concentration_top3_pct < 35 ? "emerald" : REVENUE_OPS_MATURITY.concentration_top3_pct < 50 ? "amber" : "rose"} />
        <ScoreCard label="Trial conversion" value={Math.round(REVENUE_OPS_MATURITY.trial_conversion * 100)} tone="sky" />
        <ScoreCard label="Churn risk accounts" value={REVENUE_OPS_MATURITY.churn_risk_accounts * 10} tone="amber" />
      </div>
      <KpiGrid cols={4} items={[
        { label: "SaaS MRR", value: `$${REVENUE_OPS_MATURITY.saas_mrr.toLocaleString()}` },
        { label: "Marketplace MRR", value: `$${REVENUE_OPS_MATURITY.marketplace_mrr.toLocaleString()}` },
        { label: "API MRR", value: `$${REVENUE_OPS_MATURITY.api_mrr.toLocaleString()}` },
        { label: "Enterprise support MRR", value: `$${REVENUE_OPS_MATURITY.enterprise_support_mrr.toLocaleString()}` },
        { label: "Impl fees (placeholder)", value: `$${REVENUE_OPS_MATURITY.implementation_fees.toLocaleString()}` },
        { label: "Expansion pipeline", value: `$${REVENUE_OPS_MATURITY.expansion_pipeline.toLocaleString()}` },
        { label: "Renewal pipeline", value: `$${REVENUE_OPS_MATURITY.renewal_pipeline.toLocaleString()}` },
        { label: "Carrier monetization", value: `$${REVENUE_OPS_MATURITY.carrier_monetization.toLocaleString()}` },
        { label: "Partner monetization", value: `$${REVENUE_OPS_MATURITY.partner_monetization.toLocaleString()}` },
      ]} />
    </V45Page>
  ),
});
