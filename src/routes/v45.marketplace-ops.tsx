import { createFileRoute } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { KpiGrid, SimpleTable } from "@/components/v45/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MARKETPLACE_OPS, MARKETPLACE_REGIONAL } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/marketplace-ops")({
  head: () => ({ meta: [{ title: "Marketplace Ops · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Store className="size-6 text-violet-300" />} title="National Marketplace Operations Center"
      blurb="Live mock dataset: load flow, supply/demand balance, regional coverage, dispute health, and marketplace revenue.">
      <KpiGrid cols={4} items={[
        { label: "Total loads", value: MARKETPLACE_OPS.total_loads.toLocaleString() },
        { label: "Posted", value: MARKETPLACE_OPS.posted.toLocaleString() },
        { label: "Awarded", value: MARKETPLACE_OPS.awarded.toLocaleString() },
        { label: "Open bids", value: MARKETPLACE_OPS.open_bids },
        { label: "Accept rate", value: `${MARKETPLACE_OPS.accept_rate}%` },
        { label: "Reject rate", value: `${MARKETPLACE_OPS.reject_rate}%` },
        { label: "Avg time to award", value: `${MARKETPLACE_OPS.avg_time_to_award_min}m` },
        { label: "MTD revenue", value: `$${MARKETPLACE_OPS.marketplace_revenue_mtd.toLocaleString()}` },
      ]} />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Regional coverage & gaps</h3>
        <div className="mt-3 space-y-2">
          {MARKETPLACE_REGIONAL.map(r => (
            <div key={r.region}>
              <div className="flex justify-between text-xs"><span>{r.region}</span><span className="text-muted-foreground">{r.coverage}% · gap: {r.gap}</span></div>
              <Progress value={r.coverage} className="h-1.5 mt-1" />
            </div>
          ))}
        </div>
      </Card>
      <SimpleTable rows={[
        { metric: "Disputes open", value: MARKETPLACE_OPS.disputes_open },
        { metric: "Compliance issues", value: MARKETPLACE_OPS.compliance_issues },
      ]} columns={[{ key: "metric", label: "Health signal" }, { key: "value", label: "Value" }]} />
    </V45Page>
  ),
});
