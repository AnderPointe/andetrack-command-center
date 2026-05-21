import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { ScoreCard, KpiGrid } from "@/components/v45/ui-bits";
import { AI_GOVERNANCE_MATURITY } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/ai-governance")({
  head: () => ({ meta: [{ title: "AI Governance · Anderoute" }] }),
  component: () => (
    <V45Page icon={<BrainCircuit className="size-6 text-violet-300" />} title="AI Governance Maturity"
      blurb="Approval rates, acceptance, threshold violations, audit coverage, data-source transparency, and AI cost governance. AI never executes high-risk actions without human approval.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Approval rate" value={Math.round(AI_GOVERNANCE_MATURITY.approval_rate * 100)} tone="emerald" />
        <ScoreCard label="Audit coverage" value={AI_GOVERNANCE_MATURITY.audit_coverage} tone="emerald" />
        <ScoreCard label="Data source transparency" value={AI_GOVERNANCE_MATURITY.data_source_transparency} tone="sky" />
      </div>
      <KpiGrid cols={4} items={[
        { label: "Acceptance", value: `${Math.round(AI_GOVERNANCE_MATURITY.acceptance * 100)}%` },
        { label: "Rejected", value: `${Math.round(AI_GOVERNANCE_MATURITY.rejected * 100)}%` },
        { label: "Threshold violations", value: AI_GOVERNANCE_MATURITY.threshold_violations },
        { label: "Customer drafts", value: AI_GOVERNANCE_MATURITY.customer_drafts },
        { label: "Dispatch recs", value: AI_GOVERNANCE_MATURITY.dispatch_recs },
        { label: "Monthly cost", value: `$${AI_GOVERNANCE_MATURITY.monthly_cost_usd.toLocaleString()}` },
        { label: "Safety incidents (placeholder)", value: AI_GOVERNANCE_MATURITY.safety_incidents },
      ]} />
    </V45Page>
  ),
});
