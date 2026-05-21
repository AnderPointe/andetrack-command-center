import { createFileRoute } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { KpiGrid, SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MARKETPLACE_OPS, MARKETPLACE_REGIONAL, MARKETPLACE_TREND } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/marketplace-ops")({
  head: () => ({ meta: [{ title: "Marketplace Ops · Anderoute" }] }),
  component: () => {
    const maxPosted = Math.max(...MARKETPLACE_TREND.map(d => d.posted));
    return (
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

        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Posted vs awarded (7d)</h3>
            <div className="mt-3 grid grid-cols-7 items-end gap-2 h-36">
              {MARKETPLACE_TREND.map(d => (
                <div key={d.day} className="flex flex-col items-center gap-1">
                  <div className="flex items-end h-28 gap-0.5">
                    <div className="w-3 rounded-t bg-sky-400/70" style={{ height: `${(d.posted / maxPosted) * 100}%` }} title={`Posted ${d.posted}`} />
                    <div className="w-3 rounded-t bg-emerald-400/70" style={{ height: `${(d.awarded / maxPosted) * 100}%` }} title={`Awarded ${d.awarded}`} />
                  </div>
                  <div className="text-[10px] text-muted-foreground">{d.day}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-[10px] text-muted-foreground">Blue = posted · Green = awarded</div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Regional coverage &amp; gaps</h3>
            <div className="mt-3 space-y-2">
              {MARKETPLACE_REGIONAL.map(r => (
                <div key={r.region}>
                  <div className="flex justify-between text-xs">
                    <span>{r.region}</span>
                    <span className="text-muted-foreground">{r.coverage}% · gap: {r.gap}</span>
                  </div>
                  <Progress value={r.coverage} className="h-1.5 mt-1" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <SimpleTable rows={[
          { metric: "Disputes open", value: MARKETPLACE_OPS.disputes_open, status: MARKETPLACE_OPS.disputes_open > 5 ? "high" : "medium" },
          { metric: "Compliance issues", value: MARKETPLACE_OPS.compliance_issues, status: MARKETPLACE_OPS.compliance_issues > 2 ? "high" : "low" },
        ]} columns={[
          { key: "metric", label: "Health signal" },
          { key: "value", label: "Value" },
          { key: "status", label: "Status", render: r => <StatusPill status={r.status} /> },
        ]} />
      </V45Page>
    );
  },
});
