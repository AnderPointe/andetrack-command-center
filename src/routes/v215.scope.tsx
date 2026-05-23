import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V215Page } from "@/components/v215/V215Page";
import { Section } from "@/components/v215/ui-bits";
import * as H from "@/v215/hooks";

function Page() {
  const s = H.useV215Scope();
  return (
    <V215Page icon={<Layers className="size-6 text-emerald-300" />} title="V21.5 Scope"
      blurb="In-scope V21.5 trust network scale centers and deferred items (still HITL-protected).">
      <Section title="In scope">
        <ul className="grid gap-1 text-sm md:grid-cols-2">{s.in_scope.map((x) => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <Section title="Deferred">
        <ul className="grid gap-1 text-sm md:grid-cols-2 text-muted-foreground">{s.deferred.map((x) => <li key={x}>· {x}</li>)}</ul>
      </Section>
    </V215Page>
  );
}
export const Route = createFileRoute("/v215/scope")({ component: Page });
