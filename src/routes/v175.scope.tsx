import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const s = H.useV175Scope();
  const fm = H.useV175FeatureMatrix();
  return (
    <V175Page icon={<Layers className="size-6 text-emerald-300" />} title="V17.5 Scope"
      blurb={s.posture}>
      <Section title="Included in V17.5">
        <ul className="grid gap-1 sm:grid-cols-2 text-sm text-muted-foreground">{s.included.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <Section title="Still deferred (must not be claimed as autonomous)">
        <ul className="grid gap-1 sm:grid-cols-2 text-sm text-muted-foreground">{s.deferred.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <Section title="Feature matrix">
        <SimpleTable rows={fm as any} columns={[{ key: "feature", label: "Feature" }, { key: "status", label: "Status" }]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/scope")({ component: Page });
