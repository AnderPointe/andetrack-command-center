import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const m = H.useMarketplaceIntelligenceOptimization();
  return (
    <V95Page icon={<TrendingUp className="size-6 text-cyan-300" />} title="Marketplace Intelligence Optimization Center" blurb="Liquidity, coverage, bid density, time to award, carrier quality / compliance / concentration, lane coverage, dispute rate, MP trust score.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="MP optimization" value={m.summary.score} tone="emerald" />
        <ScoreCard label="Metrics tracked" value={m.metrics.length} tone="sky" />
        <ScoreCard label="Regions"         value={m.regional.length} tone="violet" />
      </div>
      <KpiGrid cols={5} items={m.metrics.map(x => ({ label: x.metric, value: String(x.value) }))} />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Regional liquidity</h3>
        <div className="mt-2">
          <SimpleTable rows={m.regional as any} columns={[
            { key: "region", label: "Region" },
            { key: "liquidity", label: "Liquidity", render: (r: any) => `${r.liquidity}%` },
            { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
          ]} />
        </div>
      </Card>
      <Card className="border-cyan-400/30 bg-cyan-500/5 p-4">
        <h3 className="text-sm font-semibold text-cyan-200">Optimization plan</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {m.plan.map((p) => (
            <li key={p.id}>· {p.action} — owner: {p.owner} (ETA {p.eta})</li>
          ))}
        </ul>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/mp-intel")({
  head: () => ({ meta: [{ title: "MP Intelligence · Anderoute V9.5" }] }),
  component: Page,
});
