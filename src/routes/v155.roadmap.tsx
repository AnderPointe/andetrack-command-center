import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, SimpleTable } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const r = H.useV155Roadmap();
  const teaser = H.useV155Phase45Teaser();
  return (
    <V155Page icon={<Map className="size-6 text-fuchsia-300" />}
      title="Long-Term Enterprise Intelligence Roadmap"
      blurb="Q+1 → Q+4 milestones to lift calibration, explainability, and approval discipline.">
      <Section title="Roadmap">
        <SimpleTable rows={r as any} columns={[
          { key: "qtr", label: "Quarter" }, { key: "milestone", label: "Milestone" },
        ]} />
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V155Page>
  );
}
export const Route = createFileRoute("/v155/roadmap")({ component: Page });
