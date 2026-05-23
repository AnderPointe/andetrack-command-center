import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const a = H.useCommercialAuditability();
  const ready = a.trails.filter((t) => t.status === "ready").length;
  const risk = a.trails.filter((t) => t.status === "at_risk").length;
  const avg = Math.round(a.trails.reduce((s, t) => s + t.completeness_pct, 0) / a.trails.length);
  return (
    <V125Page icon={<ShieldCheck className="size-6 text-teal-300" />} title="Commercial Auditability Center" blurb="Audit trail completeness across pipeline, deal, approval, procurement, proof, and board reporting.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Audit score"   value={a.score} tone="emerald" />
        <ScoreCard label="Trails ready"  value={ready}   tone="sky" />
        <ScoreCard label="At risk"       value={risk}    tone="amber" />
        <ScoreCard label="Avg completeness" value={`${avg}%`} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Audit trail viewer</h3>
        <SimpleTable rows={a.trails as any} columns={[
          { key: "area", label: "Area" }, { key: "completeness_pct", label: "Compl. %" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Auditability trend (last 4Q)</h3>
        <SimpleTable rows={a.trends as any} columns={[
          { key: "quarter", label: "Quarter" }, { key: "score", label: "Score" }, { key: "ready", label: "Ready" }, { key: "at_risk", label: "At risk" }, { key: "exceptions", label: "Exc." },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Exception queue</h3>
        <SimpleTable rows={a.exceptions as any} columns={[{ key: "item", label: "Item" }, { key: "owner", label: "Owner" }, { key: "age_days", label: "Age (d)" }]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/auditability")({
  head: () => ({ meta: [{ title: "Commercial Auditability · V12.5" }] }),
  component: Page,
});
