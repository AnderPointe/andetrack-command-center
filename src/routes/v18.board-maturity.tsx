import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const b = H.useBoardAutomationMaturity();
  return (
    <V18Page icon={<Brain className="size-6 text-violet-300" />} title="Board Automation Maturity Center"
      blurb="Board agenda + packet + KPI appendix automation, decision routing, evidence approvals, action follow-up, and exception health.">
      <ScoreCard label="Board automation maturity" value={b.score} tone="violet" />
      <KpiGrid cols={4} items={b.kpis} />
      <Section title="Maturity matrix">
        <SimpleTable rows={b.matrix as any} columns={[{ key: "item", label: "Item" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Packet automation health">
        <SimpleTable rows={b.packet as any} columns={[{ key: "section", label: "Section" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Exceptions">
        <SimpleTable rows={b.exceptions as any} columns={[{ key: "id", label: "ID" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Action plan">
        <SimpleTable rows={b.action_plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/board-maturity")({ component: Page });
