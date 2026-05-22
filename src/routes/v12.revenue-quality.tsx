import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const q = H.useRevenueQualityGovernance();
  return (
    <V12Page icon={<ShieldCheck className="size-6 text-cyan-300" />} title="Revenue Quality Governance Center" blurb="Per-lever revenue quality, concentration watch, and exception queue. Predictability and support cost remain placeholders.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Quality score" value={q.score} tone="emerald" />
        <ScoreCard label="Concentration risks" value={String(q.concentration.filter(c => c.status !== "ready").length)} tone="amber" />
        <ScoreCard label="Exceptions" value={String(q.exceptions.reduce((s, e) => s + e.count, 0))} tone="rose" />
        <ScoreCard label="Levers tracked" value={String(q.rows.length)} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Per-lever quality</h3>
        <SimpleTable rows={q.rows as any} columns={[
          { key: "lever", label: "Lever" },
          { key: "quality", label: "Quality", render: (r: any) => `${r.quality}%` },
          { key: "weight_pct", label: "Weight", render: (r: any) => `${r.weight_pct}%` },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Concentration</h3>
        <SimpleTable rows={q.concentration as any} columns={[
          { key: "axis", label: "Axis" },
          { key: "value_pct", label: "Value", render: (r: any) => `${r.value_pct}%` },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Exception queue</h3>
        <SimpleTable rows={q.exceptions as any} columns={[
          { key: "item", label: "Item" }, { key: "count", label: "Count" }, { key: "owner", label: "Owner" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/revenue-quality")({
  head: () => ({ meta: [{ title: "Revenue Quality Governance · V12" }] }),
  component: Page,
});
