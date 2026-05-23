import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const p = H.usePartnerControlAutomation();
  return (
    <V165Page icon={<Network className="size-6 text-emerald-300" />} title="Partner Control Automation Governance"
      blurb="Partner performance, enablement gap, support, revenue signal, risk routing, and campaign recommendation routing — human-approved.">
      <Section title="Policy matrix">
        <SimpleTable rows={p.policy_matrix as any} columns={[
          { key: "signal", label: "Signal" }, { key: "approver", label: "Approver" },
        ]} />
      </Section>
      <Section title="Routing">
        <SimpleTable rows={p.routing as any} columns={[
          { key: "partner", label: "Partner" }, { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Evidence">
        <SimpleTable rows={p.evidence as any} columns={[
          { key: "partner", label: "Partner" }, { key: "evidence", label: "Evidence" }, { key: "freshness", label: "Freshness" },
        ]} />
      </Section>
      <Section title="Outcomes">
        <SimpleTable rows={p.outcomes as any} columns={[
          { key: "rec", label: "Rec" }, { key: "predicted", label: "Predicted" }, { key: "actual", label: "Actual" },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/partner-auto")({ component: Page });
