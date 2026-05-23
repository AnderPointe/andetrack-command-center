import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const r = H.useStrategicRiskIntelligence();
  return (
    <V15Page icon={<AlertTriangle className="size-6 text-cyan-300" />} title="Strategic Risk Intelligence Center" blurb="15 risk categories with signals, trend, owner, mitigation owner, sponsor, evidence, due, escalation, board visibility, recommended action.">
      <ScoreCard label="Strategic risk intelligence" value={r.score} tone="rose" />
      <Section title="Risk signal dashboard">
        <SimpleTable rows={r.risks as any} columns={[
          { key: "risk", label: "Risk" },
          { key: "trend", label: "Trend", render: (x: any) => <StatusPill status={x.trend} /> },
          { key: "owner", label: "Owner" }, { key: "mitigation", label: "Mitig" }, { key: "sponsor", label: "Sponsor" },
          { key: "level", label: "Level", render: (x: any) => <StatusPill status={x.level} /> },
          { key: "evidence", label: "Evidence", render: (x: any) => <StatusPill status={x.evidence} /> },
          { key: "due", label: "Due" },
          { key: "escalation", label: "Esc", render: (x: any) => <StatusPill status={x.escalation} /> },
          { key: "board", label: "Board", render: (x: any) => <StatusPill status={x.board ? "ready" : "tracking"} /> },
          { key: "action", label: "Action" },
        ]} />
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/risk")({
  head: () => ({ meta: [{ title: "Strategic Risk · V15" }] }),
  component: Page,
});
