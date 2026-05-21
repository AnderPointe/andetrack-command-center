import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { KpiGrid, SimpleTable } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { usePlatformEconomicsMaturity } from "@/v65/hooks";

export const Route = createFileRoute("/v65/economics")({
  head: () => ({ meta: [{ title: "Platform Economics Maturity · V6.5 · Anderoute" }] }),
  component: () => {
    const { economics, margins } = usePlatformEconomicsMaturity();
    return (
      <V65Page icon={<Activity className="size-6 text-cyan-300" />} title="Platform Economics Maturity"
        blurb="CAC / LTV / payback (placeholder), marketplace + API unit economics, support cost, expansion / retention / churn impact, partner revenue share. All values are placeholders.">
        <KpiGrid cols={4} items={[
          { label: "CAC (pl)",            value: economics.cac_pl },
          { label: "LTV (pl)",            value: economics.ltv_pl },
          { label: "LTV/CAC (pl)",        value: economics.ltv_cac_pl },
          { label: "Payback (pl)",        value: economics.payback_pl },
          { label: "Mkt take rate (pl)",  value: economics.marketplace_take_rate_pl },
          { label: "API GM (pl)",         value: economics.api_gross_margin_pl },
          { label: "Support % rev (pl)",  value: economics.support_cost_pct_pl },
          { label: "Expansion % (pl)",    value: economics.expansion_pct_pl },
          { label: "Retention % (pl)",    value: economics.retention_pct_pl },
          { label: "Churn impact (pl)",   value: economics.churn_impact_pl },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Product-line margin placeholders</h3>
          <div className="mt-2">
            <SimpleTable rows={margins} columns={[
              { key: "line",       label: "Line" },
              { key: "margin_pl",  label: "Margin % (pl)" },
            ]} />
          </div>
        </Card>
      </V65Page>
    );
  },
});
