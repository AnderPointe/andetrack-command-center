import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useRegionalMarketplaceLiquidity } from "@/v8/hooks";

export const Route = createFileRoute("/v8/regional-liquidity")({
  head: () => ({ meta: [{ title: "Regional Marketplace Liquidity · Anderoute" }] }),
  component: () => {
    const { regions, lanes } = useRegionalMarketplaceLiquidity();
    return (
      <V8Page icon={<Activity className="size-6 text-violet-300" />} title="Regional Marketplace Liquidity"
        blurb="Liquidity, coverage, uncovered loads, bid depth, carrier/equipment availability, acceptance, award time, lane liquidity, and concentration risk.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={regions as any} columns={[
            { key: "region", label: "Region" },
            { key: "liquidity", label: "Liquidity" },
            { key: "coverage", label: "Cov %" },
            { key: "uncovered", label: "Uncovered" },
            { key: "avg_bids", label: "Avg bids" },
            { key: "carrier_avail", label: "Carriers" },
            { key: "equip", label: "Equip" },
            { key: "accept", label: "Accept %" },
            { key: "ttaward_min", label: "TTAward" },
            { key: "trust", label: "Trust" },
            { key: "conc_carrier", label: "Carrier conc" },
            { key: "conc_customer", label: "Cust conc" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Lane liquidity heatmap</h3>
          <SimpleTable rows={lanes as any} columns={[
            { key: "lane", label: "Lane" },
            { key: "liquidity", label: "Liquidity" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
