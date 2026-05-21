import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { KpiGrid, ScoreCard, SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { Card } from "@/components/ui/card";
import { AUTOMATION_KPIS, AUTOMATION_WORKFLOWS, AUTOMATION_TREND, AUTOMATION_OUTCOMES } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/automation")({
  head: () => ({ meta: [{ title: "Automation Maturity · Anderoute" }] }),
  component: () => {
    const byLevel = AUTOMATION_WORKFLOWS.reduce<Record<string, number>>((acc, w) => {
      acc[w.level] = (acc[w.level] ?? 0) + 1; return acc;
    }, {});
    const highRisk = AUTOMATION_WORKFLOWS.filter(w => w.risk === "high").length;
    return (
      <V45Page icon={<Bot className="size-6 text-violet-300" />} title="Automation Maturity Dashboard"
        blurb="Workflow map across manual → assisted → human-approved → fully automated low-risk. High-risk workflows always require approval.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Governance score" value={AUTOMATION_KPIS.governance_score} tone="violet" />
          <ScoreCard label="Audit coverage" value={AUTOMATION_KPIS.audit_coverage} tone="sky" />
          <ScoreCard label="Success rate" value={Math.round(AUTOMATION_KPIS.success_rate)} tone="emerald" />
        </div>
        <KpiGrid cols={6} items={[
          { label: "Failure rate", value: `${AUTOMATION_KPIS.failure_rate}%` },
          { label: "Manual override", value: `${AUTOMATION_KPIS.manual_override_rate}%` },
          { label: "Time saved", value: `${AUTOMATION_KPIS.time_saved_hrs_week}h/wk`, sub: "placeholder" },
          { label: "Assisted", value: byLevel.assisted ?? 0 },
          { label: "Approved", value: byLevel.approved ?? 0 },
          { label: "High-risk gated", value: highRisk },
        ]} />

        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Success vs override (7w)</h3>
            <div className="mt-3 grid grid-cols-7 items-end gap-2 h-32">
              {AUTOMATION_TREND.map(t => (
                <div key={t.week} className="flex flex-col items-center gap-1">
                  <div className="flex items-end h-24 gap-0.5">
                    <div className="w-3 rounded-t bg-emerald-400/70" style={{ height: `${t.success}%` }} title={`Success ${t.success}%`} />
                    <div className="w-3 rounded-t bg-rose-400/60" style={{ height: `${t.override * 4}%` }} title={`Override ${t.override}%`} />
                  </div>
                  <div className="text-[10px] text-muted-foreground">{t.week}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-[10px] text-muted-foreground">Green = success rate · Red = manual override (×4 for visibility)</div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Recent audit-logged outcomes</h3>
            <div className="mt-2">
              <SimpleTable rows={AUTOMATION_OUTCOMES} columns={[
                { key: "ts", label: "When" },
                { key: "action", label: "Action" },
                { key: "actor", label: "Actor" },
                { key: "decision", label: "Decision", render: r => <StatusPill status={r.decision} /> },
                { key: "impact", label: "Impact" },
              ]} />
            </div>
          </Card>
        </div>

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
    );
  },
});
