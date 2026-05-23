import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const h = H.useHumanApprovedAutomationScale();
  return (
    <V18Page icon={<ListChecks className="size-6 text-violet-300" />} title="Human-Approved Automation Scale Center"
      blurb="Automation request queues, SLA, risk tier, evidence + explanation health, and outcome tracking. No high-impact action executes without a human approver who is not the recommender.">
      <ScoreCard label="HITL scale coverage" value={h.score} tone="violet" />
      <KpiGrid cols={4} items={h.kpis} />
      <Section title="Live queue">
        <SimpleTable rows={h.queue as any} columns={[
          { key: "id", label: "ID" }, { key: "desc", label: "Description" },
          { key: "owner", label: "Owner" }, { key: "approver", label: "Approver" },
          { key: "risk", label: "Risk" }, { key: "sla", label: "SLA" }, { key: "evidence", label: "Evidence" },
        ]} />
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/hitl-scale")({ component: Page });
