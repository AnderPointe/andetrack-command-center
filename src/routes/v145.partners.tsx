import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const p = H.usePartnerValueExecution();
  const avg = Math.round(p.reduce((s,x)=>s+x.execution,0)/p.length);
  const med = p.filter(x => x.risk === "med").length;
  return (
    <V145Page icon={<Network className="size-6 text-fuchsia-300" />} title="Partner Value Execution Center" blurb="Partner-sourced and influenced pipeline, integration health, enablement, support burden, risk, next action.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Partners tracked" value={p.length} tone="violet" />
        <ScoreCard label="Avg execution" value={`${avg}%`} tone="emerald" />
        <ScoreCard label="Med-risk partners" value={med} tone="amber" />
      </div>
      <Section title="PartnerExecutionMatrix">
        <SimpleTable rows={p as any} columns={[
          { key: "partner", label: "Partner" }, { key: "category", label: "Category" },
          { key: "owner", label: "Owner" }, { key: "execution", label: "Exec %" },
          { key: "pipeline", label: "Pipeline" }, { key: "risk", label: "Risk" },
          { key: "next", label: "Next action" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/partners")({ head: () => ({ meta: [{ title: "Partner Value · V14.5" }] }), component: Page });
