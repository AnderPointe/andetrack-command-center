import { createFileRoute } from "@tanstack/react-router";
import { Siren } from "lucide-react";
import { V195Page } from "@/components/v195/V195Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v195/ui-bits";
import * as H from "@/v195/hooks";

function Page() {
  const e = H.useAssuranceMaturityExceptionCenter();
  return (
    <V195Page icon={<Siren className="size-6 text-violet-300" />}
      title="Assurance Maturity Exception Center"
      blurb="17 exception categories. Risk tier · SLA · escalation · evidence · remediation · board visibility · repeat tracking.">
      <ScoreCard label="Exception health" value={e.score} tone="amber" />
      <KpiGrid cols={4} items={e.kpis} />
      <Section title="Maturity exception queue">
        <SimpleTable rows={e.queue as any} columns={[
          { key: "id", label: "ID" }, { key: "category", label: "Category" }, { key: "owner", label: "Owner" },
          { key: "risk", label: "Risk" }, { key: "sla", label: "SLA" }, { key: "escalation", label: "Escalation" },
          { key: "evidence", label: "Evidence" }, { key: "remediation", label: "Remediation" }, { key: "board", label: "Board?" },
        ]} />
      </Section>
    </V195Page>
  );
}
export const Route = createFileRoute("/v195/exception")({ component: Page });
