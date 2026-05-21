import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/discipline")({
  head: () => ({ meta: [{ title: "Operating Discipline · Anderoute" }] }),
  component: () => {
    const d = H.useGlobalOperatingDiscipline();
    return (<V85Page icon={<Activity className="size-6 text-fuchsia-300" />} title="Global Enterprise Operating Discipline" blurb="14 discipline domains, gaps, and action plan.">
      <div className="grid gap-3 md:grid-cols-3"><ScoreCard label="Score" value={d.score.score} tone="emerald" /><ScoreCard label="Trend" value={`+${d.score.trend_pts}`} tone="sky" /><ScoreCard label="Gaps" value={d.gaps.length} tone="amber" /></div>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Discipline domains</h3><SimpleTable rows={d.domains as any} columns={[{key:"domain",label:"Domain"},{key:"score",label:"Score"},{key:"trend",label:"Trend"},{key:"owner",label:"Owner"}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Gaps</h3><SimpleTable rows={d.gaps as any} columns={[{key:"gap",label:"Gap"},{key:"domain",label:"Domain"},{key:"owner",label:"Owner"},{key:"due",label:"Due"}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Action plan</h3><SimpleTable rows={d.actions as any} columns={[{key:"action",label:"Action"},{key:"owner",label:"Owner"},{key:"status",label:"Status",render:(r:any)=><StatusPill status={r.status}/>}]} /></Card>
    </V85Page>);
  },
});
