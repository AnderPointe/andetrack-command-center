import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const dr = H.useCapitalDataRoom();
  const trends = H.useV13DataRoomTrends();
  const ready = dr.filter((r) => r.status === "ready").length;
  const ph = dr.filter((r) => r.status === "placeholder").length;
  return (
    <V13Page icon={<Lock className="size-6 text-indigo-300" />} title="Capital Data Room Command Center" blurb="Diligence-ready data room sections with readiness tracking. Export is placeholder.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Sections" value={dr.length} tone="emerald" />
        <ScoreCard label="Ready" value={ready} tone="sky" />
        <ScoreCard label="Placeholders" value={ph} tone="amber" />
        <ScoreCard label="Readiness %" value={Math.round((ready/dr.length)*100)} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Data room sections</h3>
        <SimpleTable rows={dr as any} columns={[
          { key: "section", label: "Section" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Data room readiness trend (last 4Q)</h3>
        <SimpleTable rows={trends as any} columns={[
          { key: "quarter", label: "Quarter" }, { key: "readiness_pct", label: "Readiness %" },
          { key: "ready", label: "Ready" }, { key: "placeholders", label: "Placeholders" },
        ]} />
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/data-room")({
  head: () => ({ meta: [{ title: "Capital Data Room · Phase 39" }] }),
  component: Page,
});
