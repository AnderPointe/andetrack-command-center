import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { Section, SimpleTable, ScoreCard } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const s = H.useV145Scope();
  const fm = H.useV145FeatureMatrix();
  const o = H.useEnterpriseOperatingExcellence();
  return (
    <V145Page icon={<Layers className="size-6 text-fuchsia-300" />} title="V14.5 Scope" blurb="What V14.5 includes vs what is explicitly deferred.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Included surfaces" value={s.included.length} tone="violet" />
        <ScoreCard label="Deferred items"   value={s.deferred.length} tone="amber" />
        <ScoreCard label="Operating excellence" value={o.score} tone="emerald" />
      </div>
      <Section title="V145ScopeBoard — included">
        <ul className="grid list-disc gap-1 pl-5 text-sm md:grid-cols-2">{s.included.map(x => <li key={x}>{x}</li>)}</ul>
      </Section>
      <Section title="V145DeferredScopePanel">
        <ul className="grid list-disc gap-1 pl-5 text-sm md:grid-cols-2 text-muted-foreground">{s.deferred.map(x => <li key={x}>{x}</li>)}</ul>
      </Section>
      <Section title="V145FeatureMatrix — V14 → V14.5">
        <SimpleTable rows={fm as any} columns={[
          { key: "area", label: "Area" }, { key: "v14", label: "V14" },
          { key: "v145", label: "V14.5" }, { key: "status", label: "Status" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/scope")({ head: () => ({ meta: [{ title: "V14.5 Scope · Phase 42" }] }), component: Page });
