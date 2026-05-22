import { createFileRoute } from "@tanstack/react-router";
import { Plug } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Partner Ecosystem Value Center";
const BLURB = "Partner revenue, sourced pipeline, joint customers, partner health/risk, action plan.";

function Page() {
  const p = H.usePartnerEcosystemValue();
  return (
    <V10Page icon={<Plug className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="Partner value score" value={p.summary.score} tone="emerald" />
        <ScoreCard label="Sourced pipeline"    value={p.summary.sourced_pipeline} tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Partners</h3>
        <SimpleTable rows={p.partners as any} columns={[
          { key: "partner", label: "Partner" }, { key: "revenue", label: "Rev %", render: (r: any) => `${r.revenue}` },
          { key: "joint_customers", label: "Joint customers" }, { key: "health", label: "Health", render: (r: any) => `${r.health}%` },
          { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Partner action plan</h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {p.actions.map(a => <li key={a.id} className="rounded border border-white/10 bg-black/20 px-3 py-1.5"><span className="text-amber-200">{a.owner}</span> · {a.action}</li>)}
        </ul>
      </Card>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/partner")({
  head: () => ({ meta: [{ title: "Partner Ecosystem Value Center · Anderoute V10" }] }),
  component: Page,
});
