import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "V10 Reports";
const BLURB = "Category, trust commercialization, economics, MP proof, defensibility, sales, procurement, retention, outcomes, expansion, partner, product, narrative, growth, competitive, exec, value, references, roadmap.";

function Page() {
  const r = H.useReportsV10();
  return (
    <V10Page icon={<FileBarChart className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {r.reports.map((name) => (
          <Card key={name} className="border-white/10 bg-white/[0.02] p-3 text-sm">
            <div className="font-medium">{name}</div>
            <div className="mt-1 text-xs text-muted-foreground">CSV / PDF export placeholder · permissioned by role.</div>
          </Card>
        ))}
      </div>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/reports")({
  head: () => ({ meta: [{ title: "V10 Reports · Anderoute V10" }] }),
  component: Page,
});
