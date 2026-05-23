import { createFileRoute } from "@tanstack/react-router";
import { Stamp } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const d = H.useCommercialDiligenceGovernance();
  return (
    <V15Page icon={<Stamp className="size-6 text-cyan-300" />} title="Commercial Diligence Governance Center" blurb="13 diligence domains with owner, freshness, status, exceptions, action plan, export placeholder.">
      <ScoreCard label="Commercial diligence governance" value={d.score} tone="violet" />
      <Section title="Diligence governance matrix">
        <SimpleTable rows={d.domains as any} columns={[
          { key: "domain", label: "Domain" }, { key: "owner", label: "Owner" },
          { key: "fresh", label: "Freshness", render: (r: any) => <StatusPill status={r.fresh} /> },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
      <Section title="Exceptions">
        <SimpleTable rows={d.exceptions as any} columns={[
          { key: "exception", label: "Exception" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
      <Section title="Action plan">
        <ol className="list-decimal space-y-1 pl-5 text-xs">{d.actions.map((a) => <li key={a}>{a}</li>)}</ol>
      </Section>
      <Section title="Diligence export (placeholder)">
        <div className="text-xs text-muted-foreground">Mock placeholder. Actual exports require approved evidence + executive sign-off.</div>
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/diligence")({
  head: () => ({ meta: [{ title: "Diligence Governance · V15" }] }),
  component: Page,
});
