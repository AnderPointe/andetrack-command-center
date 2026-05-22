import { createFileRoute } from "@tanstack/react-router";
import { Command } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const { score, actions, blockers } = H.useEnterpriseCommercialCommand();
  return (
    <V12Page icon={<Command className="size-6 text-cyan-300" />} title="Enterprise Commercial Command System" blurb="Pipeline, blockers, velocity, slippage, revenue quality, and the next-best commercial actions across the enterprise motion.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Command score" value={score.score}            tone="emerald" />
        <ScoreCard label="Velocity"      value={`${score.velocity_days}d`} tone="sky" />
        <ScoreCard label="Slippage"      value={`${score.slippage_pct}%`}  tone="amber" />
        <ScoreCard label="Rev quality"   value={score.revenue_quality}     tone="violet" />
      </div>
      <KpiGrid cols={4} items={[
        { label: "Enterprise pipeline", value: `$${(score.enterprise_pipeline_usd/1_000_000).toFixed(1)}M` },
        { label: "Strategic pipeline",  value: `$${(score.strategic_pipeline_usd/1_000_000).toFixed(1)}M` },
        { label: "Expansion pipeline",  value: `$${(score.expansion_pipeline_usd/1_000_000).toFixed(1)}M` },
        { label: "Renewal pipeline",    value: `$${(score.renewal_pipeline_usd/1_000_000).toFixed(1)}M` },
        { label: "Partner sourced",     value: `$${(score.partner_sourced_usd/1_000_000).toFixed(1)}M` },
        { label: "MP influenced",       value: `$${(score.marketplace_influenced_usd/1_000_000).toFixed(1)}M` },
        { label: "Trust influenced",    value: `$${(score.trust_influenced_usd/1_000_000).toFixed(1)}M` },
        { label: "Blocked deals",       value: String(score.blocked_procurement + score.blocked_security + score.blocked_technical) },
      ]} />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Next best commercial actions</h3>
        <SimpleTable rows={actions as any} columns={[
          { key: "action", label: "Action" }, { key: "owner", label: "Owner" },
          { key: "impact", label: "Impact" }, { key: "due", label: "Due" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Commercial blockers</h3>
        <SimpleTable rows={blockers as any} columns={[
          { key: "deal", label: "Deal" }, { key: "stage", label: "Stage" },
          { key: "blocker", label: "Blocker" }, { key: "owner", label: "Owner" },
          { key: "age_days", label: "Age (d)" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/command")({
  head: () => ({ meta: [{ title: "Commercial Command · V12" }] }),
  component: Page,
});
