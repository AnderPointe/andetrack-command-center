import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/mp-financial")({
  head: () => ({ meta: [{ title: "Marketplace Financial Optimization · Anderoute" }] }),
  component: () => {
    const m = H.useMarketplaceFinancialOptimization();
    return (<V85Page icon={<TrendingUp className="size-6 text-fuchsia-300" />} title="Marketplace Financial Optimization" blurb="Economics + fee capture + financial risk. Take-rate and margin remain placeholders.">
      <div className="grid gap-3 md:grid-cols-4"><ScoreCard label="Economics" value={m.economics.score} tone="emerald" /><ScoreCard label="Coverage %" value={m.economics.load_coverage_rate} tone="sky" /><ScoreCard label="TT Award (min)" value={m.economics.ttaward_min} tone="amber" /><ScoreCard label="Uncovered %" value={m.economics.uncovered_rate} tone="rose" /></div>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Fee capture by lane class</h3><SimpleTable rows={m.fees as any} columns={[{key:"lane_class",label:"Class"},{key:"capture",label:"Capture %"},{key:"opportunity",label:"Opportunity"}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Financial risks</h3><SimpleTable rows={m.risks as any} columns={[{key:"risk",label:"Risk"},{key:"severity",label:"Severity"}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">Placeholders: take rate · avg load value · carrier acq cost · settlement hold · margin.</Card>
    </V85Page>);
  },
});
