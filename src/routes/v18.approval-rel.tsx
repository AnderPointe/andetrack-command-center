import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const a = H.useApprovalOrchestrationReliability();
  return (
    <V18Page icon={<Activity className="size-6 text-violet-300" />} title="Approval Orchestration Reliability Center"
      blurb="Routing accuracy, backup approver coverage, escalation + SLA reliability, evidence + explanation at approval, audit completeness, outcome linkage.">
      <ScoreCard label="Approval reliability" value={a.score} tone="violet" />
      <KpiGrid cols={4} items={a.kpis} />
      <Section title="Routing health by approver">
        <SimpleTable rows={a.routing as any} columns={[
          { key: "approver", label: "Approver" }, { key: "primary", label: "Primary" }, { key: "backup", label: "Backup" }, { key: "accuracy", label: "Accuracy" },
        ]} />
      </Section>
      <Section title="Action plan">
        <SimpleTable rows={a.action_plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/approval-rel")({ component: Page });
