import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/fin-testing")({
  head: () => ({ meta: [{ title: "Financial Control Testing · Anderoute" }] }),
  component: () => {
    const f = H.useFinancialControlTesting();
    return (<V85Page icon={<Receipt className="size-6 text-fuchsia-300" />} title="Financial Control Testing Center" blurb="Test runner + result + evidence queue. Placeholder tests called out.">
      <div className="grid gap-3 md:grid-cols-4"><ScoreCard label="Total" value={f.summary.total} tone="sky" /><ScoreCard label="Pass" value={f.summary.passing} tone="emerald" /><ScoreCard label="Review" value={f.summary.review} tone="amber" /><ScoreCard label="Exception" value={f.summary.exception} tone="rose" /></div>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Tests</h3><SimpleTable rows={f.tests as any} columns={[{key:"test",label:"Test"},{key:"owner",label:"Owner"},{key:"status",label:"Status",render:(r:any)=><StatusPill status={r.status}/>},{key:"last_run",label:"Last run"},{key:"evidence",label:"Evidence"}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Evidence requests</h3><SimpleTable rows={f.evidence as any} columns={[{key:"request",label:"Request"},{key:"owner",label:"Owner"},{key:"due",label:"Due"},{key:"status",label:"Status",render:(r:any)=><StatusPill status={r.status}/>}]} /></Card>
    </V85Page>);
  },
});
