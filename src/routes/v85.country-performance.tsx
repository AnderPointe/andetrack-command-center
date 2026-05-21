import { createFileRoute } from "@tanstack/react-router";
import { BookCheck } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/country-performance")({
  head: () => ({ meta: [{ title: "Country Performance Review · Anderoute" }] }),
  component: () => {
    const c = H.useCountryPerformanceReview();
    return (<V85Page icon={<BookCheck className="size-6 text-fuchsia-300" />} title="Country Performance Review System" blurb="Operating, liquidity, adoption, support, financial, compliance + expansion decision.">
      <Card className="border-white/10 bg-white/[0.02] p-4"><SimpleTable rows={c.rows as any} columns={[{key:"country",label:"Country"},{key:"operating",label:"Op"},{key:"liquidity",label:"Liq"},{key:"adoption",label:"Ad"},{key:"carrier",label:"Carr"},{key:"financial",label:"Fin"},{key:"compliance",label:"Comp"},{key:"support",label:"Sup"},{key:"risk",label:"Risk"},{key:"decision",label:"Decision"}]} /></Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Review notes</h3><SimpleTable rows={c.notes as any} columns={[{key:"country",label:"Country"},{key:"note",label:"Note"}]} /></Card>
    </V85Page>);
  },
});
