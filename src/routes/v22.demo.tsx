import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V22Page } from "@/components/v22/V22Page";
import { Section, SimpleTable } from "@/components/v22/ui-bits";
import * as H from "@/v22/hooks";
function Page() {
  const d = H.useV22Demo();
  return (
    <V22Page icon={<ListChecks className="size-6 text-emerald-300" />} title="V22 Demo Flow" blurb="Persona walkthrough of the enterprise trust lifecycle operating system. Every high-impact action HITL-gated.">
      <Section title="12-step walkthrough">
        <SimpleTable rows={d as any} columns={[
          { key: "id", label: "#" }, { key: "actor", label: "Persona" }, { key: "step", label: "Step" },
        ]} />
      </Section>
    </V22Page>
  );
}
export const Route = createFileRoute("/v22/demo")({ component: Page });
