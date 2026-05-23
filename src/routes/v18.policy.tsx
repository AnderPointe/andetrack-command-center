import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const p = H.useAutomationPolicyEnforcement();
  return (
    <V18Page icon={<ShieldAlert className="size-6 text-violet-300" />} title="Automation Policy Enforcement Center"
      blurb="High-impact protection, approval enforcement, risk/confidence thresholds, evidence + explainability requirements, audit logging, external/board/data-room approval, and tenant + data boundaries.">
      <ScoreCard label="Policy enforcement" value={p.score} tone="violet" />
      <Section title="Policy matrix">
        <SimpleTable rows={p.matrix as any} columns={[{ key: "policy", label: "Policy" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Violations">
        <SimpleTable rows={p.violations as any} columns={[{ key: "id", label: "ID" }, { key: "policy", label: "Policy" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Remediation">
        <SimpleTable rows={p.remediation as any} columns={[
          { key: "id", label: "ID" }, { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }, { key: "status", label: "Status" },
        ]} />
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/policy")({ component: Page });
