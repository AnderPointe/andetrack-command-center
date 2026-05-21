import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable, ScoreCard, KpiGrid } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useFinancialControlMaturity } from "@/v8/hooks";

export const Route = createFileRoute("/v8/financial-maturity")({
  head: () => ({ meta: [{ title: "Financial Control Maturity · Anderoute" }] }),
  component: () => {
    const { maturity, tests } = useFinancialControlMaturity();
    return (
      <V8Page icon={<Receipt className="size-6 text-violet-300" />} title="Financial Control Maturity Center"
        blurb="Maturity, control testing, evidence, and exceptions. Financial audit / SOC 2 / ISO completion is NOT asserted.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Maturity" value={maturity.score} tone="amber" />
          <ScoreCard label="Evidence completeness" value={maturity.evidence_completeness} tone="sky" />
          <ScoreCard label="Exceptions open" value={maturity.exceptions_open} tone="rose" />
          <ScoreCard label="Adjustments open" value={maturity.manual_adjustments_open} tone="rose" />
        </div>
        <KpiGrid cols={3} items={[
          { label: "Billing",          value: maturity.billing_maturity },
          { label: "Usage",            value: maturity.usage_maturity },
          { label: "Marketplace fee",  value: maturity.marketplace_fee_maturity },
          { label: "API overage",      value: maturity.api_overage_maturity },
          { label: "Partner revshare", value: maturity.partner_revshare_maturity },
          { label: "Carrier settle",   value: maturity.carrier_settlement_maturity },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Control tests</h3>
          <SimpleTable rows={tests as any} columns={[
            { key: "control", label: "Control" },
            { key: "owner",   label: "Owner" },
            { key: "status",  label: "Status" },
            { key: "evidence", label: "Evidence" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
