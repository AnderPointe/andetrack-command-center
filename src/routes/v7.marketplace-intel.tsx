import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable, StatusPill, ScoreCard, KpiGrid } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAdvancedMarketplaceIntelligence } from "@/v7/hooks";

export const Route = createFileRoute("/v7/marketplace-intel")({
  head: () => ({ meta: [{ title: "Marketplace Intelligence · V7 · Anderoute" }] }),
  component: () => {
    const { intel, concentration, opportunities } = useAdvancedMarketplaceIntelligence();
    return (
      <V7Page icon={<Activity className="size-6 text-indigo-300" />} title="Advanced Marketplace Intelligence"
        blurb="Liquidity by region, coverage rate, bid behavior, carrier/customer concentration, lane opportunities. Liquidity is NOT guaranteed.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Coverage rate"     value={intel.coverage_rate}   tone="emerald" />
          <ScoreCard label="Revenue quality"   value={intel.revenue_quality} tone="sky" />
          <ScoreCard label="No-show / dispute" value={Math.round(100 - intel.no_show_risk - intel.dispute_risk)} tone="amber" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Avg bids/load",     value: intel.avg_bids },
          { label: "Time to first bid", value: intel.time_to_first_bid },
          { label: "Time to award",     value: intel.time_to_award },
          { label: "No-show risk %",    value: intel.no_show_risk },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Liquidity by region</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {intel.liquidity_by_region.map(l => (
              <div key={l.region} className="rounded-md border border-white/5 bg-white/[0.02] p-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span>{l.region}</span>
                  <span className="font-semibold">{l.liquidity}%</span>
                </div>
                <Progress value={l.liquidity} className="mt-1.5 h-1" />
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Concentration risk</h3>
          <div className="mt-2">
            <SimpleTable rows={concentration as any} columns={[
              { key: "entity",   label: "Entity" },
              { key: "share",    label: "Share %" },
              { key: "severity", label: "Severity", render: (r: any) => <StatusPill status={r.severity} /> },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Lane opportunities</h3>
          <div className="mt-2">
            <SimpleTable rows={opportunities as any} columns={[
              { key: "lane",    label: "Lane" },
              { key: "insight", label: "Insight" },
              { key: "action",  label: "Action" },
            ]} />
          </div>
        </Card>
      </V7Page>
    );
  },
});
