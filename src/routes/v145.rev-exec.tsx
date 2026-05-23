import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { Section, SimpleTable, ScoreCard } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const e = H.useRevenueDurabilityExecution();
  const overdue = e.actions.filter(a => a.status === "overdue").length;
  return (
    <V145Page icon={<Activity className="size-6 text-fuchsia-300" />} title="Revenue Durability Execution Center" blurb="Renewal, expansion, evidence refresh, concentration mitigation, marketplace/API/partner/payment actions.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Open actions" value={e.actions.length} tone="violet" />
        <ScoreCard label="Overdue" value={overdue} tone="rose" />
        <ScoreCard label="Escalations" value={e.escalations.length} tone="amber" />
      </div>
      <Section title="RevenueExecutionActionBoard">
        <SimpleTable rows={e.actions as any} columns={[
          { key: "kind", label: "Kind" }, { key: "account", label: "Subject" },
          { key: "owner", label: "Owner" }, { key: "due", label: "Due" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="RevenueDurabilityEscalationPanel">
        <SimpleTable rows={e.escalations as any} columns={[
          { key: "item", label: "Item" }, { key: "level", label: "Escalation" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/rev-exec")({ head: () => ({ meta: [{ title: "Revenue Execution · V14.5" }] }), component: Page });
