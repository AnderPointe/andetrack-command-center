import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/cadence")({
  head: () => ({ meta: [{ title: "Operating Cadence · Anderoute" }] }),
  component: () => {
    const c = H.useGlobalOperatingCadence();
    return (<V85Page icon={<Calendar className="size-6 text-fuchsia-300" />} title="Global Operating Cadence Control" blurb="Cadence completion + health across all operating reviews.">
      <div className="grid gap-3 md:grid-cols-4"><ScoreCard label="Health" value={c.health.score} tone="emerald" /><ScoreCard label="On track" value={c.health.on_track} tone="sky" /><ScoreCard label="At risk" value={c.health.at_risk} tone="amber" /><ScoreCard label="Planned" value={c.health.planned} tone="rose" /></div>
      <Card className="border-white/10 bg-white/[0.02] p-4"><SimpleTable rows={c.items as any} columns={[{key:"cadence",label:"Cadence"},{key:"frequency",label:"Freq"},{key:"owner",label:"Owner"},{key:"completion",label:"Compl. %"},{key:"last",label:"Last"}]} /></Card>
    </V85Page>);
  },
});
