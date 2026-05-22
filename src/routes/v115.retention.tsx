import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const r = H.useRetentionRisk();
  return (
    <V115Page icon={<AlertTriangle className="size-6 text-emerald-300" />} title="Retention Risk Command Center" blurb="Accounts at retention risk with save plays assigned to CSM owners. Mock-only.">
      <div className="grid gap-3 md:grid-cols-5">
        <ScoreCard label="High risk" value={String(r.summary.high)} tone="rose" />
        <ScoreCard label="Medium risk" value={String(r.summary.medium)} tone="amber" />
        <ScoreCard label="Low risk" value={String(r.summary.low)} tone="sky" />
        <ScoreCard label="Save coverage" value={r.summary.save_coverage_pct} tone="emerald" />
        <ScoreCard label="GRR outlook" value={r.summary.grr_outlook} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={r.rows as any} columns={[
          { key: "account",   label: "Account" },
          { key: "risk",      label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
          { key: "reason",    label: "Reason" },
          { key: "owner",     label: "Owner" },
          { key: "save_play", label: "Save play" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Retention discipline</h3>
        <p className="mt-2 text-sm text-muted-foreground">The retention center is built for executive escalation, not passive monitoring: every high-risk account is paired to a named owner, explicit save motion, and renewal-governance outcome.</p>
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/retention")({
  head: () => ({ meta: [{ title: "Retention Risk · V11.5" }] }),
  component: Page,
});
