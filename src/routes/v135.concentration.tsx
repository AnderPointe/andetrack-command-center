import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, TrendBars } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const c = H.useV135Concentration();
  const r = H.useV135ConcentrationReduction();
  return (
    <V135Page icon={<Users className="size-6 text-fuchsia-300" />} title="Customer Concentration Reduction & Durability" blurb="Top-N concentration with reduction plays, owners, and per-play impact targets.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Top-10 %"   value={c.top10_pct}     tone="rose" />
        <ScoreCard label="Top-5 %"    value={c.top5_pct}      tone="amber" />
        <ScoreCard label="Top-1 %"    value={c.top1_pct}      tone="sky" />
        <ScoreCard label="Target %"   value={r.target_pct}    tone="emerald" />
      </div>
      <TrendBars title="Top-10 concentration trend (lower is better)" accent="bg-rose-400/60" labelColor="text-rose-200"
        points={c.trend.map((t) => ({ label: t.q, value: t.top10 }))} />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Reduction plays · gap {r.gap_pct}pp</h3>
        <SimpleTable rows={r.plays as any} columns={[
          { key: "play", label: "Play" }, { key: "owner", label: "Owner" },
          { key: "impact", label: "Impact" }, { key: "due", label: "Due" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/concentration")({
  head: () => ({ meta: [{ title: "Concentration Durability · V13.5" }] }),
  component: Page,
});
