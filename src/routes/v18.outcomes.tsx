import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const o = H.useOutcomeLearningGovernance();
  return (
    <V18Page icon={<Radar className="size-6 text-violet-300" />} title="Outcome Learning Governance Center"
      blurb="Per-domain outcome tracking, calibration governance, lessons-learned library, policy tuning queue, and board visibility.">
      <ScoreCard label="Outcome learning governance" value={o.score} tone="violet" />
      <Section title="By domain">
        <SimpleTable rows={o.by_domain as any} columns={[{ key: "domain", label: "Domain" }, { key: "outcomes_tracked", label: "Tracked" }, { key: "calibration", label: "Calibration" }]} />
      </Section>
      <Section title="Lessons learned">
        <SimpleTable rows={o.lessons as any} columns={[{ key: "lesson", label: "Lesson" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Policy tuning queue">
        <SimpleTable rows={o.policy_tuning as any} columns={[{ key: "policy", label: "Policy" }, { key: "suggestion", label: "Suggestion" }, { key: "owner", label: "Owner" }]} />
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/outcomes")({ component: Page });
