import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const d = H.useCommercialDataRoomEvidence();
  const ready = d.filter((r) => r.status === "ready").length;
  const review = d.filter((r) => r.status === "review").length;
  return (
    <V125Page icon={<Lock className="size-6 text-teal-300" />} title="Commercial Data Room Evidence Center" blurb="Diligence-ready evidence checklist. Export is a placeholder gated by approval workflows.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Sections" value={d.length} tone="sky" />
        <ScoreCard label="Ready"    value={ready}    tone="emerald" />
        <ScoreCard label="Review"   value={review}   tone="amber" />
        <ScoreCard label="Gaps"     value={d.length - ready} tone="rose" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={d as any} columns={[
          { key: "section", label: "Section" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> }, { key: "notes", label: "Notes" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
        Diligence request tracker — placeholder. Export to external data room is mock-only and gated by exec/admin approval.
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/data-room")({
  head: () => ({ meta: [{ title: "Data Room · V12.5" }] }),
  component: Page,
});
