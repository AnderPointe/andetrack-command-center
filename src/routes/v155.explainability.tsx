import { createFileRoute } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, SimpleTable } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const ex = H.useV155Explainability();
  return (
    <V155Page icon={<FileSearch className="size-6 text-fuchsia-300" />}
      title="Recommendation Explainability"
      blurb="Per-recommendation input contributions. Risk audits inputs for protected-attribute leakage before approval.">
      <Section title="Input weights — REV-2101 example">
        <SimpleTable rows={ex as any} columns={[
          { key: "rec_id", label: "Rec" },
          { key: "input", label: "Input" },
          { key: "weight", label: "Weight" },
          { key: "value", label: "Value" },
          { key: "contribution", label: "Contribution" },
        ]} />
      </Section>
    </V155Page>
  );
}
export const Route = createFileRoute("/v155/explainability")({ component: Page });
