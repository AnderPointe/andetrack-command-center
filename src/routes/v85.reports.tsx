import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/reports")({
  head: () => ({ meta: [{ title: "V8.5 Reports · Anderoute" }] }),
  component: () => {
    const { reports } = H.useReportsV85();
    return (<V85Page icon={<FileBarChart className="size-6 text-fuchsia-300" />} title="V8.5 Advanced Reports" blurb="One owner per report. Mock catalog.">
      <Card className="border-white/10 bg-white/[0.02] p-4"><SimpleTable rows={reports as any} columns={[{key:"name",label:"Report"},{key:"owner",label:"Owner"}]} /></Card>
    </V85Page>);
  },
});
