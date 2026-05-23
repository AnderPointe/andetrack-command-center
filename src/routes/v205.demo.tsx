import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V205Page } from "@/components/v205/V205Page";
import { Section, SimpleTable } from "@/components/v205/ui-bits";
import * as H from "@/v205/hooks";

function Page() {
  const d = H.useV205Demo();
  return (
    <V205Page icon={<ListChecks className="size-6 text-teal-300" />} title="V20.5 Demo Flow"
      blurb="12-step persona-driven walkthrough: CEO → Board → RevOps → MP → CS → Partner → CISO → CEO → Board.">
      <Section title="Demo steps">
        <SimpleTable rows={d as any} columns={[
          { key: "id", label: "Step" }, { key: "actor", label: "Actor" }, { key: "step", label: "Action" },
        ]} />
      </Section>
    </V205Page>
  );
}
export const Route = createFileRoute("/v205/demo")({ component: Page });
