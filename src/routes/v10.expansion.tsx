import { createFileRoute } from "@tanstack/react-router";
import { Rocket } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Strategic Enterprise Expansion Dashboard";
const BLURB = "Pipeline of enterprise expansion, product lines, regions, partner-led opportunities, decision queue.";

function Page() {
  const x = H.useStrategicEnterpriseExpansion();
  return (
    <V10Page icon={<Rocket className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="In pipeline"      value={x.summary.pipeline_count} tone="sky" />
        <ScoreCard label="Decisions pending" value={x.summary.decisions_pending} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Expansion pipeline</h3>
        <SimpleTable rows={x.pipeline as any} columns={[
          { key: "account", label: "Account" }, { key: "type", label: "Type" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "sponsor", label: "Sponsor", render: (r: any) => <StatusPill status={r.sponsor} /> },
        ]} />
      </Card>
      <Card className="border-amber-400/30 bg-amber-500/5 p-4">
        <h3 className="text-sm font-semibold text-amber-200">Expansion decision queue</h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {x.decisions.map(d => <li key={d.id} className="rounded border border-white/10 bg-black/20 px-3 py-1.5"><span className="text-amber-200">{d.owner}</span> · {d.decision}</li>)}
        </ul>
      </Card>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/expansion")({
  head: () => ({ meta: [{ title: "Strategic Enterprise Expansion Dashboard · Anderoute V10" }] }),
  component: Page,
});
