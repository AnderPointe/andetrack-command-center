import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const g = H.useLongTermGrowthGovernance();
  const avg = Math.round(g.reduce((s, r) => s + r.maturity, 0) / g.length);
  const top = g.filter((r) => r.maturity >= 82).length;
  const low = g.filter((r) => r.maturity < 75).length;
  return (
    <V125Page icon={<Map className="size-6 text-teal-300" />} title="Long-Term Growth Governance Model" blurb="13 governance functions with owners, cadence, maturity score.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Functions"  value={g.length} tone="sky" />
        <ScoreCard label="Avg maturity" value={avg}    tone="emerald" />
        <ScoreCard label="≥ 82"       value={top}      tone="violet" />
        <ScoreCard label="< 75"       value={low}      tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={g as any} columns={[
          { key: "fn", label: "Function" }, { key: "owner", label: "Owner" }, { key: "maturity", label: "Maturity" }, { key: "cadence", label: "Cadence" },
        ]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/governance")({
  head: () => ({ meta: [{ title: "Growth Governance · V12.5" }] }),
  component: Page,
});
