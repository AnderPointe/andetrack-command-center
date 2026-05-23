import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const mp = H.useV135MpOptimization();
  return (
    <V135Page icon={<Megaphone className="size-6 text-fuchsia-300" />} title="Marketplace Economics Optimization" blurb="Optimization signals across take rate, GM, density, NPS, disputes, and cycle time.">
      <ScoreCard label="MP optimization score" value={mp.score} tone="violet" />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={mp.metrics as any} columns={[
          { key: "metric", label: "Metric" }, { key: "value", label: "Value" }, { key: "trend", label: "Trend" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/mp-optimization")({
  head: () => ({ meta: [{ title: "MP Optimization · V13.5" }] }),
  component: Page,
});
