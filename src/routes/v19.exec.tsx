import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V19Page } from "@/components/v19/V19Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v19/ui-bits";
import * as H from "@/v19/hooks";

function Page() {
  const e = H.useExecutiveAssuranceCommand();
  return (
    <V19Page icon={<Briefcase className="size-6 text-violet-300" />}
      title="Executive Assurance Command Center"
      blurb="Per-persona queues, high-risk panel, escalations, outcome assurance, executive brief. All high-impact HITL.">
      <ScoreCard label="Executive assurance" value={e.score} tone="violet" />
      <KpiGrid cols={4} items={e.kpis} />
      <Section title="Executive queue board">
        <SimpleTable rows={e.queues as any} columns={[
          { key: "persona", label: "Persona" }, { key: "items", label: "Items" },
          { key: "sla", label: "SLA" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="High-risk panel">
        <SimpleTable rows={e.high_risk as any} columns={[
          { key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Escalations">
        <SimpleTable rows={e.escalations as any} columns={[
          { key: "id", label: "ID" }, { key: "item", label: "Item" }, { key: "to", label: "To" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Executive outcomes">
        <SimpleTable rows={e.outcomes as any} columns={[{ key: "metric", label: "Metric" }, { key: "value", label: "Value" }]} />
      </Section>
      <Section title="Executive brief">
        <ul className="text-sm text-muted-foreground">{e.brief.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
    </V19Page>
  );
}
export const Route = createFileRoute("/v19/exec")({ component: Page });
