import { createFileRoute } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";
import { V19Page } from "@/components/v19/V19Page";
import { Section, SimpleTable } from "@/components/v19/ui-bits";
import * as H from "@/v19/hooks";

function Page() {
  const ef = H.useV19EdgeFunctions();
  const rls = H.useV19Rls();
  return (
    <V19Page icon={<Settings2 className="size-6 text-violet-300" />}
      title="V19 Settings · Edge Functions & RLS"
      blurb="Edge Function plan and RLS policy examples for V19 enterprise assurance OS.">
      <Section title="Edge Function plan">
        <SimpleTable rows={ef as any} columns={[
          { key: "name", label: "Function" }, { key: "layer", label: "Layer" }, { key: "auth", label: "Auth" },
        ]} />
      </Section>
      <Section title="RLS policy examples">
        <SimpleTable rows={rls as any} columns={[
          { key: "name", label: "Policy" }, { key: "target", label: "Target" }, { key: "sql", label: "SQL sketch" },
        ]} />
      </Section>
    </V19Page>
  );
}
export const Route = createFileRoute("/v19/settings")({ component: Page });
