import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const b = H.useBoardExecutionDiscipline();
  return (
    <V145Page icon={<FileBarChart className="size-6 text-fuchsia-300" />} title="Board Execution Discipline Center" blurb="Board action completion, decision follow-ups, review completion, evidence freshness, overdue items.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Board execution" value={b.score} tone="violet" />
        <ScoreCard label="Action completion" value={`${b.action_completion_pct}%`} tone="emerald" />
        <ScoreCard label="Evidence freshness" value={`${b.evidence_fresh_pct}%`} tone="amber" />
        <ScoreCard label="Overdue" value={b.overdue.length} tone="rose" />
      </div>
      <Section title="BoardDecisionFollowUpTracker">
        <SimpleTable rows={b.decision_followups as any} columns={[
          { key: "decision", label: "Decision" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="BoardReviewCompletionMatrix">
        <SimpleTable rows={b.reviews as any} columns={[
          { key: "area", label: "Area" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="BoardExecutionRiskPanel — overdue">
        <SimpleTable rows={b.overdue as any} columns={[
          { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "days_overdue", label: "Days overdue" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/board")({ head: () => ({ meta: [{ title: "Board Execution · V14.5" }] }), component: Page });
