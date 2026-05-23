import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const q = H.useHumanApprovedAutomation();
  return (
    <V165Page icon={<CheckCircle2 className="size-6 text-emerald-300" />} title="Human-Approved Automation Queue"
      blurb="Automation prepares signals, evidence, routing, reminders, drafts, and outcome tracking. It never executes high-impact business actions automatically.">
      <Section title="Automation queue">
        <SimpleTable rows={q.items as any} columns={[
          { key: "id", label: "ID" }, { key: "type", label: "Type" }, { key: "trigger", label: "Trigger" },
          { key: "action", label: "Generated action" }, { key: "approver", label: "Required approver" },
          { key: "risk", label: "Risk" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Guardrails">
        <ul className="space-y-1 text-sm text-muted-foreground">
          {q.guardrails.map(g => <li key={g}>· {g}</li>)}
        </ul>
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/automation-queue")({ component: Page });
