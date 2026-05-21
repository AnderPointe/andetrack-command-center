import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { ScoreCard, KpiGrid, StatusPill } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { useAIGovernanceMaturityV6, useAIGovAlerts } from "@/v6/hooks";

export const Route = createFileRoute("/v6/ai-gov")({
  head: () => ({ meta: [{ title: "AI Governance · V6" }] }),
  component: () => {
    const { gov, trend } = useAIGovernanceMaturityV6();
    const { alerts } = useAIGovAlerts();
    const accept = Math.round((gov.recs_accepted / gov.recs_generated_24h) * 100);
    return (
      <V6Page icon={<Brain className="size-6 text-emerald-300" />} title="AI Governance Maturity (V6)"
        blurb="CoPilot recommendation quality, explainability coverage, data freshness, action approvals/denials, cost governance and safety/bias reviews. Confidence thresholds enforced.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Acceptance" value={accept} tone="emerald" />
          <ScoreCard label="Data freshness" value={gov.data_freshness_pct} tone="sky" />
          <ScoreCard label="Explainability cov" value={gov.explainability_coverage} tone="violet" />
          <ScoreCard label="Confidence floor" value={Math.round(gov.confidence_threshold * 100)} tone="amber" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Recs generated 24h", value: gov.recs_generated_24h.toLocaleString() },
          { label: "Accepted",  value: gov.recs_accepted.toLocaleString() },
          { label: "Rejected",  value: gov.recs_rejected.toLocaleString() },
          { label: "Actions approved", value: gov.actions_approved },
          { label: "Actions denied",   value: gov.actions_denied },
          { label: "Drafts generated", value: gov.drafts_generated },
          { label: "Cost 24h (USD)",   value: `$${gov.cost_usd_24h}` },
          { label: "Safety incidents", value: gov.safety_incidents },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Recs trend (7d)</h3>
          <div className="mt-3 flex items-end gap-2 h-32">
            {trend.map(d => (
              <div key={d.d} className="flex flex-1 flex-col items-center gap-1">
                <div className="relative w-full h-24 rounded bg-white/5">
                  <div className="absolute bottom-0 left-0 right-0 rounded-b bg-sky-400/40" style={{ height: `${(d.gen / 2000) * 100}%` }} />
                  <div className="absolute bottom-0 left-0 right-0 rounded-b bg-emerald-400/70" style={{ height: `${(d.acc / 2000) * 100}%` }} />
                </div>
                <div className="text-[10px] text-muted-foreground">{d.d}</div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">Emerald = accepted, sky = generated.</p>
        </Card>
      </V6Page>
    );
  },
});
