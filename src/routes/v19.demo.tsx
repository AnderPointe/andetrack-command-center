import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V19Page } from "@/components/v19/V19Page";
import { Section, SimpleTable } from "@/components/v19/ui-bits";
import * as H from "@/v19/hooks";

function Page() {
  const d = H.useV19Demo();
  return (
    <V19Page icon={<ListChecks className="size-6 text-violet-300" />}
      title="V19 Demo Flow"
      blurb="12-step persona walkthrough. Enterprise assurance OS → resilience → board → revenue → MP → exception → board report → roadmap. All high-impact HITL.">
      <Section title="Walkthrough">
        <SimpleTable rows={d as any} columns={[
          { key: "who", label: "Persona" }, { key: "step", label: "Step" }, { key: "outcome", label: "Outcome" },
        ]} />
      </Section>
    </V19Page>
  );
}
export const Route = createFileRoute("/v19/demo")({ component: Page });
