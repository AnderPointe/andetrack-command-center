import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const e = H.useEnterpriseRevenueEvidence();
  const ready = e.filter((r) => r.status === "ready").length;
  const review = e.filter((r) => r.status === "review").length;
  const avgFresh = Math.round(e.reduce((s, r) => s + r.fresh_days, 0) / e.length);
  return (
    <V125Page icon={<BookOpen className="size-6 text-teal-300" />} title="Enterprise Revenue Evidence Center" blurb="14 evidence types with owner, freshness and approval status. Export to data room is a placeholder.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Evidence types" value={e.length} tone="sky" />
        <ScoreCard label="Ready"          value={ready}     tone="emerald" />
        <ScoreCard label="Review"         value={review}    tone="amber" />
        <ScoreCard label="Avg freshness"  value={`${avgFresh}d`} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Revenue evidence vault</h3>
        <SimpleTable rows={e as any} columns={[
          { key: "type", label: "Type" }, { key: "owner", label: "Owner" }, { key: "fresh_days", label: "Fresh (d)" }, { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
        Export placeholder — evidence export to data room is mock-only and gated by approval workflow.
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/evidence")({
  head: () => ({ meta: [{ title: "Revenue Evidence · V12.5" }] }),
  component: Page,
});
