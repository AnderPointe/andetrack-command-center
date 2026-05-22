import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const e = H.useExpansionEvidenceManagement();
  const approved = e.filter((r) => r.approval === "approved").length;
  const review = e.filter((r) => r.approval === "review").length;
  return (
    <V125Page icon={<TrendingUp className="size-6 text-teal-300" />} title="Expansion Evidence Management" blurb="Trigger-to-approval evidence chain across CSM-owned accounts.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Plays"     value={e.length} tone="sky" />
        <ScoreCard label="Approved"  value={approved} tone="emerald" />
        <ScoreCard label="Review"    value={review}   tone="amber" />
        <ScoreCard label="Drafts"    value={e.length - approved - review} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={e as any} columns={[
          { key: "trigger", label: "Trigger" }, { key: "account", label: "Account" }, { key: "owner", label: "Owner" }, { key: "product", label: "Product" }, { key: "evidence", label: "Evidence" }, { key: "approval", label: "Approval", render: (r: any) => <StatusPill status={r.approval === "approved" ? "ready" : r.approval === "review" ? "review" : "placeholder"} /> },
        ]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/expansion")({
  head: () => ({ meta: [{ title: "Expansion Evidence · V12.5" }] }),
  component: Page,
});
