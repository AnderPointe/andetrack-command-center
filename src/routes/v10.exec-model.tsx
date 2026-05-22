import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Executive Operating Model Maturity";
const BLURB = "Cadence, decision velocity, action item completion, review completion matrix.";

function Page() {
  const e = H.useExecutiveOperatingModelMaturity();
  return (
    <V10Page icon={<Briefcase className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Operating maturity" value={e.summary.maturity} tone="emerald" />
        <ScoreCard label="Decision velocity"  value={`${e.velocity.median_days}d median`} tone="sky" />
        <ScoreCard label="Action completion"  value={`${e.velocity.action_completion_pct}%`} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Cadence + completion</h3>
        <SimpleTable rows={e.cadence as any} columns={[
          { key: "meeting", label: "Meeting" }, { key: "cadence", label: "Cadence" },
          { key: "completion", label: "Completion %", render: (r: any) => `${r.completion}%` },
        ]} />
      </Card>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/exec-model")({
  head: () => ({ meta: [{ title: "Executive Operating Model Maturity · Anderoute V10" }] }),
  component: Page,
});
