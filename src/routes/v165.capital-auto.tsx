import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const c = H.useCapitalControlAutomation();
  return (
    <V165Page icon={<Wallet className="size-6 text-emerald-300" />} title="Capital Control Automation Governance"
      blurb="Capital evidence refresh, data room gap detection, investor routing, board capital packet prep, external-use approval — never autonomous.">
      <Section title="Policy matrix">
        <SimpleTable rows={c.policy_matrix as any} columns={[
          { key: "domain", label: "Domain" }, { key: "cadence", label: "Cadence" }, { key: "approver", label: "Approver" },
        ]} />
      </Section>
      <Section title="Evidence">
        <SimpleTable rows={c.evidence as any} columns={[
          { key: "item", label: "Item" }, { key: "owner", label: "Owner" }, { key: "freshness", label: "Freshness" },
        ]} />
      </Section>
      <Section title="Gaps">
        <SimpleTable rows={c.gaps as any} columns={[
          { key: "gap", label: "Gap" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Audit trail">
        <SimpleTable rows={c.audit_trail as any} columns={[
          { key: "ts", label: "When" }, { key: "item", label: "Item" }, { key: "actor", label: "Actor" }, { key: "action", label: "Action" },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/capital-auto")({ component: Page });
