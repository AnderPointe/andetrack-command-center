import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const p = H.usePartnerChannelScale();
  return (
    <V105Page icon={<Network className="size-6 text-fuchsia-300" />} title="Partner Channel Scale" blurb="Partner-sourced pipeline, joint customers, enablement, partner risk and expansion.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Sourced pipeline %" value={`${p.summary.sourced_pipeline_pct}%`} tone="emerald" />
        <ScoreCard label="Active partners"    value={p.summary.active_partners} tone="sky" />
        <ScoreCard label="Joint customers"    value={p.summary.joint_customers} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Partner rows</h3>
        <SimpleTable rows={p.partners as any} columns={[
          { key: "partner", label: "Partner" }, { key: "motion", label: "Motion" },
          { key: "pipeline", label: "Pipeline" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "risk",   label: "Risk",   render: (r: any) => <StatusPill status={r.risk} /> },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/partner")({
  head: () => ({ meta: [{ title: "Partner Channel · V10.5" }] }),
  component: Page,
});
