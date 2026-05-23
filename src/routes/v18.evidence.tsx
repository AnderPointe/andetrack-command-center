import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const e = H.useAutomationGovernanceEvidence();
  return (
    <V18Page icon={<Lock className="size-6 text-violet-300" />} title="Automation Governance Evidence Center"
      blurb="14 evidence categories — policy, approval, recommendation, explainability, source signal, risk, override, rejection, outcome, audit, board-use, external-use, data-room-use, control remediation.">
      <ScoreCard label="Evidence completeness" value={e.score} tone="violet" />
      <Section title="Evidence categories">
        <SimpleTable rows={e.categories as any} columns={[{ key: "category", label: "Category" }, { key: "freshness", label: "Fresh" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Gaps">
        <SimpleTable rows={e.gaps as any} columns={[{ key: "category", label: "Category" }, { key: "gap", label: "Gap" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Approvals">
        <SimpleTable rows={e.approvals as any} columns={[{ key: "item", label: "Item" }, { key: "approver", label: "Approver" }, { key: "status", label: "Status" }]} />
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/evidence")({ component: Page });
