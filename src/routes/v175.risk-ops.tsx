import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const r = H.usePredictiveRiskOperationsScale();
  return (
    <V175Page icon={<AlertTriangle className="size-6 text-emerald-300" />} title="Predictive Risk Operations Scale Center"
      blurb="Per-category risk signal volume, routing accuracy, owner coverage, SLA, escalation health, mitigation status, and recurrence.">
      <ScoreCard label="Risk operations scale" value={r.score} tone="emerald" />
      <Section title="Risk categories">
        <SimpleTable rows={r.categories as any} columns={[
          { key: "category", label: "Category" }, { key: "signals", label: "Signals" }, { key: "sla", label: "SLA" },
          { key: "routing_accuracy", label: "Routing" }, { key: "owner_coverage", label: "Owner cov" }, { key: "mitigation", label: "Mitigation" },
        ]} />
      </Section>
      <Section title="Risk owner coverage">
        <SimpleTable rows={r.owners as any} columns={[
          { key: "owner", label: "Owner" }, { key: "assigned", label: "Assigned" }, { key: "sla", label: "SLA" },
        ]} />
      </Section>
      <Section title="Risk escalation health">
        <SimpleTable rows={r.escalations as any} columns={[
          { key: "id", label: "ID" }, { key: "category", label: "Category" }, { key: "route", label: "Route" },
          { key: "sla", label: "SLA" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Risk outcome summary">
        <SimpleTable rows={r.outcome_summary as any} columns={[
          { key: "week", label: "Week" }, { key: "mitigated", label: "Mitigated" }, { key: "recurrence", label: "Recurrence" },
        ]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/risk-ops")({ component: Page });
