import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { Section, SimpleTable } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const d = H.useV185Demo();
  const d2 = H.useV185DemoPolish();
  return (
    <V185Page icon={<ListChecks className="size-6 text-cyan-300" />} title="V18.5 Demo Flow"
      blurb="Persona walkthroughs of enterprise control assurance. Every high-impact action HITL-gated.">
      <Section title="Polish walkthrough (15-step)">
        <SimpleTable rows={d2 as any} columns={[{ key: "who", label: "Persona" }, { key: "step", label: "Step" }, { key: "outcome", label: "Outcome" }]} />
      </Section>
      <Section title="Base walkthrough (12-step)">
        <SimpleTable rows={d as any} columns={[{ key: "who", label: "Persona" }, { key: "step", label: "Step" }, { key: "outcome", label: "Outcome" }]} />
      </Section>
    </V185Page>
  );
}

export const Route = createFileRoute("/v185/demo")({ component: Page });
