import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, SimpleTable } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const c = H.useV155Controls();
  const rls = H.useV155Rls();
  return (
    <V155Page icon={<ShieldCheck className="size-6 text-fuchsia-300" />}
      title="Enterprise Intelligence Controls"
      blurb="Coverage matrix + RLS examples that gate every intelligence surface.">
      <Section title="Controls">
        <SimpleTable rows={c as any} columns={[
          { key: "control", label: "Control" }, { key: "coverage", label: "Coverage %" },
          { key: "last_tested", label: "Last tested" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="RLS policy examples (all V15.5 tables)">
        <SimpleTable rows={rls as any} columns={[
          { key: "table", label: "Table" }, { key: "policy", label: "Policy" }, { key: "sketch", label: "Sketch" },
        ]} />
      </Section>
    </V155Page>
  );
}
export const Route = createFileRoute("/v155/controls")({ component: Page });
