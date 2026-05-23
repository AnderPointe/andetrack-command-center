import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { Section, SimpleTable, StatusPill } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const s = H.useV165Scope();
  const m = H.useV165FeatureMatrix();
  return (
    <V165Page icon={<Layers className="size-6 text-emerald-300" />} title="V16.5 Scope Board"
      blurb={s.posture}>
      <Section title="Included">
        <ul className="grid gap-1 text-sm md:grid-cols-2">{s.included.map(i => <li key={i}>· {i}</li>)}</ul>
      </Section>
      <Section title="Deferred (NOT in V16.5)">
        <ul className="grid gap-1 text-sm text-muted-foreground md:grid-cols-2">{s.deferred.map(i => <li key={i}>· {i}</li>)}</ul>
      </Section>
      <Section title="Feature matrix">
        <SimpleTable rows={m as any} columns={[
          { key: "feature", label: "Feature" },
          { key: "status", label: "Status", render: (x: any) => <StatusPill status={x.status === "live" ? "healthy" : "blocked"} /> },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/scope")({ component: Page });
