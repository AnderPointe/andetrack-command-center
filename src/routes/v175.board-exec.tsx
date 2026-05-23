import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const b = H.usePredictiveBoardExecutionMaturity();
  return (
    <V175Page icon={<Brain className="size-6 text-emerald-300" />} title="Predictive Board Execution Maturity Center"
      blurb="Board agenda + packet automation readiness, decision routing accuracy, evidence freshness, action follow-up health, and blockers.">
      <ScoreCard label="Board execution maturity" value={b.score} tone="emerald" />
      <KpiGrid cols={4} items={b.kpis} />
      <Section title="Board agenda automation">
        <SimpleTable rows={b.agenda as any} columns={[{ key: "item", label: "Agenda item" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Board packet automation">
        <SimpleTable rows={b.packet as any} columns={[{ key: "section", label: "Section" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Board decision routing">
        <SimpleTable rows={b.decision_routing as any} columns={[
          { key: "decision", label: "Decision" }, { key: "tier", label: "Tier" }, { key: "sla", label: "SLA" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Board action follow-up">
        <SimpleTable rows={b.follow_up as any} columns={[{ key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" }]} />
      </Section>
      <Section title="Readiness blockers">
        <ul className="text-sm text-muted-foreground">{b.blockers.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/board-exec")({ component: Page });
