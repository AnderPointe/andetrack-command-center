import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const d = H.useDealDeskDiscipline().summary;
  const ex = H.useEnterpriseDealExecution();
  return (
    <V115Page icon={<ClipboardList className="size-6 text-emerald-300" />} title="Deal Desk Operating Discipline" blurb="SLA, approvals, blocked deals, policy compliance, and stage win rates.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="SLA (h)"           value={`${d.sla_actual_hrs}/${d.sla_target_hrs}`} tone="emerald" />
        <ScoreCard label="Open requests"     value={d.open} tone="sky" />
        <ScoreCard label="Approved 30d"      value={d.approved_30d} tone="violet" />
        <ScoreCard label="Policy compliance" value={d.policy_compliance_pct} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Enterprise deal execution by stage</h3>
        <SimpleTable rows={ex.stages as any} columns={[
          { key: "stage",         label: "Stage" },
          { key: "count",         label: "Count" },
          { key: "win_rate_pct",  label: "Win rate", render: (r: any) => `${r.win_rate_pct}%` },
        ]} />
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/deal-desk")({
  head: () => ({ meta: [{ title: "Deal Desk · V11.5" }] }),
  component: Page,
});
