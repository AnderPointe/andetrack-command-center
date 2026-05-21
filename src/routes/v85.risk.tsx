import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/risk")({
  head: () => ({ meta: [{ title: "Strategic Risk Ownership · Anderoute" }] }),
  component: () => {
    const r = H.useStrategicRiskOwnership();
    return (<V85Page icon={<AlertTriangle className="size-6 text-fuchsia-300" />} title="Strategic Risk Ownership" blurb="8 strategic risks, owners, mitigations, board visibility, residual trend.">
      <Card className="border-white/10 bg-white/[0.02] p-4"><SimpleTable rows={r.risks as any} columns={[{key:"id",label:"ID"},{key:"category",label:"Category"},{key:"severity",label:"Severity"},{key:"probability",label:"Prob"},{key:"impact",label:"Impact"},{key:"owner",label:"Owner"},{key:"sponsor",label:"Sponsor"},{key:"mitigation",label:"Mitigation"},{key:"due",label:"Due"},{key:"residual",label:"Residual"}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Residual risk trend</h3><SimpleTable rows={r.residual as any} columns={[{key:"week",label:"Week"},{key:"residual",label:"Score"}]} /></Card>
    </V85Page>);
  },
});
