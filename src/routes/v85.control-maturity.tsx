import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/control-maturity")({
  head: () => ({ meta: [{ title: "International Control Maturity · Anderoute" }] }),
  component: () => {
    const c = H.useInternationalControlMaturity();
    return (<V85Page icon={<ShieldCheck className="size-6 text-fuchsia-300" />} title="International Control Maturity Center" blurb="Designed → implemented → tested → evidence collected.">
      <div className="grid gap-3 md:grid-cols-4"><ScoreCard label="Score" value={c.summary.score} tone="emerald" /><ScoreCard label="Tested" value={c.summary.controls_tested} tone="sky" /><ScoreCard label="Evidence %" value={c.summary.evidence_completeness} tone="amber" /><ScoreCard label="Exceptions" value={c.summary.exceptions_open} tone="rose" /></div>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Control domains</h3><SimpleTable rows={c.domains as any} columns={[{key:"domain",label:"Domain"},{key:"score",label:"Score"},{key:"status",label:"Status",render:(r:any)=><StatusPill status={r.status}/>},{key:"owner",label:"Owner"},{key:"exception",label:"Open ex."}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Exception register</h3><SimpleTable rows={c.exceptions as any} columns={[{key:"id",label:"ID"},{key:"domain",label:"Domain"},{key:"severity",label:"Severity"},{key:"owner",label:"Owner"},{key:"due",label:"Due"},{key:"status",label:"Status",render:(r:any)=><StatusPill status={r.status}/>}]} /></Card>
    </V85Page>);
  },
});
