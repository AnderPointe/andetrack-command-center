import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Customer Outcomes Dashboard";
const BLURB = "Quantified outcomes across dispatch, driver, portal, POD, ETA, MP, support, integrations, CoPilot.";

function Page() {
  const o = H.useCustomerOutcomes();
  return (
    <V10Page icon={<Sparkles className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="Outcome score" value={o.summary.score} tone="emerald" />
        <ScoreCard label="Areas tracked" value={o.areas.length} tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Outcome areas + evidence</h3>
        <SimpleTable rows={o.areas as any} columns={[
          { key: "area", label: "Area" },
          { key: "score", label: "Score", render: (r: any) => `${r.score}%` },
          { key: "evidence", label: "Evidence" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Customer value timeline</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {o.timeline.map(t => <li key={t.quarter} className="rounded border border-white/5 bg-black/20 px-3 py-1.5"><span className="text-amber-200">{t.quarter}</span> · {t.milestone}</li>)}
        </ul>
      </Card>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/outcomes")({
  head: () => ({ meta: [{ title: "Customer Outcomes Dashboard · Anderoute V10" }] }),
  component: Page,
});
