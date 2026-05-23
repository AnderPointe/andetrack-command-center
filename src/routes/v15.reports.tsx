import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Section, SimpleTable } from "@/components/v15/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v15/hooks";

function Page() {
  const r = H.useReportsV15();
  const e = H.useV15EdgeVsServerFn();
  const rls = H.useV15Rls();
  const sql = H.useV15RlsSql();
  return (
    <V15Page icon={<ShieldCheck className="size-6 text-cyan-300" />} title="V15 Reports & Governance" blurb="V15 reports dashboard, ServerFn vs Edge boundary, RLS policy examples + SQL snippets.">
      <Section title="Available V15 reports">
        <div className="grid gap-2 md:grid-cols-2">
          {r.reports.map((x) => <Card key={x} className="border-white/10 bg-white/[0.02] p-2 text-xs">{x}</Card>)}
        </div>
      </Section>
      <Section title="ServerFn vs Edge Function boundary">
        <SimpleTable rows={e as any} columns={[
          { key: "boundary", label: "Boundary" }, { key: "name", label: "Surface" },
          { key: "caller", label: "Caller" }, { key: "auth", label: "Auth" }, { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <Section title="RLS examples">
        <ul className="list-disc space-y-1 pl-5 text-xs">{rls.map((x) => <li key={x}>{x}</li>)}</ul>
      </Section>
      <Section title="RLS SQL snippets (representative)">
        <SimpleTable rows={sql as any} columns={[
          { key: "table", label: "Table" },
          { key: "sql", label: "Policy", render: (r: any) => <pre className="whitespace-pre-wrap text-[10px]">{r.sql}</pre> },
        ]} />
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/reports")({
  head: () => ({ meta: [{ title: "V15 Reports & Governance" }] }),
  component: Page,
});
