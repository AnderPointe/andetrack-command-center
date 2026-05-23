import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V195Page } from "@/components/v195/V195Page";
import { Section, SimpleTable } from "@/components/v195/ui-bits";
import * as H from "@/v195/hooks";

function Page() {
  const d = H.useV195Demo();
  return (
    <V195Page icon={<ListChecks className="size-6 text-violet-300" />}
      title="V19.5 Demo Flow"
      blurb="9-step persona walkthrough: maturity → resilience → board → revenue → MP → exception → board report → roadmap. All high-impact HITL.">
      <Section title="Walkthrough">
        <SimpleTable rows={d as any} columns={[
          { key: "who", label: "Persona" }, { key: "step", label: "Step" }, { key: "outcome", label: "Outcome" },
        ]} />
      </Section>
    </V195Page>
  );
}
export const Route = createFileRoute("/v195/demo")({ component: Page });
