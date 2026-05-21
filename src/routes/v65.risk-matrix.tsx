import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { SimpleTable, StatusPill, ScoreCard } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { useRiskControlMatrix, useRiskMatrixSummary } from "@/v65/hooks";

export const Route = createFileRoute("/v65/risk-matrix")({
  head: () => ({ meta: [{ title: "Risk + Controls · V6.5 · Anderoute" }] }),
  component: () => {
    const { rows } = useRiskControlMatrix();
    const { summary } = useRiskMatrixSummary();
    return (
      <V65Page icon={<ShieldAlert className="size-6 text-cyan-300" />} title="Risk + Control Matrix"
        blurb="Financial, security, compliance, operational, marketplace, AI, data, mobile, integration, partner, revenue, customer, legal placeholders — owners, frequency, last test, evidence, remediation.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Coverage"            value={summary.coverage_pct} tone="emerald" />
          <ScoreCard label="Passing"             value={Math.round((summary.passing / summary.total) * 100)} tone="sky" />
          <ScoreCard label="Exceptions"          value={Math.round((summary.exceptions / summary.total) * 100)} tone="rose" />
          <ScoreCard label="Needs remediation"   value={Math.round((summary.needs_remediation / summary.total) * 100)} tone="amber" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={rows as any} columns={[
            { key: "category",    label: "Category" },
            { key: "risk",        label: "Risk" },
            { key: "owner",       label: "Owner" },
            { key: "freq",        label: "Freq" },
            { key: "last_tested", label: "Last tested" },
            { key: "result",      label: "Result", render: (r: any) => <StatusPill status={r.result} /> },
            { key: "remediation", label: "Remediation" },
          ]} />
        </Card>
      </V65Page>
    );
  },
});
