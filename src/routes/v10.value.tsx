import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Platform Value Realization Dashboard";
const BLURB = "Realized value across customer, revenue, marketplace, partner, product, trust, support, AI, data, expansion.";

function Page() {
  const v = H.usePlatformValueRealization();
  return (
    <V10Page icon={<Trophy className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="Value realization score" value={v.summary.score} tone="emerald" />
        <ScoreCard label="Axes tracked"            value={v.axes.length} tone="sky" />
      </div>
      <KpiGrid cols={4} items={v.axes.map(a => ({ label: a.axis, value: `${a.score}%` }))} />
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/value")({
  head: () => ({ meta: [{ title: "Platform Value Realization Dashboard · Anderoute V10" }] }),
  component: Page,
});
