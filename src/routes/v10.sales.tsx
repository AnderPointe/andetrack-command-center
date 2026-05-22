import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Trust-Led Sales Enablement";
const BLURB = "Sales asset library: executive one-pager, security/compliance/AI overviews, battlecards, procurement packets, ROI placeholder.";

function Page() {
  const s = H.useTrustLedSalesEnablement();
  return (
    <V10Page icon={<Megaphone className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Readiness"    value={s.summary.readiness} tone="emerald" />
        <ScoreCard label="Assets"       value={s.assets.length} tone="sky" />
        <ScoreCard label="In progress"  value={s.assets.filter(a => a.status === "in_progress").length} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Sales asset library</h3>
        <SimpleTable rows={s.assets as any} columns={[
          { key: "asset", label: "Asset" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/sales")({
  head: () => ({ meta: [{ title: "Trust-Led Sales Enablement · Anderoute V10" }] }),
  component: Page,
});
