import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const c = H.useCategoryLeadershipOperatingSystem();
  return (
    <V15Page icon={<Star className="size-6 text-cyan-300" />} title="Category Leadership Operating System" blurb="Category narrative, proof execution, evidence freshness, sales/board narrative readiness.">
      <ScoreCard label="Category leadership operating" value={c.score} tone="sky" />
      <Section title="Category pillars">
        <SimpleTable rows={c.pillars as any} columns={[
          { key: "pillar", label: "Pillar" },
          { key: "execution", label: "Execution", render: (r: any) => <StatusPill status={r.execution} /> },
          { key: "evidence", label: "Evidence", render: (r: any) => <StatusPill status={r.evidence} /> },
        ]} />
      </Section>
      <Section title="Action plan">
        <ol className="list-decimal space-y-1 pl-5 text-xs">{c.actions.map((a) => <li key={a}>{a}</li>)}</ol>
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/category")({
  head: () => ({ meta: [{ title: "Category OS · V15" }] }),
  component: Page,
});
