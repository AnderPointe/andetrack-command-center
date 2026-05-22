import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const m = H.useCommercialOperatingMaturity();
  return (
    <V115Page icon={<Activity className="size-6 text-emerald-300" />} title="Commercial Operating Maturity" blurb="Operating-model scorecards across forecast, hygiene, win/loss, renewal, expansion, QTC, partner motion.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Operating score" value={m.summary.score} tone="emerald" />
        <ScoreCard label="Forecast confidence" value={m.summary.forecast_confidence_pct} tone="sky" />
        <ScoreCard label="Hygiene compliance" value={m.summary.hygiene_compliance_pct} tone="violet" />
        <ScoreCard label="Manager cadence" value={m.summary.manager_cadence_pct} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={m.axes as any} columns={[
          { key: "axis",   label: "Axis" },
          { key: "score",  label: "Score", render: (r: any) => `${r.score}%` },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Operating interpretation</h3>
        <p className="mt-2 text-sm text-muted-foreground">The operating model is strongest in renewal discipline and quote-to-cash response time. The biggest maturity gap remains win/loss learning and partner-motion consistency, which directly impacts monetization confidence.</p>
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/operating")({
  head: () => ({ meta: [{ title: "Operating Maturity · V11.5" }] }),
  component: Page,
});
