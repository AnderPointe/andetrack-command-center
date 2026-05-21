import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/control-ownership")({
  head: () => ({ meta: [{ title: "Control Ownership · Anderoute" }] }),
  component: () => {
    const { controls } = H.useGlobalControlOwnership();
    return (<V85Page icon={<ClipboardCheck className="size-6 text-fuchsia-300" />} title="Global Control Ownership Matrix" blurb="Owner + sponsor + cadence + evidence + escalation.">
      <Card className="border-white/10 bg-white/[0.02] p-4"><SimpleTable rows={controls as any} columns={[{key:"control",label:"Control"},{key:"owner",label:"Owner"},{key:"country",label:"Country"},{key:"sponsor",label:"Sponsor"},{key:"cadence",label:"Cadence"},{key:"last_tested",label:"Last"},{key:"result",label:"Result",render:(r:any)=><StatusPill status={r.result}/>},{key:"exception",label:"Exception"},{key:"due",label:"Due"},{key:"escalation",label:"Escalation"}]} /></Card>
    </V85Page>);
  },
});
