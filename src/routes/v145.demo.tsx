import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { Section, SimpleTable, ScoreCard, ExecHeadline } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const d = H.useV145Demo();
  const teaser = H.useV145Phase43Teaser();
  return (
    <V145Page icon={<ListChecks className="size-6 text-fuchsia-300" />} title="V14.5 Demo Flow" blurb="Guided walkthrough of CEO, CFO, MP, Strategy, Board admin, and Partner views.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Demo steps" value={d.length} tone="violet" />
        <ScoreCard label="Actors" value={new Set(d.map(x => x.actor)).size} tone="emerald" />
        <ScoreCard label="Phase" value="42" tone="amber" />
      </div>
      <Section title="Demo flow">
        <SimpleTable rows={d as any} columns={[
          { key: "actor", label: "Actor" }, { key: "step", label: "Step" }, { key: "expect", label: "Expected" },
        ]} />
      </Section>
      <ExecHeadline tag="Phase 43 (V15) teaser — not started" headline="Enterprise Performance Command + Strategic Operating Intelligence" bullets={teaser} />
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/demo")({ head: () => ({ meta: [{ title: "V14.5 Demo · Phase 42" }] }), component: Page });
