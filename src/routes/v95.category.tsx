import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const c = H.useCategoryLeadershipExecution();
  return (
    <V95Page icon={<Star className="size-6 text-cyan-300" />} title="Strategic Category Leadership Execution" blurb="Category narrative, competitive positioning, customer/partner/marketplace proof, analyst briefing placeholder, sales enablement, market education, thought leadership.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Category leadership" value={c.summary.score} tone="emerald" />
        <ScoreCard label="Narrative"            value={c.summary.narrative} tone="violet" />
        <ScoreCard label="Proof"                value={c.summary.proof} tone="sky" />
        <ScoreCard label="Competitive"          value={c.summary.competitive} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Execution items</h3>
        <div className="mt-2">
          <SimpleTable rows={c.items as any} columns={[
            { key: "area", label: "Area" },
            { key: "maturity", label: "Maturity", render: (r: any) => `${r.maturity}%` },
            { key: "owner", label: "Owner" },
          ]} />
        </div>
      </Card>
      <Card className="border-cyan-400/30 bg-cyan-500/5 p-4">
        <h3 className="text-sm font-semibold text-cyan-200">Recommendations</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {c.recommendations.map((r) => <li key={r.id}>· {r.action} — owner: {r.owner}</li>)}
        </ul>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/category")({
  head: () => ({ meta: [{ title: "Category Leadership · Anderoute V9.5" }] }),
  component: Page,
});
