import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/product-lines")({
  head: () => ({ meta: [{ title: "Product-Line Stewardship · Anderoute" }] }),
  component: () => {
    const p = H.useProductLineStewardship();
    return (<V85Page icon={<Boxes className="size-6 text-fuchsia-300" />} title="Product-Line Stewardship" blurb="Investment recommendation per line. Tech debt is a placeholder.">
      <div className="grid gap-3 md:grid-cols-3"><ScoreCard label="Score" value={p.summary.score} tone="emerald" /><ScoreCard label="Expand" value={p.summary.expand} tone="sky" /><ScoreCard label="Maintain" value={p.summary.maintain} tone="amber" /></div>
      <Card className="border-white/10 bg-white/[0.02] p-4"><SimpleTable rows={p.lines as any} columns={[{key:"line",label:"Line"},{key:"owner",label:"Owner"},{key:"adoption",label:"Ad %"},{key:"value",label:"Value"},{key:"support",label:"Sup"},{key:"reliability",label:"Reli"},{key:"competitive",label:"Comp"},{key:"investment",label:"Investment",render:(r:any)=><StatusPill status={r.investment}/>}]} /></Card>
    </V85Page>);
  },
});
