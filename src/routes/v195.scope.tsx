import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V195Page } from "@/components/v195/V195Page";
import { Section, SimpleTable } from "@/components/v195/ui-bits";
import * as H from "@/v195/hooks";

function Page() {
  const s = H.useV195Scope();
  return (
    <V195Page icon={<Layers className="size-6 text-violet-300" />}
      title="V19.5 Scope · Feature Matrix · Deferred"
      blurb="20 assurance-maturity centers. Autonomous dispatch, IPO/SOC 2/Android Auto claims explicitly deferred.">
      <Section title="V19.5 scope board">
        <SimpleTable rows={s.matrix as any} columns={[
          { key: "area", label: "Area" }, { key: "status", label: "Status" }, { key: "notes", label: "Notes" },
        ]} />
      </Section>
      <Section title="V19 → V19.5 feature matrix">
        <SimpleTable rows={s.feature_matrix as any} columns={[
          { key: "feature", label: "Feature" }, { key: "v19", label: "V19" }, { key: "v195", label: "V19.5" },
        ]} />
      </Section>
      <Section title="Deferred scope">
        <ul className="text-sm text-muted-foreground">{s.deferred.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
    </V195Page>
  );
}
export const Route = createFileRoute("/v195/scope")({ component: Page });
