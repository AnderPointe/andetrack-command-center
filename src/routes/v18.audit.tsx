import { createFileRoute } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const a = H.useAutonomousAssistControlAudit();
  return (
    <V18Page icon={<Settings2 className="size-6 text-violet-300" />} title="Autonomous-Assist Control Audit Center"
      blurb="Append-only audit trail. Every action carries policy, trigger, signal, recommendation, explanation, evidence, risk, confidence, approver, decision, outcome.">
      <ScoreCard label="Audit completeness" value={a.score} tone="violet" />
      <Section title="Audit trail">
        <SimpleTable rows={a.trail as any} columns={[
          { key: "id", label: "ID" }, { key: "action", label: "Action" }, { key: "policy", label: "Policy" },
          { key: "trigger", label: "Trigger" }, { key: "evidence", label: "Evidence" },
          { key: "risk", label: "Risk" }, { key: "confidence", label: "Conf." },
          { key: "approver", label: "Approver" }, { key: "decision", label: "Decision" }, { key: "outcome", label: "Outcome" },
        ]} />
      </Section>
      <Section title="Exceptions">
        <SimpleTable rows={a.exceptions as any} columns={[{ key: "id", label: "ID" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <p className="text-xs text-muted-foreground">{a.export_note}</p>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/audit")({ component: Page });
