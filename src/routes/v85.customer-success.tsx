import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/customer-success")({
  head: () => ({ meta: [{ title: "Customer Success Discipline · Anderoute" }] }),
  component: () => {
    const s = H.useGlobalCustomerSuccessDiscipline();
    return (<V85Page icon={<Users className="size-6 text-fuchsia-300" />} title="Global Customer Success Discipline" blurb="Renewal risk + expansion + success plan completion.">
      <div className="grid gap-3 md:grid-cols-4"><ScoreCard label="Score" value={s.summary.score} tone="emerald" /><ScoreCard label="At risk" value={s.summary.at_risk} tone="rose" /><ScoreCard label="Expansion open" value={s.summary.expansion_open} tone="sky" /><ScoreCard label="Sponsors engaged" value={s.summary.exec_sponsors_engaged} tone="amber" /></div>
      <Card className="border-white/10 bg-white/[0.02] p-4"><SimpleTable rows={s.accounts as any} columns={[{key:"account",label:"Account"},{key:"country",label:"Country"},{key:"health",label:"Health"},{key:"adoption",label:"Ad %"},{key:"renewal",label:"Renewal"},{key:"expansion",label:"Expansion"},{key:"sponsor",label:"Sponsor"},{key:"success_plan",label:"Plan",render:(r:any)=><StatusPill status={r.success_plan}/>}]} /></Card>
    </V85Page>);
  },
});
