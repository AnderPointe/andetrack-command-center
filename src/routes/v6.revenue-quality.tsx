import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { ScoreCard, KpiGrid, SimpleTable } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { useRevenueQualityMaturity } from "@/v6/hooks";

export const Route = createFileRoute("/v6/revenue-quality")({
  head: () => ({ meta: [{ title: "Revenue Quality · V6" }] }),
  component: () => {
    const { quality: q, mix } = useRevenueQualityMaturity();
    return (
      <V6Page icon={<TrendingUp className="size-6 text-emerald-300" />} title="Revenue Quality Maturity"
        blurb="Recurring %, usage %, marketplace + API quality, customer concentration, retention/expansion, churn risk, gross margin (placeholder), payment health, billing disputes, predictability and product-line mix.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Quality score" value={q.score} tone="emerald" />
          <ScoreCard label="Recurring (pl)" value={q.recurring_pct_pl} tone="sky" />
          <ScoreCard label="Retention" value={q.retention} tone="violet" />
          <ScoreCard label="Concentration" value={q.concentration} tone="amber" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Marketplace quality", value: q.marketplace_quality },
          { label: "API quality", value: q.api_quality },
          { label: "Expansion (NRR pl)", value: `${q.expansion}%` },
          { label: "Churn risk (pl)", value: `${q.churn_risk}%` },
          { label: "Gross margin (pl)", value: `${q.gross_margin_pl}%` },
          { label: "Payment health", value: `${q.payment_health}%` },
          { label: "Billing disputes", value: q.billing_disputes },
          { label: "Predictability (pl)", value: q.predictability_pl },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Product line mix</h3>
          <div className="mt-2">
            <SimpleTable rows={mix} columns={[{ key: "line", label: "Line" }, { key: "share", label: "Share %" }]} />
          </div>
        </Card>
      </V6Page>
    );
  },
});
