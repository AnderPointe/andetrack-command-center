import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { ScoreCard, KpiGrid } from "@/components/v45/ui-bits";
import { Card } from "@/components/ui/card";
import { AI_GOVERNANCE_MATURITY, AI_GOVERNANCE_TREND } from "@/v45/data/mockPhase22";

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
        { label: "Safety incidents", value: AI_GOVERNANCE_MATURITY.safety_incidents, sub: "placeholder" },
      ]} />

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Trend (6w)</h3>
        <div className="mt-3 grid grid-cols-6 items-end gap-2 h-32">
          {AI_GOVERNANCE_TREND.map(t => (
            <div key={t.week} className="flex flex-col items-center gap-1">
              <div className="flex items-end h-24 gap-0.5">
                <div className="w-3 rounded-t bg-emerald-400/70" style={{ height: `${t.approval * 100}%` }} title={`Approval ${Math.round(t.approval*100)}%`} />
                <div className="w-3 rounded-t bg-sky-400/70"     style={{ height: `${t.acceptance * 100}%` }} title={`Acceptance ${Math.round(t.acceptance*100)}%`} />
                <div className="w-3 rounded-t bg-rose-400/60"    style={{ height: `${t.violations * 10}%` }} title={`Violations ${t.violations}`} />
              </div>
              <div className="text-[10px] text-muted-foreground">{t.week}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 text-[10px] text-muted-foreground">Green = approval · Sky = acceptance · Red = violations</div>
      </Card>
    </V45Page>
  ),
});
