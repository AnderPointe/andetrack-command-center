import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const p = H.useProductLineAutomationMaturity();
  return (
    <V175Page icon={<Boxes className="size-6 text-emerald-300" />} title="Product-Line Automation Maturity Center"
      blurb="Per product line: adoption, support, reliability, expansion; product recommendation/approval/outcome quality.">
      <ScoreCard label="Product automation maturity" value={p.score} tone="emerald" />
      <Section title="Product-line signal matrix">
        <SimpleTable rows={p.signal_matrix as any} columns={[
          { key: "line", label: "Product line" }, { key: "adoption", label: "Adoption" }, { key: "support", label: "Support" },
          { key: "reliability", label: "Reliability" }, { key: "expansion", label: "Expansion" },
        ]} />
      </Section>
      <Section title="Recommendation quality">
        <SimpleTable rows={p.rec_quality as any} columns={[{ key: "type", label: "Type" }, { key: "quality", label: "Quality" }]} />
      </Section>
      <Section title="Approval routing quality">
        <SimpleTable rows={p.approval_routing as any} columns={[{ key: "tier", label: "Tier" }, { key: "accuracy", label: "Accuracy" }, { key: "sla", label: "SLA" }]} />
      </Section>
      <Section title="Outcomes">
        <SimpleTable rows={p.outcomes as any} columns={[{ key: "week", label: "Week" }, { key: "approved", label: "Approved" }]} />
      </Section>
      <Section title="Plan">
        <SimpleTable rows={p.plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/product-auto")({ component: Page });
