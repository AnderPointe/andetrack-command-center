import { createFileRoute } from "@tanstack/react-router";
import { Command } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const o = H.useCapitalGrowthOperations();
  const s = o.score;
  return (
    <V125Page icon={<Command className="size-6 text-teal-300" />} title="Capital-Grade Growth Operations Center" blurb="Cross-functional growth operating health. Mock-only, no autonomous dispatch.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Growth ops"        value={s.score}              tone="emerald" />
        <ScoreCard label="Pipeline"          value={s.pipeline_health}    tone="sky" />
        <ScoreCard label="Expansion"         value={s.expansion_health}   tone="violet" />
        <ScoreCard label="Renewal"           value={s.renewal_health}     tone="amber" />
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Marketplace"       value={s.marketplace_health} tone="sky" />
        <ScoreCard label="API/EDI"           value={s.api_edi_health}     tone="violet" />
        <ScoreCard label="Partner"           value={s.partner_health}     tone="emerald" />
        <ScoreCard label="Trust-led"         value={s.trust_health}       tone="amber" />
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Procurement blockers" value={s.procurement_blocker_health} tone="rose" />
        <ScoreCard label="Deal execution"   value={s.deal_execution_health}   tone="sky" />
        <ScoreCard label="Revenue quality"  value={s.revenue_quality_health}  tone="emerald" />
        <ScoreCard label="Commercial risk"  value={s.commercial_risk_health}  tone="amber" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="Board evidence readiness"     value={s.board_evidence_readiness}     tone="emerald" />
        <ScoreCard label="Capital data room readiness"  value={s.capital_data_room_readiness}  tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Next growth actions</h3>
        <SimpleTable rows={o.actions as any} columns={[
          { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "impact", label: "Impact" }, { key: "due", label: "Due" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Risk summary</h3>
        <SimpleTable rows={o.risks as any} columns={[{ key: "risk", label: "Risk" }, { key: "severity", label: "Severity" }, { key: "owner", label: "Owner" }]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
        Capital growth executive summary — mock placeholder. Growth ops {s.score} ({s.trend_qoq >= 0 ? "+" : ""}{s.trend_qoq} QoQ). Pipeline {s.pipeline_health}, expansion {s.expansion_health}, marketplace {s.marketplace_health}. 2 growth risks for executive review.
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/growth-ops")({
  head: () => ({ meta: [{ title: "Growth Operations · V12.5" }] }),
  component: Page,
});
