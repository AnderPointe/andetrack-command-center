import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const a = H.useStrategicAccountControlAutomation();
  return (
    <V165Page icon={<Users className="size-6 text-emerald-300" />} title="Strategic Account Control Automation"
      blurb="Expansion, renewal, churn, adoption, support burden, trust, and sponsor signals routed for human approval.">
      <Section title="Policy matrix">
        <SimpleTable rows={a.policy_matrix as any} columns={[
          { key: "signal", label: "Signal" }, { key: "approver", label: "Approver" },
        ]} />
      </Section>
      <Section title="Routing">
        <SimpleTable rows={a.routing as any} columns={[
          { key: "acct", label: "Account" }, { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Evidence">
        <SimpleTable rows={a.evidence as any} columns={[
          { key: "acct", label: "Account" }, { key: "evidence", label: "Evidence" }, { key: "freshness", label: "Freshness" },
        ]} />
      </Section>
      <Section title="Outcomes">
        <SimpleTable rows={a.outcomes as any} columns={[
          { key: "rec", label: "Rec" }, { key: "predicted", label: "Predicted" }, { key: "actual", label: "Actual" },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/account-auto")({ component: Page });
