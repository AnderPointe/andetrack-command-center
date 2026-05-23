import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { ScoreCard, Section, SimpleTable, KpiGrid } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const r = H.usePredictiveRiskRouting();
  return (
    <V165Page icon={<AlertTriangle className="size-6 text-emerald-300" />} title="Predictive Risk Routing Center"
      blurb="14 risk categories routed to named owners + executive sponsors with required evidence, approval, escalation paths, and SLA tracking.">
      <ScoreCard label="Risk routing score" value={r.score} tone="rose" />
      <KpiGrid cols={3} items={[
        { label: "On-time SLA", value: r.sla_health.on_time },
        { label: "At risk", value: r.sla_health.at_risk },
        { label: "Breached", value: r.sla_health.breached },
      ]} />
      <Section title="Routing categories">
        <SimpleTable rows={r.categories as any} columns={[
          { key: "cat", label: "Category" }, { key: "owner", label: "Owner" }, { key: "sponsor", label: "Sponsor" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Audit trail">
        <SimpleTable rows={r.audit_trail as any} columns={[
          { key: "ts", label: "When" }, { key: "id", label: "ID" }, { key: "action", label: "Action" }, { key: "actor", label: "Actor" },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/risk-routing")({ component: Page });
