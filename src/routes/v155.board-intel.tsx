import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, ExecHeadline, SimpleTable } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const a = H.useV155IntelAreas().filter(x => x.area === "Board intel");
  const rls = H.useV155Rls().filter(r => r.table === "v155_audit_log" || r.table === "v155_approvals");
  return (
    <V155Page icon={<FileBarChart className="size-6 text-fuchsia-300" />}
      title="Board-Level Intelligence Reporting"
      blurb="Board pack auto-drafts from approved recs only. Includes outcome calibration section.">
      <Section title="Headline">
        {a.map(x => <ExecHeadline key={x.area} tag={x.area} headline={x.headline} bullets={x.bullets} />)}
      </Section>
      <Section title="RLS snippets — board-visible tables">
        <SimpleTable rows={rls as any} columns={[
          { key: "table", label: "Table" }, { key: "policy", label: "Policy" }, { key: "sketch", label: "Sketch" },
        ]} />
      </Section>
    </V155Page>
  );
}
export const Route = createFileRoute("/v155/board-intel")({ component: Page });
