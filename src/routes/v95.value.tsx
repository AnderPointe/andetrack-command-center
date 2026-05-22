import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const v = H.usePlatformValueCreation();
  return (
    <V95Page icon={<TrendingUp className="size-6 text-cyan-300" />} title="Platform Value Creation Dashboard" blurb="Revenue quality, retention, expansion, marketplace, API monetization, partner ecosystem, defensibility, switching costs.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Value score"   value={v.summary.score} tone="emerald" />
        <ScoreCard label="Value drivers" value={v.drivers.length} tone="sky" />
        <ScoreCard label="Actions"       value={v.actions.length} tone="violet" />
      </div>
      <KpiGrid cols={4} items={v.drivers.map(d => ({ label: d.driver, value: `${d.score}%` }))} />
      <Card className="border-cyan-400/30 bg-cyan-500/5 p-4">
        <h3 className="text-sm font-semibold text-cyan-200">Value creation action plan</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {v.actions.map((a) => <li key={a.id}>· {a.area} — {a.action} (owner: {a.owner})</li>)}
        </ul>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/value")({
  head: () => ({ meta: [{ title: "Value Creation · Anderoute V9.5" }] }),
  component: Page,
});
