import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { Section } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const reports = H.useReportsV165();
  const fns = H.useV165EdgeFunctions();
  return (
    <V165Page icon={<FileText className="size-6 text-emerald-300" />} title="V16.5 Reports Dashboard"
      blurb="20 advanced reports covering predictive governance, board operating, revenue/MP automation, approval orchestration, evidence + risk routing, policy tuning, and per-domain control automation.">
      <Section title="Reports">
        <ul className="grid gap-1 text-sm md:grid-cols-2">{reports.map(r => <li key={r}>· {r}</li>)}</ul>
      </Section>
      <Section title="Edge function plan (32 functions)">
        <ul className="grid gap-1 text-xs text-muted-foreground md:grid-cols-2">{fns.map(f => <li key={f}><code>{f}</code></li>)}</ul>
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/reports")({ component: Page });
