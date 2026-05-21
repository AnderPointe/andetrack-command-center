import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/support")({
  head: () => ({ meta: [{ title: "International Support Discipline · Anderoute" }] }),
  component: () => {
    const s = H.useInternationalSupportDiscipline();
    return (<V85Page icon={<LifeBuoy className="size-6 text-fuchsia-300" />} title="International Support Discipline" blurb="Bilingual + multi-timezone coverage are placeholders.">
      <div className="grid gap-3 md:grid-cols-3"><ScoreCard label="Score" value={s.summary.score} tone="emerald" /><ScoreCard label="KB coverage %" value={s.summary.kb_coverage} tone="sky" /><ScoreCard label="Escalation health" value={s.summary.escalation_health} tone="amber" /></div>
      <Card className="border-white/10 bg-white/[0.02] p-4"><SimpleTable rows={s.regions as any} columns={[{key:"country",label:"Country"},{key:"hours",label:"Hours"},{key:"timezones",label:"TZ"},{key:"language",label:"Lang"},{key:"sla",label:"SLA"},{key:"critical",label:"Crit"},{key:"escalations",label:"Esc"},{key:"kb",label:"KB"}]} /></Card>
    </V85Page>);
  },
});
