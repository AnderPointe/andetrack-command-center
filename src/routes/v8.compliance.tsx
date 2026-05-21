import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable, ScoreCard, KpiGrid } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useAdvancedComplianceExecution } from "@/v8/hooks";

export const Route = createFileRoute("/v8/compliance")({
  head: () => ({ meta: [{ title: "Advanced Compliance Execution · Anderoute" }] }),
  component: () => {
    const { summary, regional } = useAdvancedComplianceExecution();
    return (
      <V8Page icon={<FileCheck2 className="size-6 text-violet-300" />} title="Advanced Compliance Execution Center"
        blurb="Controls, owners, evidence, exceptions, remediation, executive escalation, and review cadence — NOT a compliance / audit claim.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Execution score" value={summary.score} tone="emerald" />
          <ScoreCard label="Passing controls" value={summary.controls_passing} tone="sky" />
          <ScoreCard label="Exceptions open" value={summary.exceptions_open} tone="rose" />
          <ScoreCard label="Reviews due 30d" value={summary.reviews_due_30d} tone="amber" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Total controls",   value: summary.controls_total },
          { label: "In progress",      value: summary.controls_in_progress },
          { label: "Failing",          value: summary.controls_failing },
          { label: "Evidence %",       value: summary.evidence_completeness },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Regional execution boards</h3>
          <SimpleTable rows={regional as any} columns={[
            { key: "region", label: "Region" },
            { key: "score",  label: "Score" },
            { key: "owner",  label: "Owner" },
            { key: "evidence", label: "Evidence" },
            { key: "exceptions", label: "Exceptions" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
