import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const r = H.useRecommendationQualityAssurance();
  return (
    <V18Page icon={<CheckCircle2 className="size-6 text-violet-300" />} title="Recommendation Quality Assurance Center"
      blurb="Source signal quality, evidence/explainability completeness, calibration, duplicate + repeat rates, outcome quality, policy tuning needs.">
      <ScoreCard label="Recommendation QA" value={r.score} tone="violet" />
      <KpiGrid cols={4} items={r.kpis} />
      <Section title="Duplicate detection">
        <SimpleTable rows={r.duplicates as any} columns={[{ key: "id", label: "ID" }, { key: "rec", label: "Recommendation" }, { key: "originals", label: "Originals" }, { key: "status", label: "Status" }]} />
      </Section>
      <Section title="Action plan">
        <SimpleTable rows={r.action_plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/rec-qa")({ component: Page });
