import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/stewardship")({
  head: () => ({ meta: [{ title: "Platform Stewardship · Anderoute" }] }),
  component: () => {
    const s = H.usePlatformStewardship();
    return (<V85Page icon={<Star className="size-6 text-fuchsia-300" />} title="Long-Term Platform Stewardship Model" blurb="Owner + health + risk + action across 12 stewardship domains.">
      <div className="grid gap-3 md:grid-cols-4"><ScoreCard label="Score" value={s.summary.score} tone="emerald" /><ScoreCard label="Owners" value={s.summary.owners} tone="sky" /><ScoreCard label="Actions" value={s.summary.action_items} tone="amber" /><ScoreCard label="Top risks" value={s.summary.top_risks} tone="rose" /></div>
      <Card className="border-white/10 bg-white/[0.02] p-4"><SimpleTable rows={s.domains as any} columns={[{key:"domain",label:"Domain"},{key:"owner",label:"Owner"},{key:"health",label:"Health"},{key:"risk",label:"Risk"},{key:"action",label:"Action"}]} /></Card>
    </V85Page>);
  },
});
