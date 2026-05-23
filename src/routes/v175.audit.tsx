import { createFileRoute } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const a = H.useGovernedAutomationAudit();
  return (
    <V175Page icon={<Settings2 className="size-6 text-emerald-300" />} title="Governed Automation Audit Center"
      blurb="Per-action audit trail across automation type, trigger, signal, evidence, explanation, approver, decision, outcome, policy compliance, and exception status.">
      <ScoreCard label="Automation audit score" value={a.score} tone="emerald" />
      <Section title="Automation audit trail">
        <SimpleTable rows={a.trail as any} columns={[
          { key: "id", label: "ID" }, { key: "action", label: "Action" }, { key: "type", label: "Type" },
          { key: "trigger", label: "Trigger" }, { key: "approver", label: "Approver" }, { key: "decision", label: "Decision" },
          { key: "exec_status", label: "Exec" }, { key: "outcome", label: "Outcome" }, { key: "audit", label: "Audit" },
        ]} />
      </Section>
      <Section title="Policy compliance">
        <SimpleTable rows={a.policy_compliance as any} columns={[
          { key: "policy", label: "Policy" }, { key: "rate", label: "Rate" }, { key: "violations", label: "Violations" },
        ]} />
      </Section>
      <Section title="Exception queue">
        <SimpleTable rows={a.exception_queue as any} columns={[
          { key: "id", label: "ID" }, { key: "policy", label: "Policy" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Outcomes (last 4 weeks)">
        <SimpleTable rows={a.outcomes as any} columns={[
          { key: "week", label: "Week" }, { key: "actions", label: "Actions" }, { key: "approved", label: "Approved" },
          { key: "rejected", label: "Rejected" }, { key: "exceptions", label: "Exceptions" },
        ]} />
      </Section>
      <p className="text-xs text-muted-foreground">{a.export_note}</p>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/audit")({ component: Page });
