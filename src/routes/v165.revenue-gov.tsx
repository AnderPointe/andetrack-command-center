import { createFileRoute } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const g = H.useRevenueAutomationGovernance();
  return (
    <V165Page icon={<Settings2 className="size-6 text-emerald-300" />} title="Revenue Control Automation Governance"
      blurb="Policy matrix, thresholds, approval rules, audit trail, exceptions, and policy tuning.">
      <Section title="Policy matrix">
        <SimpleTable rows={g.policy_matrix as any} columns={[
          { key: "domain", label: "Domain" }, { key: "confidence_min", label: "Conf ≥" }, { key: "approver", label: "Approver" }, { key: "evidence", label: "Evidence" },
        ]} />
      </Section>
      <Section title="Audit trail">
        <SimpleTable rows={g.audit_trail as any} columns={[
          { key: "ts", label: "When" }, { key: "rec", label: "Rec" }, { key: "action", label: "Action" }, { key: "actor", label: "Actor" },
        ]} />
      </Section>
      <Section title="Tuning suggestions">
        <SimpleTable rows={g.tuning as any} columns={[
          { key: "domain", label: "Domain" }, { key: "suggestion", label: "Suggestion" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/revenue-gov")({ component: Page });
