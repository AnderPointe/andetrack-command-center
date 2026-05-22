import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const e = H.useStrategicCustomerExpansion();
  const plan = H.useStrategicAccountGrowthPlan().plan;
  return (
    <V115Page icon={<Users className="size-6 text-emerald-300" />} title="Strategic Customer Expansion" blurb="Expansion plays driven by usage, sponsor, and trust signals. Mock-only.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Expansion score" value={e.summary.score} tone="emerald" />
        <ScoreCard label="Active plans"    value={String(e.summary.active_plans)} tone="sky" />
        <ScoreCard label="Pipeline"        value={`$${(e.summary.pipeline_usd/1_000_000).toFixed(1)}M`} tone="violet" />
        <ScoreCard label="QBR coverage"    value={e.summary.qbr_coverage_pct} tone="amber" />
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Whitespace ARR" value={`$${(e.program.whitespace_arr_usd / 1_000_000).toFixed(1)}M`} tone="emerald" />
        <ScoreCard label="Sponsor coverage" value={e.program.sponsor_coverage_pct} tone="sky" />
        <ScoreCard label="Multithreaded accts" value={String(e.program.multithreaded_accounts)} tone="violet" />
        <ScoreCard label="Plan quality" value={e.program.plan_quality_score} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Expansion intelligence signals</h3>
        <SimpleTable rows={e.signals as any} columns={[
          { key: "account", label: "Account" },
          { key: "signal",  label: "Signal" },
          { key: "score",   label: "Score" },
          { key: "play",    label: "Next play" },
          { key: "owner",   label: "Owner" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Sample account growth plan — {plan.account}</h3>
        <p className="mt-1 text-xs text-muted-foreground">ARR ${plan.arr_now.toLocaleString()} → target ${plan.arr_target_q4.toLocaleString()}</p>
        <SimpleTable rows={plan.workstreams as any} columns={[
          { key: "name",   label: "Workstream" },
          { key: "owner",  label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "due",    label: "Due" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Expansion operating posture</h3>
        <p className="mt-2 text-sm text-muted-foreground">V11.5 prioritizes sponsor-backed, trust-ready expansion plays with visible whitespace economics. Growth plans stay tied to named owners, due dates, and governed monetization milestones.</p>
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/expansion")({
  head: () => ({ meta: [{ title: "Strategic Expansion · V11.5" }] }),
  component: Page,
});
