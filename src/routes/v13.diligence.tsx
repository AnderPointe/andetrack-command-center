import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const dil = H.useCommercialDiligence();
  const trends = H.useV13DiligenceTrends();
  const ready = dil.filter((d) => d.status === "ready").length;
  const atRisk = dil.filter((d) => d.status === "at_risk").length;
  const avg = Math.round(dil.reduce((a, b) => a + b.completeness, 0) / dil.length);
  return (
    <V13Page icon={<ClipboardList className="size-6 text-indigo-300" />} title="Commercial Diligence System" blurb="Diligence evidence checklist across 15 areas. Approval workflow + export are placeholders.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Areas tracked" value={dil.length} tone="emerald" />
        <ScoreCard label="Ready" value={ready} tone="sky" />
        <ScoreCard label="At risk" value={atRisk} tone="amber" />
        <ScoreCard label="Avg completeness" value={avg} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Diligence evidence checklist</h3>
        <SimpleTable rows={dil as any} columns={[
          { key: "area", label: "Area" }, { key: "completeness", label: "%" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Diligence trend (last 4Q)</h3>
        <SimpleTable rows={trends as any} columns={[
          { key: "quarter", label: "Quarter" }, { key: "avg_completeness", label: "Avg %" },
          { key: "ready", label: "Ready" }, { key: "at_risk", label: "At risk" },
        ]} />
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/diligence")({
  head: () => ({ meta: [{ title: "Commercial Diligence · Phase 39" }] }),
  component: Page,
});
