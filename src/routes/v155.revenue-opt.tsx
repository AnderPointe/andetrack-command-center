import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, SimpleTable, ScoreCard, KpiGrid } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const r = H.useV155RevenueOpt();
  return (
    <V155Page icon={<TrendingUp className="size-6 text-fuchsia-300" />}
      title="Durable Revenue Optimization"
      blurb="Per-segment elasticity, action, confidence. Predicted vs realized lift tracked quarterly.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Revenue intel" value={r.score} tone="emerald" />
        <ScoreCard label="Open recs" value={r.open_recs} tone="violet" />
        <ScoreCard label="Predicted Q" value={r.predicted_lift_q} tone="sky" />
        <ScoreCard label="Realized Q" value={r.realized_lift_q} tone="amber" />
      </div>
      <KpiGrid cols={1} items={[{ label: "Calibration", value: r.calibration, sub: "FP&A monitored" }]} />
      <Section title="Segment elasticity + action">
        <SimpleTable rows={r.segments as any} columns={[
          { key: "segment", label: "Segment" }, { key: "elasticity", label: "Elasticity" },
          { key: "action", label: "Action" }, { key: "confidence", label: "Confidence" },
        ]} />
      </Section>
    </V155Page>
  );
}
export const Route = createFileRoute("/v155/revenue-opt")({ component: Page });
