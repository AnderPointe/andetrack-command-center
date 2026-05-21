import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/compliance")({
  head: () => ({ meta: [{ title: "Compliance Execution Maturity · Anderoute" }] }),
  component: () => {
    const c = H.useComplianceExecutionMaturity();
    return (<V85Page icon={<FileBarChart className="size-6 text-fuchsia-300" />} title="Compliance Execution Maturity" blurb="No final SOC 2 / ISO claims.">
      <div className="grid gap-3 md:grid-cols-4"><ScoreCard label="Score" value={c.summary.score} tone="emerald" /><ScoreCard label="Tested" value={c.summary.controls_tested} tone="sky" /><ScoreCard label="Evidence %" value={c.summary.evidence_collected} tone="amber" /><ScoreCard label="Remediations overdue" value={c.summary.remediations_overdue} tone="rose" /></div>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Execution trend</h3><SimpleTable rows={c.trend as any} columns={[{key:"week",label:"Week"},{key:"controls_tested",label:"Tested"}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Remediation items</h3><SimpleTable rows={c.remediation as any} columns={[{key:"item",label:"Item"},{key:"owner",label:"Owner"},{key:"due",label:"Due"},{key:"overdue",label:"Overdue",render:(r:any)=><StatusPill status={r.overdue?"exception":"pass"}/>}]} /></Card>
    </V85Page>);
  },
});
