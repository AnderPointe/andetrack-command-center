import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/mp-economics")({
  head: () => ({ meta: [{ title: "Marketplace Economics Optimization · Anderoute" }] }),
  component: () => {
    const m = H.useMarketplaceEconomicsOptimization();
    return (<V85Page icon={<Sparkles className="size-6 text-fuchsia-300" />} title="Marketplace Economics Optimization" blurb="Current → target for each economic goal, with owner.">
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Optimization goals</h3><SimpleTable rows={m.goals as any} columns={[{key:"goal",label:"Goal"},{key:"current",label:"Current"},{key:"target",label:"Target"},{key:"owner",label:"Owner"}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Regional liquidity actions</h3><SimpleTable rows={m.liquidity as any} columns={[{key:"region",label:"Region"},{key:"liquidity",label:"Liquidity"},{key:"action",label:"Action"}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Bid density</h3><SimpleTable rows={m.bids as any} columns={[{key:"lane_class",label:"Class"},{key:"bids",label:"Bids"},{key:"target",label:"Target"}]} /></Card>
    </V85Page>);
  },
});
