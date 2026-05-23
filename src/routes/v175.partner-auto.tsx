import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const p = H.usePartnerAutomationMaturity();
  return (
    <V175Page icon={<Network className="size-6 text-emerald-300" />} title="Partner Automation Maturity Center"
      blurb="Partner performance, pipeline, enablement, support burden, integration health, joint-customer signals; partner recommendation/approval/outcome quality.">
      <ScoreCard label="Partner automation maturity" value={p.score} tone="emerald" />
      <Section title="Signal matrix">
        <SimpleTable rows={p.signal_matrix as any} columns={[
          { key: "signal", label: "Signal" }, { key: "coverage", label: "Coverage" }, { key: "quality", label: "Quality" },
        ]} />
      </Section>
      <Section title="Recommendation quality">
        <SimpleTable rows={p.rec_quality as any} columns={[{ key: "type", label: "Type" }, { key: "quality", label: "Quality" }, { key: "evidence", label: "Evidence" }]} />
      </Section>
      <Section title="Approval routing quality">
        <SimpleTable rows={p.approval_routing as any} columns={[{ key: "tier", label: "Tier" }, { key: "accuracy", label: "Accuracy" }, { key: "sla", label: "SLA" }]} />
      </Section>
      <Section title="Outcomes">
        <SimpleTable rows={p.outcomes as any} columns={[{ key: "week", label: "Week" }, { key: "approved", label: "Approved" }, { key: "lift", label: "Lift" }]} />
      </Section>
      <Section title="Exceptions / plan">
        <SimpleTable rows={p.exceptions as any} columns={[{ key: "id", label: "ID" }, { key: "partner", label: "Partner" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" }]} />
        <SimpleTable rows={p.plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/partner-auto")({ component: Page });
