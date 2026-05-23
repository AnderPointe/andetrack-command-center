import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const p = H.usePredictiveOperatingExcellence();
  return (
    <V18Page icon={<Sparkles className="size-6 text-violet-300" />} title="Predictive Operating Excellence Center"
      blurb="Signal quality, coverage, freshness, recommendation readiness across revenue, MP, capital, accounts, partners, product, category, and exec/board workflows.">
      <ScoreCard label="Predictive operating excellence" value={p.score} tone="violet" />
      <KpiGrid cols={4} items={p.kpis} />
      <Section title="Signal coverage health">
        <SimpleTable rows={p.coverage as any} columns={[{ key: "area", label: "Area" }, { key: "coverage", label: "Coverage" }, { key: "note", label: "Note" }]} />
      </Section>
      <Section title="Data freshness by source">
        <SimpleTable rows={p.freshness as any} columns={[{ key: "source", label: "Source" }, { key: "freshness", label: "Fresh" }, { key: "stale", label: "Stale" }]} />
      </Section>
      <Section title="Recommendation readiness">
        <SimpleTable rows={p.readiness as any} columns={[{ key: "rec", label: "Recommendation" }, { key: "readiness", label: "Readiness" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Action plan">
        <SimpleTable rows={p.action_plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/pred-ops")({ component: Page });
