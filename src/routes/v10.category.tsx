import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Global Category Leadership Command Center";
const BLURB = "Category leadership score, narrative maturity, differentiation, proof maturity by pillar, gap analysis, action plan.";

function Page() {
  const c = H.useGlobalCategoryLeadership();
  return (
    <V10Page icon={<Crown className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Category leadership" value={c.summary.score} tone="emerald" />
        <ScoreCard label="Pillars tracked"     value={c.pillars.length} tone="sky" />
        <ScoreCard label="Gaps"                value={c.gaps.length} tone="amber" />
      </div>
      <KpiGrid cols={5} items={c.pillars.map(p => ({ label: p.pillar, value: `${p.score}%`, sub: `owner: ${p.owner}` }))} />
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Gap analysis</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {c.gaps.map(g => <li key={g.area} className="rounded border border-rose-400/20 bg-rose-500/5 px-3 py-1.5"><span className="text-rose-200">{g.area}</span> · {g.gap}</li>)}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Action plan</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {c.actions.map(a => <li key={a.id} className="rounded border border-white/10 bg-black/20 px-3 py-1.5"><span className="text-amber-200">{a.owner}</span> · {a.action}</li>)}
          </ul>
        </Card>
      </div>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/category")({
  head: () => ({ meta: [{ title: "Global Category Leadership Command Center · Anderoute V10" }] }),
  component: Page,
});
