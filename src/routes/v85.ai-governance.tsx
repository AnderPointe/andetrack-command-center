import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/ai-governance")({
  head: () => ({ meta: [{ title: "AI Governance Stewardship · Anderoute" }] }),
  component: () => {
    const a = H.useAIGovernanceStewardship();
    return (<V85Page icon={<Bot className="size-6 text-fuchsia-300" />} title="AI Governance Stewardship" blurb="Approval rules + thresholds + explainability + cost controls. No final autonomous claims.">
      <div className="grid gap-3 md:grid-cols-4"><ScoreCard label="Score" value={a.summary.score} tone="emerald" /><ScoreCard label="Rules" value={a.summary.approval_rules} tone="sky" /><ScoreCard label="Explainability %" value={a.summary.explainability_pct} tone="amber" /><ScoreCard label="Evidence %" value={a.summary.audit_evidence_pct} tone="rose" /></div>
      <Card className="border-white/10 bg-white/[0.02] p-4"><h3 className="text-sm font-semibold">Policy areas</h3><SimpleTable rows={a.policies as any} columns={[{key:"area",label:"Area"},{key:"owner",label:"Owner"},{key:"rule",label:"Rule"}]} /></Card>
    </V85Page>);
  },
});
