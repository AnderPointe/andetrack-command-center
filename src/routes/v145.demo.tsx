import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { Section, SimpleTable, ScoreCard, ExecHeadline } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const flow = H.useV145DemoFlow();
  const outcomes = H.useV145DemoOutcomes();
  const edge = H.useV145EdgeExtended();
  const teaser = H.useV145Phase43Teaser();
  return (
    <V145Page icon={<ListChecks className="size-6 text-fuchsia-300" />} title="V14.5 Demo Flow" blurb="10-step persona walkthrough: CEO, CFO, RevOps, MP Lead, PMM, Chief of Staff, Partner, COO, Board.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Demo steps" value={flow.length} tone="violet" />
        <ScoreCard label="Personas" value={new Set(flow.map(x => x.actor)).size} tone="emerald" />
        <ScoreCard label="Outcomes" value={outcomes.length} tone="amber" />
        <ScoreCard label="Phase" value="42" tone="rose" />
      </div>
      <Section title="Persona demo flow (polish)">
        <SimpleTable rows={flow as any} columns={[
          { key: "step", label: "#" }, { key: "actor", label: "Actor" },
          { key: "surface", label: "Surface" }, { key: "action", label: "Action" },
          { key: "expect", label: "Expected" }, { key: "outcome", label: "Outcome" },
        ]} />
      </Section>
      <Section title="Demo outcomes">
        <ul className="list-disc space-y-1 pl-5 text-sm">{outcomes.map(o => <li key={o}>{o}</li>)}</ul>
      </Section>
      <Section title="Edge Function vs ServerFn boundary (extended)">
        <SimpleTable rows={edge as any} columns={[
          { key: "boundary", label: "Boundary" }, { key: "name", label: "Surface" },
          { key: "caller", label: "Caller" }, { key: "auth", label: "Auth" },
          { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <ExecHeadline tag="Phase 43 (V15) teaser — not started" headline="Enterprise Performance Command + Strategic Operating Intelligence" bullets={teaser} />
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/demo")({ head: () => ({ meta: [{ title: "V14.5 Demo · Phase 42" }] }), component: Page });
