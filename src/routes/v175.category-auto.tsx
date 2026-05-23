import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const c = H.useCategoryAutomationMaturity();
  return (
    <V175Page icon={<Megaphone className="size-6 text-emerald-300" />} title="Category Leadership Automation Maturity Center"
      blurb="Narrative, proof assets, market education, competitive positioning, differentiation, sales/web/board narrative; proof publishing approval quality.">
      <ScoreCard label="Category automation maturity" value={c.score} tone="emerald" />
      <Section title="Signal matrix">
        <SimpleTable rows={c.signal_matrix as any} columns={[
          { key: "signal", label: "Signal" }, { key: "coverage", label: "Coverage" }, { key: "quality", label: "Quality" },
        ]} />
      </Section>
      <Section title="Recommendation quality">
        <SimpleTable rows={c.rec_quality as any} columns={[{ key: "type", label: "Type" }, { key: "quality", label: "Quality" }, { key: "evidence", label: "Evidence" }]} />
      </Section>
      <Section title="Proof publishing approval">
        <SimpleTable rows={c.proof_approval as any} columns={[{ key: "stage", label: "Stage" }, { key: "sla", label: "SLA" }, { key: "actual", label: "Actual" }]} />
      </Section>
      <Section title="Outcomes">
        <SimpleTable rows={c.outcomes as any} columns={[{ key: "week", label: "Week" }, { key: "approved", label: "Approved" }, { key: "published", label: "Published" }]} />
      </Section>
      <Section title="Exceptions / plan">
        <SimpleTable rows={c.exceptions as any} columns={[{ key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" }]} />
        <SimpleTable rows={c.plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/category-auto")({ component: Page });
