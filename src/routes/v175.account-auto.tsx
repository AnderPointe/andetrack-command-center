import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const a = H.useStrategicAccountAutomationMaturity();
  return (
    <V175Page icon={<Users className="size-6 text-emerald-300" />} title="Strategic Account Automation Maturity Center"
      blurb="Account expansion, renewal/churn, adoption, trust, support burden, exec-sponsor engagement; recommendation/approval/outcome quality.">
      <ScoreCard label="Account automation maturity" value={a.score} tone="emerald" />
      <Section title="Signal matrix">
        <SimpleTable rows={a.signal_matrix as any} columns={[
          { key: "signal", label: "Signal" }, { key: "coverage", label: "Coverage" }, { key: "quality", label: "Quality" },
        ]} />
      </Section>
      <Section title="Recommendation quality">
        <SimpleTable rows={a.rec_quality as any} columns={[
          { key: "type", label: "Type" }, { key: "quality", label: "Quality" }, { key: "evidence", label: "Evidence" },
        ]} />
      </Section>
      <Section title="Approval routing quality">
        <SimpleTable rows={a.approval_routing as any} columns={[
          { key: "tier", label: "Tier" }, { key: "accuracy", label: "Accuracy" }, { key: "sla", label: "SLA" },
        ]} />
      </Section>
      <Section title="Outcomes">
        <SimpleTable rows={a.outcomes as any} columns={[{ key: "week", label: "Week" }, { key: "approved", label: "Approved" }, { key: "lift", label: "Lift" }]} />
      </Section>
      <Section title="Exceptions / plan">
        <SimpleTable rows={a.exceptions as any} columns={[{ key: "id", label: "ID" }, { key: "account", label: "Account" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" }]} />
        <SimpleTable rows={a.plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/account-auto")({ component: Page });
