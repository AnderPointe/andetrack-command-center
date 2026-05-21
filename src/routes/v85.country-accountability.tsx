import { createFileRoute } from "@tanstack/react-router";
import { Flag } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/country-accountability")({
  head: () => ({ meta: [{ title: "Country Accountability · Anderoute" }] }),
  component: () => {
    const { countries } = H.useCountryAccountability();
    return (<V85Page icon={<Flag className="size-6 text-fuchsia-300" />} title="Country Accountability Dashboard" blurb="Owner + sponsor + health + exceptions + expansion recommendation.">
      <Card className="border-white/10 bg-white/[0.02] p-4"><SimpleTable rows={countries as any} columns={[{key:"country",label:"Country"},{key:"owner",label:"Owner"},{key:"sponsor",label:"Sponsor"},{key:"phase",label:"Phase"},{key:"operating",label:"Op"},{key:"marketplace",label:"MP"},{key:"financial",label:"Fin"},{key:"compliance",label:"Comp"},{key:"residency_risk",label:"Residency"},{key:"blockers",label:"Blk"},{key:"exceptions",label:"Ex"},{key:"expansion_rec",label:"Rec"}]} /></Card>
    </V85Page>);
  },
});
