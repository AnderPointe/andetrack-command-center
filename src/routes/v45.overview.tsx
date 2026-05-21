import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { ScoreCard } from "@/components/v45/ui-bits";
import { V45_MATURITY } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/overview")({
  head: () => ({ meta: [{ title: "V4.5 Overview · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Gauge className="size-6 text-violet-300" />} title="V4.5 Operational Maturity"
      blurb="Human-approved automation, national marketplace ops, certification execution, mobile launch, acquisition readiness, and a national operating model. Mock data — no autonomous dispatch.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Overall maturity" value={V45_MATURITY.overall} tone="violet" />
        <ScoreCard label="Automation" value={V45_MATURITY.automation} tone="sky" />
        <ScoreCard label="Marketplace ops" value={V45_MATURITY.marketplace_ops} tone="emerald" />
        <ScoreCard label="Mobile launch" value={V45_MATURITY.mobile_launch} tone="sky" />
        <ScoreCard label="SOC 2 execution" value={V45_MATURITY.soc2_execution} tone="amber" />
        <ScoreCard label="Acquisition" value={V45_MATURITY.acquisition} tone="amber" />
        <ScoreCard label="Customer success" value={V45_MATURITY.customer_success} tone="emerald" />
        <ScoreCard label="Support" value={V45_MATURITY.support} tone="emerald" />
        <ScoreCard label="AI governance" value={V45_MATURITY.ai_governance} tone="sky" />
        <ScoreCard label="Revenue ops" value={V45_MATURITY.revenue_ops} tone="emerald" />
        <ScoreCard label="Partner ecosystem" value={V45_MATURITY.partner_ecosystem} tone="amber" />
      </div>
    </V45Page>
  ),
});
