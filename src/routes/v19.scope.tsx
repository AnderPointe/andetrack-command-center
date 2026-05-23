import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V19Page } from "@/components/v19/V19Page";
import { Section, SimpleTable, ScoreCard } from "@/components/v19/ui-bits";
import * as H from "@/v19/hooks";

function Page() {
  const s = H.useV19Scope();
  return (
    <V19Page icon={<Layers className="size-6 text-violet-300" />} title="V19 Scope"
      blurb="V19 scope board, feature matrix, deferred scope, and enterprise assurance score.">
      <ScoreCard label="Enterprise assurance" value={`${s.score.overall}%`} tone="violet" />
      <Section title="Feature matrix">
        <SimpleTable rows={s.matrix as any} columns={[
          { key: "area", label: "Area" }, { key: "status", label: "Status" }, { key: "notes", label: "Notes" },
        ]} />
      </Section>
      <Section title="Deferred scope">
        <ul className="text-sm text-muted-foreground">{s.deferred.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
    </V19Page>
  );
}
export const Route = createFileRoute("/v19/scope")({ component: Page });
