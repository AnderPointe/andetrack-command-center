import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const c = H.useV135Concentration();
  return (
    <V135Page icon={<Users className="size-6 text-fuchsia-300" />} title="Customer Concentration Durability" blurb="Top-N concentration over time with trajectory.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Top-10 %" value={c.top10_pct} tone="rose" />
        <ScoreCard label="Top-5 %"  value={c.top5_pct}  tone="amber" />
        <ScoreCard label="Top-1 %"  value={c.top1_pct}  tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Top-10 trend (last 4Q)</h3>
        <SimpleTable rows={c.trend as any} columns={[{ key: "q", label: "Q" }, { key: "top10", label: "Top-10 %" }]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/concentration")({
  head: () => ({ meta: [{ title: "Concentration Durability · V13.5" }] }),
  component: Page,
});
