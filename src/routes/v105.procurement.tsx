import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const p = H.useProcurementAcceleration();
  return (
    <V105Page icon={<ClipboardCheck className="size-6 text-fuchsia-300" />} title="Procurement Acceleration Center" blurb="Security questionnaires, vendor reviews, DPA, AI usage review, data retention review, blockers.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Procurement score"   value={p.summary.score} tone="emerald" />
        <ScoreCard label="Open requests"       value={p.summary.open} tone="sky" />
        <ScoreCard label="Median close (days)" value={p.summary.median_close_days} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Procurement queue</h3>
        <SimpleTable rows={p.queue as any} columns={[
          { key: "id", label: "ID" }, { key: "customer", label: "Customer" }, { key: "type", label: "Type" },
          { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/procurement")({
  head: () => ({ meta: [{ title: "Procurement Acceleration · V10.5" }] }),
  component: Page,
});
