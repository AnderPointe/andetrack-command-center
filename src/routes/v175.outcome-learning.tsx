import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const o = H.useOutcomeLearningMaturity();
  return (
    <V175Page icon={<Radar className="size-6 text-emerald-300" />} title="Outcome Learning Maturity Center"
      blurb="Recommendation + automation outcomes by domain, confidence calibration, policy tuning suggestions, and lessons learned.">
      <ScoreCard label="Outcome learning maturity" value={o.score} tone="emerald" />
      <KpiGrid cols={4} items={[
        { label: "Brier score", value: o.confidence_calibration.brier },
        { label: "Within ±10%", value: o.confidence_calibration.within_10 },
        { label: "False positive", value: o.confidence_calibration.fp_pct },
        { label: "False negative", value: o.confidence_calibration.fn_pct },
      ]} />
      <Section title="Recommendation outcome analytics">
        <SimpleTable rows={o.rec_outcomes as any} columns={[
          { key: "domain", label: "Domain" }, { key: "approved_lift", label: "Approved lift" },
          { key: "rejected_avoid", label: "Rejected avoid" }, { key: "calibration", label: "Calibration" },
        ]} />
      </Section>
      <Section title="Automation outcome analytics">
        <SimpleTable rows={o.automation_outcomes as any} columns={[
          { key: "type", label: "Type" }, { key: "success", label: "Success" }, { key: "exceptions", label: "Exceptions" },
        ]} />
      </Section>
      <Section title="Policy tuning suggestions">
        <SimpleTable rows={o.policy_tuning_suggestions as any} columns={[
          { key: "policy", label: "Policy" }, { key: "current", label: "Current" }, { key: "suggested", label: "Suggested" },
          { key: "basis", label: "Basis" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Lessons learned">
        <SimpleTable rows={o.lessons as any} columns={[{ key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "lesson", label: "Lesson" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Outcome learning action plan">
        <SimpleTable rows={o.plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/outcome-learning")({ component: Page });
