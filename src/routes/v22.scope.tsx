import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V22Page } from "@/components/v22/V22Page";
import { Section } from "@/components/v22/ui-bits";
import * as H from "@/v22/hooks";
function Page() {
  const s = H.useV22Scope();
  return (
    <V22Page icon={<Layers className="size-6 text-emerald-300" />} title="V22 Scope" blurb="In-scope V22 centers and deferred items (still HITL-protected).">
      <Section title="In scope"><ul className="grid gap-1 text-sm md:grid-cols-2">{s.in_scope.map((x) => <li key={x}>· {x}</li>)}</ul></Section>
      <Section title="Deferred"><ul className="grid gap-1 text-sm md:grid-cols-2 text-muted-foreground">{s.deferred.map((x) => <li key={x}>· {x}</li>)}</ul></Section>
    </V22Page>
  );
}
export const Route = createFileRoute("/v22/scope")({ component: Page });
