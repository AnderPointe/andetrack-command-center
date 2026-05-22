import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Strategic Growth Execution System";
const BLURB = "Growth initiatives with owners, milestones, ETAs, and risk signals.";

function Page() {
  const g = H.useStrategicGrowthExecution();
  return (
    <V10Page icon={<Activity className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Growth initiative board</h3>
        <SimpleTable rows={g.initiatives as any} columns={[
          { key: "initiative", label: "Initiative" }, { key: "owner", label: "Owner" },
          { key: "milestone", label: "Milestone" }, { key: "eta", label: "ETA" },
          { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
        ]} />
      </Card>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/growth")({
  head: () => ({ meta: [{ title: "Strategic Growth Execution System · Anderoute V10" }] }),
  component: Page,
});
