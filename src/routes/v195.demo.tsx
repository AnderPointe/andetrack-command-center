import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V195Page } from "@/components/v195/V195Page";
import { Section, SimpleTable } from "@/components/v195/ui-bits";
import * as H from "@/v195/hooks";

function Page() {
  const d = H.useV195Demo();
  const dp = H.useV195DemoPolish();
  return (
    <V195Page icon={<ListChecks className="size-6 text-violet-300" />}
      title="V19.5 Demo Flow"
      blurb="Polished 12-step persona walkthrough plus base 9-step flow. All high-impact actions are HITL-gated.">
      <Section title="Polished walkthrough (12 steps)">
        <SimpleTable rows={dp as any} columns={[
          { key: "who", label: "Persona" }, { key: "step", label: "Step" }, { key: "outcome", label: "Outcome" },
        ]} />
      </Section>
      <Section title="Base walkthrough">
        <SimpleTable rows={d as any} columns={[
          { key: "who", label: "Persona" }, { key: "step", label: "Step" }, { key: "outcome", label: "Outcome" },
        ]} />
      </Section>
    </V195Page>
  );
}
export const Route = createFileRoute("/v195/demo")({ component: Page });
