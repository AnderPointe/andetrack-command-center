import { createFileRoute } from "@tanstack/react-router";
import { Stamp } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const e = H.useExecutiveValueCreation();
  const trends = H.useV13ExecValueTrends();
  return (
    <V13Page icon={<Stamp className="size-6 text-indigo-300" />} title="Executive Value Creation Dashboard" blurb="Value creation score, value drivers, risks, action queue, and decisions needed.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Value creation" value={e.score} tone="emerald" />
        <ScoreCard label="Drivers" value={e.drivers.length} tone="sky" />
        <ScoreCard label="Risks" value={e.risks.length} tone="amber" />
        <ScoreCard label="Decisions" value={e.decisions_needed.length} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Value driver KPI grid</h3>
        <SimpleTable rows={e.drivers as any} columns={[{ key: "driver", label: "Driver" }, { key: "score", label: "Score" }]} />
      </Card>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Risks</h3>
          <SimpleTable rows={e.risks as any} columns={[{ key: "risk", label: "Risk" }, { key: "severity", label: "Sev." }, { key: "owner", label: "Owner" }]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Action queue</h3>
          <SimpleTable rows={e.actions as any} columns={[{ key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Decisions needed</h3>
        <SimpleTable rows={e.decisions_needed as any} columns={[{ key: "decision", label: "Decision" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Exec value creation trend (last 4Q)</h3>
        <SimpleTable rows={trends as any} columns={[
          { key: "quarter", label: "Quarter" }, { key: "score", label: "Score" }, { key: "decisions_closed", label: "Decisions closed" },
        ]} />
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/exec-value")({
  head: () => ({ meta: [{ title: "Exec Value Creation · Phase 39" }] }),
  component: Page,
});
