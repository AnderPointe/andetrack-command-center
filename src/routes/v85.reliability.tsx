import { createFileRoute } from "@tanstack/react-router";
import { ServerCog } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/reliability")({
  head: () => ({ meta: [{ title: "Platform Reliability Stewardship · Anderoute" }] }),
  component: () => {
    const r = H.usePlatformReliabilityStewardship();
    return (<V85Page icon={<ServerCog className="size-6 text-fuchsia-300" />} title="Platform Reliability Stewardship" blurb="Uptime + error budget remain placeholders.">
      <div className="grid gap-3 md:grid-cols-4"><ScoreCard label="Score" value={r.summary.score} tone="emerald" /><ScoreCard label="Incidents 30d" value={r.summary.incidents_30d} tone="amber" /><ScoreCard label="Critical 30d" value={r.summary.critical_30d} tone="rose" /><ScoreCard label="PMs complete %" value={r.summary.postmortems_complete_pct} tone="sky" /></div>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Incidents</h3><SimpleTable rows={r.incidents as any} columns={[{key:"id",label:"ID"},{key:"service",label:"Service"},{key:"severity",label:"Severity"},{key:"postmortem",label:"Postmortem",render:(r:any)=><StatusPill status={r.postmortem}/>}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Action tracker</h3><SimpleTable rows={r.actions as any} columns={[{key:"action",label:"Action"},{key:"owner",label:"Owner"},{key:"due",label:"Due"}]} /></Card>
    </V85Page>);
  },
});
