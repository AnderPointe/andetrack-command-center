import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/stewardship-exec")({
  head: () => ({ meta: [{ title: "Executive Stewardship · Anderoute" }] }),
  component: () => {
    const e = H.useExecutiveStewardship();
    return (<V85Page icon={<Crown className="size-6 text-fuchsia-300" />} title="Executive Stewardship Dashboard" blurb="What each executive owns this week + cross-functional blockers.">
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Priorities</h3><SimpleTable rows={e.priorities as any} columns={[{key:"exec",label:"Exec"},{key:"priority",label:"Priority"},{key:"blocker",label:"Blocker"}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Cross-functional blockers</h3><SimpleTable rows={e.blockers as any} columns={[{key:"blocker",label:"Blocker"},{key:"owners",label:"Owners"},{key:"age_days",label:"Age (d)"}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Strategic initiatives</h3><SimpleTable rows={e.initiatives as any} columns={[{key:"initiative",label:"Initiative"},{key:"status",label:"Status",render:(r:any)=><StatusPill status={r.status}/>},{key:"sponsor",label:"Sponsor"}]} /></Card>
    </V85Page>);
  },
});
