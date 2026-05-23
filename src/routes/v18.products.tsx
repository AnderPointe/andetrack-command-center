import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const d = H.useProductLineAutomationControls();
  return (
    <V18Page icon={<Boxes className="size-6 text-violet-300" />} title="Product-Line Automation Controls Center"
      blurb="12 product lines across Dispatch, EliteNav, Driver Mobile, Portal, CoPilot, Carrier MP, API, EDI, Telematics, Partner MP, Reports, Enterprise Governance.">
      <ScoreCard label="Product control" value={d.score} tone="violet" />
      <Section title="Product lines">
        <SimpleTable rows={d.lines as any} columns={[
          { key: "line", label: "Line" }, { key: "adoption", label: "Adoption" }, { key: "support", label: "Support" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Control matrix">
        <SimpleTable rows={d.matrix as any} columns={[{ key: "control", label: "Control" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Exceptions">
        <SimpleTable rows={d.exceptions as any} columns={[{ key: "id", label: "ID" }, { key: "control", label: "Control" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" }]} />
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/products")({ component: Page });
