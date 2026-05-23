import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V205Page } from "@/components/v205/V205Page";
import { Section } from "@/components/v205/ui-bits";
import * as H from "@/v205/hooks";

function Page() {
  const s = H.useV205Scope();
  return (
    <V205Page icon={<Layers className="size-6 text-teal-300" />} title="V20.5 Scope Board"
      blurb="What ships in V20.5 and what stays deferred — fully autonomous dispatch and IPO/SOC 2/Android Auto/CarPlay claims remain out of scope.">
      <Section title="Included (20 centers)"><ul className="text-sm text-muted-foreground">{s.included.map(x => <li key={x}>· {x}</li>)}</ul></Section>
      <Section title="Deferred"><ul className="text-sm text-muted-foreground">{s.deferred.map(x => <li key={x}>· {x}</li>)}</ul></Section>
    </V205Page>
  );
}
export const Route = createFileRoute("/v205/scope")({ component: Page });
