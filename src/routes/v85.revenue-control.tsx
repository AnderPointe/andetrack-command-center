import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/revenue-control")({
  head: () => ({ meta: [{ title: "Revenue Control Maturity · Anderoute" }] }),
  component: () => {
    const r = H.useRevenueControlMaturity();
    return (<V85Page icon={<Wallet className="size-6 text-fuchsia-300" />} title="Revenue Control Maturity (placeholder)" blurb="Tracker only — not GAAP, not financial audit.">
      <div className="grid gap-3 md:grid-cols-4"><ScoreCard label="Score" value={r.score.score} tone="amber" /><ScoreCard label="Event completeness %" value={r.score.event_completeness} tone="emerald" /><ScoreCard label="Exception rate %" value={r.score.recon_exception_rate} tone="rose" /><ScoreCard label="Manual adj rate %" value={r.score.manual_adjustment_rate} tone="amber" /></div>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Event completeness</h3><SimpleTable rows={r.completeness as any} columns={[{key:"source",label:"Source"},{key:"completeness",label:"%"}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Recon exception trend</h3><SimpleTable rows={r.trend as any} columns={[{key:"week",label:"Week"},{key:"exceptions",label:"Open"}]} /></Card>
    </V85Page>);
  },
});
