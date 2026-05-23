import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const b = H.useBoardAutomationEvidence();
  return (
    <V175Page icon={<Lock className="size-6 text-emerald-300" />} title="Board Automation Evidence Center"
      blurb="Per-item board evidence with source, owner, freshness, approval status, board-/external-/data-room readiness, and remediation tracking.">
      <ScoreCard label="Board automation evidence" value={b.score} tone="emerald" />
      <Section title="Board evidence automation queue">
        <SimpleTable rows={b.queue as any} columns={[
          { key: "id", label: "ID" }, { key: "category", label: "Category" }, { key: "source", label: "Source" },
          { key: "owner", label: "Owner" }, { key: "freshness", label: "Freshness" }, { key: "approval", label: "Approval" },
          { key: "packet", label: "Packet" },
        ]} />
      </Section>
      <Section title="Category matrix">
        <SimpleTable rows={b.category_matrix as any} columns={[
          { key: "category", label: "Category" }, { key: "coverage", label: "Coverage" }, { key: "board_ready", label: "Board-ready" },
        ]} />
      </Section>
      <Section title="Missing evidence">
        <SimpleTable rows={b.missing as any} columns={[
          { key: "category", label: "Category" }, { key: "remediation_owner", label: "Owner" }, { key: "due", label: "Due" },
        ]} />
      </Section>
      <Section title="Approval workflow">
        <SimpleTable rows={b.approval_workflow as any} columns={[
          { key: "stage", label: "Stage" }, { key: "sla", label: "SLA" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Audit trail">
        <SimpleTable rows={b.audit_trail as any} columns={[
          { key: "ts", label: "When" }, { key: "actor", label: "Actor" }, { key: "action", label: "Action" }, { key: "evidence", label: "Evidence" },
        ]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/board-evidence")({ component: Page });
