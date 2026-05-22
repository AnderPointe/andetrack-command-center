import { createFileRoute } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Ecosystem Defensibility Dashboard";
const BLURB = "Moat matrix, switching cost + network effect evidence, defensibility risks, moat investment roadmap.";

function Page() {
  const d = H.useEcosystemDefensibility();
  return (
    <V10Page icon={<Shield className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Defensibility" value={d.summary.score} tone="emerald" />
        <ScoreCard label="Factors"       value={d.matrix.length} tone="sky" />
        <ScoreCard label="Risks"         value={d.risks.length} tone="amber" />
      </div>
      <KpiGrid cols={5} items={d.matrix.map(x => ({ label: x.factor, value: `${x.strength}%` }))} />
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Defensibility risks</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {d.risks.map(r => <li key={r.id} className="rounded border border-white/5 bg-black/20 px-3 py-1.5"><span className="text-amber-200">{r.owner}</span> · {r.risk}</li>)}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Moat investment roadmap</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {d.roadmap.map(x => <li key={x.id} className="rounded border border-white/10 bg-black/20 px-3 py-1.5"><span className="text-amber-200">{x.quarter}</span> · {x.invest}</li>)}
          </ul>
        </Card>
      </div>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/defensibility")({
  head: () => ({ meta: [{ title: "Ecosystem Defensibility Dashboard · Anderoute V10" }] }),
  component: Page,
});
