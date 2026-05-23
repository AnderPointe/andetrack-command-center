import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const r = H.useRevenueAutomationOptimization();
  return (
    <V175Page icon={<TrendingUp className="size-6 text-emerald-300" />} title="Revenue Automation Optimization Center"
      blurb="Renewal, expansion, churn prevention, evidence, payment, dispute, concentration, and approval-routing quality — all HITL-gated.">
      <ScoreCard label="Revenue automation optimization" value={r.score} tone="emerald" />
      <KpiGrid cols={4} items={r.kpis} />
      <Section title="Revenue optimization matrix">
        <SimpleTable rows={r.matrix as any} columns={[
          { key: "area", label: "Area" }, { key: "score", label: "Score" }, { key: "note", label: "Note" },
        ]} />
      </Section>
      <Section title="Revenue automation exceptions">
        <SimpleTable rows={r.exceptions as any} columns={[
          { key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Revenue optimization plan">
        <SimpleTable rows={r.plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/revenue-opt")({ component: Page });
