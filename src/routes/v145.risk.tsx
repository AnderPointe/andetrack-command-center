import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const r = H.useStrategicRiskExecutionDiscipline();
  const atrisk = r.filter(x => x.status === "at-risk").length;
  const board = r.filter(x => x.board).length;
  return (
    <V145Page icon={<AlertTriangle className="size-6 text-fuchsia-300" />} title="Strategic Risk Execution Discipline" blurb="Owners, sponsors, evidence, escalation, board visibility across all strategic risk categories.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Risks tracked" value={r.length} tone="violet" />
        <ScoreCard label="At-risk" value={atrisk} tone="rose" />
        <ScoreCard label="Board visible" value={board} tone="amber" />
      </div>
      <Section title="RiskExecutionOwnerBoard">
        <SimpleTable rows={r.map(x => ({ ...x, board: x.board ? "yes" : "no" })) as any} columns={[
          { key: "cat", label: "Category" }, { key: "owner", label: "Owner" },
          { key: "sponsor", label: "Sponsor" }, { key: "due", label: "Due" },
          { key: "status", label: "Status" }, { key: "escalation", label: "Escalation" },
          { key: "board", label: "Board" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/risk")({ head: () => ({ meta: [{ title: "Strategic Risk · V14.5" }] }), component: Page });
