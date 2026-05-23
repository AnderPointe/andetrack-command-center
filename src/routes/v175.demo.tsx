import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const flow = H.useV175DemoPolish();
  return (
    <V175Page icon={<ListChecks className="size-6 text-emerald-300" />} title="V17.5 Demo Flow"
      blurb="13-step persona-based walkthrough of governed enterprise automation scale. Every high-impact action remains HITL-gated.">
      <Section title="Persona-based walkthrough">
        <SimpleTable rows={flow as any} columns={[
          { key: "who", label: "Persona" }, { key: "step", label: "Step" }, { key: "outcome", label: "Outcome" },
        ]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/demo")({ component: Page });
