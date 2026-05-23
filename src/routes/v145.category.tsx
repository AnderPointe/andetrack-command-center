import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, Section, KpiGrid } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const c = H.useCategoryExecutionMaturity();
  return (
    <V145Page icon={<Star className="size-6 text-fuchsia-300" />} title="Category Leadership Execution Maturity Center" blurb="Narrative, education, positioning, differentiation, proof execution across all surfaces.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Execution maturity" value={c.score} tone="sky" />
        <ScoreCard label="Dimensions" value={c.dimensions.length} tone="violet" />
        <ScoreCard label="Open risks" value={c.risks.length} tone="amber" />
      </div>
      <Section title="CategoryExecutionBoard">
        <KpiGrid cols={4} items={c.dimensions.map(d => ({ label: d.dim, value: `${d.pct}%` }))} />
      </Section>
      <Section title="CategoryExecutionRiskPanel">
        <ul className="list-disc pl-5 text-sm">{c.risks.map(r => <li key={r}>{r}</li>)}</ul>
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/category")({ head: () => ({ meta: [{ title: "Category Execution · V14.5" }] }), component: Page });
