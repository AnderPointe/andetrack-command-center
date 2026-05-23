import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const a = H.useApprovalOrchestrationScale();
  return (
    <V175Page icon={<ListChecks className="size-6 text-emerald-300" />} title="Approval Orchestration Scale Center"
      blurb="Approval routing accuracy, volume, SLAs, backup approver coverage, escalation health, evidence + explanation completeness, and audit completeness.">
      <ScoreCard label="Approval orchestration scale" value={a.score} tone="emerald" />
      <KpiGrid cols={4} items={a.kpis} />
      <Section title="Routing by tier">
        <SimpleTable rows={a.routing as any} columns={[
          { key: "tier", label: "Tier" }, { key: "routed", label: "Routed" }, { key: "accuracy", label: "Accuracy" }, { key: "sla", label: "SLA" },
        ]} />
      </Section>
      <Section title="SLA health">
        <SimpleTable rows={a.sla_health as any} columns={[
          { key: "tier", label: "Tier" }, { key: "target", label: "Target" }, { key: "actual", label: "Actual" },
        ]} />
      </Section>
      <Section title="Backup approver coverage">
        <SimpleTable rows={a.backup_coverage as any} columns={[
          { key: "owner", label: "Owner" }, { key: "primary", label: "Primary" }, { key: "backup", label: "Backup" }, { key: "coverage", label: "Coverage" },
        ]} />
      </Section>
      <Section title="Escalations">
        <SimpleTable rows={a.escalations as any} columns={[
          { key: "id", label: "ID" }, { key: "from", label: "From" }, { key: "to", label: "To" }, { key: "reason", label: "Reason" }, { key: "sla", label: "SLA" },
        ]} />
      </Section>
      <Section title="Approval orchestration scale plan">
        <SimpleTable rows={a.plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/approval-scale")({ component: Page });
