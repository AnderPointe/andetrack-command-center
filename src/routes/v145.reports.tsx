import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { Section, SimpleTable, ScoreCard } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const r = H.useReportsV145();
  const rls = H.useV145Rls();
  const edge = H.useV145EdgeVsServerFn();
  return (
    <V145Page icon={<ShieldCheck className="size-6 text-fuchsia-300" />} title="V14.5 Advanced Reporting" blurb="Mock list of V14.5 reports plus the RLS examples and Edge/ServerFn separation governing them.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Reports" value={r.length} tone="violet" />
        <ScoreCard label="RLS examples" value={rls.length} tone="emerald" />
        <ScoreCard label="Edge vs ServerFn rows" value={edge.length} tone="amber" />
      </div>
      <Section title="ReportsV145Dashboard">
        <ul className="grid list-disc gap-1 pl-5 text-sm md:grid-cols-2">{r.map(x => <li key={x}>{x}</li>)}</ul>
      </Section>
      <Section title="RLS examples">
        <SimpleTable rows={rls as any} columns={[
          { key: "table", label: "Table" }, { key: "policy", label: "Policy summary" },
        ]} />
      </Section>
      <Section title="Edge Function vs ServerFn separation">
        <SimpleTable rows={edge as any} columns={[
          { key: "kind", label: "Kind" }, { key: "surface", label: "Surface" },
          { key: "example", label: "Example" }, { key: "why", label: "Why" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/reports")({ head: () => ({ meta: [{ title: "Reports · V14.5" }] }), component: Page });
