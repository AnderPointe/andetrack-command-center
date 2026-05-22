import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const g = H.usePartnerChannelPerformanceGovernance();
  const onTrack = g.reviews.filter((r) => r.status === "on_track").length;
  return (
    <V125Page icon={<Network className="size-6 text-teal-300" />} title="Partner Channel Performance Governance" blurb="Recurring partner review board, evidence vault, exception queue.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Reviews"   value={g.reviews.length} tone="sky" />
        <ScoreCard label="On track"  value={onTrack}          tone="emerald" />
        <ScoreCard label="Exceptions" value={g.exceptions.length} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Partner governance board</h3>
        <SimpleTable rows={g.reviews as any} columns={[
          { key: "review", label: "Review" }, { key: "cadence", label: "Cadence" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status === "on_track" ? "ready" : "review"} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Exception queue</h3>
        <SimpleTable rows={g.exceptions as any} columns={[{ key: "item", label: "Item" }, { key: "owner", label: "Owner" }, { key: "age_days", label: "Age (d)" }]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/partner-gov")({
  head: () => ({ meta: [{ title: "Partner Governance · V12.5" }] }),
  component: Page,
});
