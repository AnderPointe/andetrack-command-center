import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const c = H.useCapitalReadyRevenueGov();
  return (
    <V115Page icon={<Wallet className="size-6 text-emerald-300" />} title="Capital-Ready Revenue Governance" blurb="Audit-grade rev rec, concentration, cohort retention, revenue quality, deferred revenue, forecast confidence. No IPO/M&A claims.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Rev quality" value={79} tone="emerald" />
        <ScoreCard label="Forecast confidence" value={71} tone="sky" />
        <ScoreCard label="Deferred revenue" value={88} tone="violet" />
        <ScoreCard label="Concentration watch" value={74} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={c.axes as any} columns={[
          { key: "axis",   label: "Axis" },
          { key: "score",  label: "Score", render: (r: any) => `${r.score}%` },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Revenue quality optimization</h3>
        <SimpleTable rows={c.quality as any} columns={[
          { key: "metric", label: "Metric" },
          { key: "score", label: "Score", render: (r: any) => `${r.score}%` },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "note", label: "Note" },
        ]} />
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/capital")({
  head: () => ({ meta: [{ title: "Capital-Ready Rev Gov · V11.5" }] }),
  component: Page,
});
