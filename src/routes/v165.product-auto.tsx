import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const p = H.useProductLineControlAutomation();
  return (
    <V165Page icon={<Boxes className="size-6 text-emerald-300" />} title="Product-Line Control Automation Governance"
      blurb="Adoption, support burden, reliability, tech-debt placeholder, and investment rec routing — human-approved.">
      <Section title="Policy matrix">
        <SimpleTable rows={p.policy_matrix as any} columns={[
          { key: "signal", label: "Signal" }, { key: "approver", label: "Approver" },
        ]} />
      </Section>
      <Section title="Routing">
        <SimpleTable rows={p.routing as any} columns={[
          { key: "product", label: "Product" }, { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Evidence">
        <SimpleTable rows={p.evidence as any} columns={[
          { key: "product", label: "Product" }, { key: "evidence", label: "Evidence" }, { key: "freshness", label: "Freshness" },
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
export const Route = createFileRoute("/v165/product-auto")({ component: Page });
