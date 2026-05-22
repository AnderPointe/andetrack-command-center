import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const t = H.usePipelineAuditTrail();
  const unique = new Set(t.map((r) => r.opp)).size;
  return (
    <V125Page icon={<ClipboardList className="size-6 text-teal-300" />} title="Pipeline Audit Trail Center" blurb="Stage, owner, risk, blocker, and decision change log per opportunity.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Audit events" value={t.length} tone="sky" />
        <ScoreCard label="Opportunities" value={unique} tone="violet" />
        <ScoreCard label="Latest event" value={t[t.length - 1]?.ts ?? "—"} tone="emerald" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Opportunity audit timeline</h3>
        <SimpleTable rows={t as any} columns={[
          { key: "ts", label: "Date" }, { key: "opp", label: "Opportunity" }, { key: "event", label: "Event" }, { key: "owner", label: "Owner" }, { key: "detail", label: "Detail" },
        ]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/pipeline-audit")({
  head: () => ({ meta: [{ title: "Pipeline Audit · V12.5" }] }),
  component: Page,
});
