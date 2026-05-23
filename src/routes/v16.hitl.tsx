import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { Section, SimpleTable } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const a = H.useHITLApprovalGovernance();
  return (
    <V16Page icon={<CheckCircle2 className="size-6 text-cyan-300" />} title="Human-in-the-Loop Approval Governance"
      blurb="Approver roles, SLAs, escalation rules, evidence requirements, and audit trail across all 14 approval areas. No high-impact action executes without explicit human approval.">
      <Section title="Approval role matrix & SLAs">
        <SimpleTable rows={a.areas as any} columns={[
          { key: "area", label: "Area" },
          { key: "approver", label: "Approver role" },
          { key: "sla_h", label: "SLA (h)" },
          { key: "evidence", label: "Required evidence" },
        ]} />
      </Section>
      <Section title="Decision audit trail">
        <SimpleTable rows={a.audit_log as any} columns={[
          { key: "ts", label: "When" },
          { key: "rec", label: "Rec" },
          { key: "action", label: "Action" },
          { key: "actor", label: "Actor" },
          { key: "reason", label: "Reason" },
        ]} />
      </Section>
      <Section title="Owner approval heatmap (7d)">
        <SimpleTable rows={H.useV16OwnerHeatmap() as any} columns={[
          { key: "owner", label: "Owner" },
          { key: "pending", label: "Pending" },
          { key: "approved_7d", label: "Approved 7d" },
          { key: "sla_breach", label: "SLA breach" },
        ]} />
      </Section>
      <Section title="RLS enforced on approvals">
        <SimpleTable rows={H.useV16RlsExamples() as any} columns={[
          { key: "name", label: "Policy" },
          { key: "target", label: "Target" },
          { key: "sql", label: "SQL sketch" },
        ]} />
      </Section>
      <Section title="HITL executive summary">
        <p className="text-sm text-muted-foreground">Approval discipline strong (91% SLA). 3 escalated for SLA breach, all routed to CEO. <code>rec_no_self_approve</code> + <code>evidence_attached_required</code> enforced — approver_id ≠ recommender_id and evidence must be attached before approval.</p>
      </Section>

    </V16Page>
  );
}

export const Route = createFileRoute("/v16/hitl")({ component: Page });
