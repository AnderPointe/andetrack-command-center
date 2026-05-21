import { createFileRoute } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { ScoreCard, KpiGrid, SimpleTable } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { useMarketplaceLiquidityIntelligence, useLiquidityTrend } from "@/v6/hooks";

export const Route = createFileRoute("/v6/liquidity")({
  head: () => ({ meta: [{ title: "Marketplace Liquidity · V6" }] }),
  component: () => {
    const { liquidity: l, lanes, heatmap } = useMarketplaceLiquidityIntelligence();
    const { trend } = useLiquidityTrend();
    return (
      <V6Page icon={<Store className="size-6 text-emerald-300" />} title="Marketplace Liquidity Intelligence (V6)"
        blurb="Liquidity, coverage, bids/load, time-to-award, uncovered rate, regional supply/demand, lane density, carrier acceptance/fall-off and marketplace trust.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Liquidity" value={l.score} tone="emerald" />
          <ScoreCard label="Coverage" value={l.coverage} tone="sky" />
          <ScoreCard label="Trust" value={l.trust_score} tone="violet" />
          <ScoreCard label="Revenue quality" value={l.revenue_quality} tone="amber" />
        </div>
        <KpiGrid cols={5} items={[
          { label: "Bids / load", value: l.bids_per_load },
          { label: "Time to 1st bid", value: `${l.time_to_first_bid_min}m` },
          { label: "Time to award", value: `${l.time_to_award_min}m` },
          { label: "Uncovered", value: `${l.uncovered_rate}%` },
          { label: "Carrier acceptance", value: `${l.acceptance}%` },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Lane liquidity matrix</h3>
          <div className="mt-2">
            <SimpleTable rows={lanes} columns={[
              { key: "lane",     label: "Lane" },
              { key: "density",  label: "Density" },
              { key: "bids",     label: "Bids" },
              { key: "award",    label: "Award (m)" },
              { key: "coverage", label: "Coverage %" },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Supply / demand heatmap</h3>
          <div className="mt-3 space-y-2 text-xs">
            {heatmap.map(r => (
              <div key={r.region} className="grid grid-cols-[120px_1fr_60px] items-center gap-2">
                <span className="text-muted-foreground">{r.region}</span>
                <div className="relative h-2 rounded bg-white/5">
                  <div className="absolute inset-y-0 left-0 bg-sky-400/40" style={{ width: `${r.demand}%` }} />
                  <div className="absolute inset-y-0 left-0 bg-emerald-400/70" style={{ width: `${r.supply}%` }} />
                </div>
                <span className={r.gap > 10 ? "text-rose-300" : r.gap > 0 ? "text-amber-300" : "text-emerald-300"}>gap {r.gap}</span>
              </div>
            ))}
          </div>
        </Card>
      </V6Page>
    );
  },
});
