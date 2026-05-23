import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const d = H.useV18DemoPolish();
  return (
    <V18Page icon={<ListChecks className="size-6 text-violet-300" />} title="V18 Demo Flow"
      blurb="15-step persona walkthrough of V18 autonomous-assist scale governance. Every high-impact action HITL-gated.">
      <Section title="Walkthrough">
        <SimpleTable rows={d as any} columns={[{ key: "who", label: "Persona" }, { key: "step", label: "Step" }, { key: "outcome", label: "Outcome" }]} />
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/demo")({ component: Page });
