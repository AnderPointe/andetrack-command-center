import { createFileRoute } from "@tanstack/react-router";
import { Siren } from "lucide-react";
import { V19Page } from "@/components/v19/V19Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v19/ui-bits";
import * as H from "@/v19/hooks";

function Page() {
  const e = H.useAssuranceExceptionCommand();
  return (
    <V19Page icon={<Siren className="size-6 text-violet-300" />}
      title="Assurance Exception Command Center"
      blurb="15 exception categories. Risk tier, SLA, escalation, evidence, remediation, board visibility, outcome.">
      <ScoreCard label="Exception score" value={e.score} tone="violet" />
      <KpiGrid cols={4} items={e.kpis} />
      <Section title="Exception queue">
        <SimpleTable rows={e.queue as any} columns={[
          { key: "id", label: "ID" }, { key: "category", label: "Category" }, { key: "owner", label: "Owner" },
          { key: "risk", label: "Risk" }, { key: "sla", label: "SLA" }, { key: "escalation", label: "Escalation" },
          { key: "evidence", label: "Evidence" }, { key: "remediation", label: "Remediation" }, { key: "board", label: "Board" },
        ]} />
      </Section>
    </V19Page>
  );
}
export const Route = createFileRoute("/v19/exception")({ component: Page });
