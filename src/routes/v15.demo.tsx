import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Section, SimpleTable, ScoreCard, ExecHeadline } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const flow = H.useV15Demo();
  const out = H.useV15DemoOutcomes();
  const teaser = H.useV15Phase44Teaser();
  return (
    <V15Page icon={<ListChecks className="size-6 text-cyan-300" />} title="V15 Demo Flow" blurb="10-step persona walkthrough: CEO, CFO, MP Lead, Strategy, Board CoS, Product, CoS, Board.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Demo steps" value={flow.length} tone="violet" />
        <ScoreCard label="Personas" value={new Set(flow.map(x => x.actor)).size} tone="emerald" />
        <ScoreCard label="Outcomes" value={out.length} tone="amber" />
        <ScoreCard label="Phase" value="43" tone="rose" />
      </div>
      <Section title="Persona demo flow">
        <SimpleTable rows={flow as any} columns={[
          { key: "step", label: "#" }, { key: "actor", label: "Actor" },
          { key: "surface", label: "Surface" }, { key: "action", label: "Action" },
          { key: "expect", label: "Expected" }, { key: "outcome", label: "Outcome" },
        ]} />
      </Section>
      <Section title="Demo outcomes">
        <ul className="list-disc space-y-1 pl-5 text-sm">{out.map(o => <li key={o}>{o}</li>)}</ul>
      </Section>
      <ExecHeadline tag="Phase 44 (V15.5) teaser — not started" headline="Enterprise intelligence maturity + autonomous-assist (human approval)" bullets={teaser} />
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/demo")({
  head: () => ({ meta: [{ title: "V15 Demo · Phase 43" }] }),
  component: Page,
});
