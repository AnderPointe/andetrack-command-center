import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { KpiGrid, ScoreCard, SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { AUTOMATION_KPIS, AUTOMATION_WORKFLOWS } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/automation")({
  head: () => ({ meta: [{ title: "Automation Maturity · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Bot className="size-6 text-violet-300" />} title="Automation Maturity Dashboard"
      blurb="Workflow map across manual → assisted → human-approved → fully automated low-risk. High-risk workflows always require approval.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Governance score" value={AUTOMATION_KPIS.governance_score} tone="violet" />
        <ScoreCard label="Audit coverage" value={AUTOMATION_KPIS.audit_coverage} tone="sky" />
        <ScoreCard label="Success rate" value={Math.round(AUTOMATION_KPIS.success_rate)} tone="emerald" />
      </div>
      <KpiGrid cols={4} items={[
        { label: "Failure rate", value: `${AUTOMATION_KPIS.failure_rate}%` },
        { label: "Manual override", value: `${AUTOMATION_KPIS.manual_override_rate}%` },
        { label: "Time saved (placeholder)", value: `${AUTOMATION_KPIS.time_saved_hrs_week}h/wk` },
        { label: "Risk avoided (placeholder)", value: "—" },
      ]} />
      <SimpleTable rows={AUTOMATION_WORKFLOWS} columns={[
        { key: "category", label: "Workflow" },
        { key: "level", label: "Level", render: r => <StatusPill status={r.level} /> },
        { key: "risk",  label: "Risk",  render: r => <StatusPill status={r.risk} /> },
        { key: "success", label: "Success", render: r => `${r.success}%` },
        { key: "manual_override", label: "Override", render: r => `${r.manual_override}%` },
        { key: "approvals_required", label: "Approval", render: r => r.approvals_required ? "Required" : "—" },
        { key: "audit", label: "Audit", render: r => <StatusPill status={r.audit} /> },
      ]} />
    </V45Page>
  ),
});
