import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { ScoreCard, Section, SimpleTable, KpiGrid } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const a = H.useStrategicApprovalOrchestration();
  return (
    <V165Page icon={<ListChecks className="size-6 text-emerald-300" />} title="Strategic Approval Orchestration Center"
      blurb="Routing matrix, escalation rules, SLA health, and audit trail across 13 approval types.">
      <ScoreCard label="Orchestration health" value={a.score} tone="violet" />
      <KpiGrid cols={3} items={[
        { label: "Approved (7d)", value: a.outcome_summary.approved_7d },
        { label: "Rejected (7d)", value: a.outcome_summary.rejected_7d },
        { label: "Escalated (7d)", value: a.outcome_summary.escalated_7d },
      ]} />
      <Section title="Routing matrix">
        <SimpleTable rows={a.routing as any} columns={[
          { key: "type", label: "Type" }, { key: "approver", label: "Approver" }, { key: "backup", label: "Backup" }, { key: "sla_h", label: "SLA (h)" },
        ]} />
      </Section>
      <Section title="Overdue & escalations">
        <SimpleTable rows={a.overdue as any} columns={[
          { key: "id", label: "ID" }, { key: "type", label: "Type" }, { key: "age_h", label: "Age (h)" }, { key: "owner", label: "Owner" },
        ]} />
        <SimpleTable rows={a.escalations as any} columns={[
          { key: "id", label: "ID" }, { key: "to", label: "Escalated to" }, { key: "reason", label: "Reason" },
        ]} />
      </Section>
      <Section title="Audit trail">
        <SimpleTable rows={a.audit_trail as any} columns={[
          { key: "ts", label: "When" }, { key: "id", label: "ID" }, { key: "action", label: "Action" }, { key: "actor", label: "Actor" }, { key: "reason", label: "Reason" },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/approvals")({ component: Page });
