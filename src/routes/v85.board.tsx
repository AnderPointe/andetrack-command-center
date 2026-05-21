import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/board")({
  head: () => ({ meta: [{ title: "Board Governance · Anderoute" }] }),
  component: () => {
    const b = H.useAdvancedBoardGovernance();
    return (<V85Page icon={<FileCheck2 className="size-6 text-fuchsia-300" />} title="Advanced Board Governance Center" blurb="Quarterly board cycle, packet builder, decision register, action tracker.">
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Board calendar</h3><SimpleTable rows={b.calendar as any} columns={[{key:"date",label:"Date"},{key:"event",label:"Event"},{key:"owner",label:"Owner"}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Packet sections</h3><SimpleTable rows={b.packet as any} columns={[{key:"section",label:"Section"},{key:"owner",label:"Owner"},{key:"status",label:"Status",render:(r:any)=><StatusPill status={r.status}/>}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Board decisions</h3><SimpleTable rows={b.decisions as any} columns={[{key:"id",label:"ID"},{key:"subject",label:"Subject"},{key:"owner",label:"Owner"},{key:"status",label:"Status",render:(r:any)=><StatusPill status={r.status}/>},{key:"due",label:"Due"}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Action tracker</h3><SimpleTable rows={b.actions as any} columns={[{key:"id",label:"ID"},{key:"action",label:"Action"},{key:"owner",label:"Owner"},{key:"due",label:"Due"},{key:"status",label:"Status",render:(r:any)=><StatusPill status={r.status}/>}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">KPI appendix</h3><SimpleTable rows={b.kpi as any} columns={[{key:"kpi",label:"KPI"},{key:"value",label:"Value"}]} /></Card>
    </V85Page>);
  },
});
