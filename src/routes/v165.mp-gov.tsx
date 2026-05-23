import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const g = H.useMarketplaceAutomationGovernance();
  return (
    <V165Page icon={<Megaphone className="size-6 text-emerald-300" />} title="Marketplace Control Automation Governance"
      blurb="Per-signal thresholds, approvers, audit trail, exceptions, and outcome tracking for marketplace controls.">
      <Section title="Policy matrix">
        <SimpleTable rows={g.policy_matrix as any} columns={[
          { key: "signal", label: "Signal" }, { key: "threshold", label: "Threshold" }, { key: "approver", label: "Approver" },
        ]} />
      </Section>
      <Section title="Audit trail">
        <SimpleTable rows={g.audit_trail as any} columns={[
          { key: "ts", label: "When" }, { key: "rec", label: "Rec" }, { key: "action", label: "Action" }, { key: "actor", label: "Actor" },
        ]} />
      </Section>
      <Section title="Exceptions">
        <SimpleTable rows={g.exceptions as any} columns={[
          { key: "id", label: "ID" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Outcomes">
        <SimpleTable rows={g.outcomes as any} columns={[
          { key: "rec", label: "Rec" }, { key: "predicted", label: "Predicted" }, { key: "actual", label: "Actual" },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/mp-gov")({ component: Page });
