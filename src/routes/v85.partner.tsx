import { createFileRoute } from "@tanstack/react-router";
import { Plug } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/partner")({
  head: () => ({ meta: [{ title: "Partner Operating Discipline · Anderoute" }] }),
  component: () => {
    const p = H.usePartnerOperatingDiscipline();
    return (<V85Page icon={<Plug className="size-6 text-fuchsia-300" />} title="Partner Operating Discipline" blurb="Launch + revenue placeholder + security/compliance + risk.">
      <div className="grid gap-3 md:grid-cols-4"><ScoreCard label="Score" value={p.summary.score} tone="emerald" /><ScoreCard label="Live" value={p.summary.live} tone="sky" /><ScoreCard label="Pilot" value={p.summary.pilot} tone="amber" /><ScoreCard label="Issues open" value={p.summary.issues_open} tone="rose" /></div>
      <Card className="border-white/10 bg-white/[0.02] p-4"><SimpleTable rows={p.partners as any} columns={[{key:"partner",label:"Partner"},{key:"launch",label:"Launch",render:(r:any)=><StatusPill status={r.launch}/>},{key:"security",label:"Security"},{key:"compliance",label:"Comp"},{key:"integration",label:"Integ"},{key:"docs",label:"Docs"},{key:"support_burden",label:"Sup"},{key:"risk",label:"Risk"},{key:"issues",label:"Issues"},{key:"opportunity",label:"Opp"}]} /></Card>
    </V85Page>);
  },
});
