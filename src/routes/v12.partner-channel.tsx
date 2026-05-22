import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const p = H.usePartnerChannelMaturity();
  return (
    <V12Page icon={<Network className="size-6 text-cyan-300" />} title="Partner Channel Maturity Center" blurb="Sourced and influenced pipeline, joint customers, enablement maturity, and partner risk.">
      <ScoreCard label="Channel maturity" value={p.score} tone="emerald" />
      <KpiGrid cols={4} items={[
        { label: "Sourced pipeline",    value: `$${(p.sourced_pipeline_usd/1_000_000).toFixed(1)}M` },
        { label: "Influenced pipeline", value: `$${(p.influenced_pipeline_usd/1_000_000).toFixed(1)}M` },
        { label: "Joint customers",     value: String(p.joint_customers) },
        { label: "Active partners",     value: String(p.partners_active) },
      ]} />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={p.partners as any} columns={[
          { key: "partner", label: "Partner" }, { key: "role", label: "Role" },
          { key: "pipeline_usd", label: "Pipeline", render: (r: any) => `$${(r.pipeline_usd/1_000_000).toFixed(2)}M` },
          { key: "enablement", label: "Enablement", render: (r: any) => `${r.enablement}%` },
          { key: "risk", label: "Risk" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/partner-channel")({
  head: () => ({ meta: [{ title: "Partner Channel Maturity · V12" }] }),
  component: Page,
});
