import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V215Page } from "@/components/v215/V215Page";
import { Section, SimpleTable } from "@/components/v215/ui-bits";
import * as H from "@/v215/hooks";

function Page() {
  const d = H.useV215Demo();
  return (
    <V215Page icon={<ListChecks className="size-6 text-emerald-300" />} title="V21.5 Demo Flow"
      blurb="Persona walkthrough of enterprise trust network scale. Every high-impact action HITL-gated.">
      <Section title="12-step walkthrough">
        <SimpleTable rows={d as any} columns={[
          { key: "id", label: "#" }, { key: "actor", label: "Persona" }, { key: "step", label: "Step" },
        ]} />
      </Section>
    </V215Page>
  );
}
export const Route = createFileRoute("/v215/demo")({ component: Page });
