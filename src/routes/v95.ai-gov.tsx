import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const a = H.useAIGovernanceMaturity();
  return (
    <V95Page icon={<Bot className="size-6 text-cyan-300" />} title="AI Governance Maturity Center" blurb="Acceptance/rejection, approval rules, confidence thresholds, explainability, freshness, audit evidence, cost governance, provider governance — no autonomous financial / dispatch / customer actions.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="AI trust score"      value={a.summary.score} tone="emerald" />
        <ScoreCard label="Explainability"      value={a.summary.explainability} tone="sky" />
        <ScoreCard label="Data freshness"      value={a.summary.freshness} tone="violet" />
        <ScoreCard label="Approval rules"      value={a.summary.approval_rules} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Governance policy areas</h3>
        <div className="mt-2">
          <SimpleTable rows={a.policies as any} columns={[
            { key: "area", label: "Area" }, { key: "value", label: "Value" },
          ]} />
        </div>
      </Card>
      <Card className="border-cyan-400/30 bg-cyan-500/5 p-4 text-sm">
        <div className="font-semibold text-cyan-200">AI safety review (placeholder)</div>
        <div className="mt-1 text-xs text-muted-foreground">No autonomous dispatch, financial action, or customer message without human approval. All recommendations logged for audit.</div>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/ai-gov")({
  head: () => ({ meta: [{ title: "AI Governance · Anderoute V9.5" }] }),
  component: Page,
});
