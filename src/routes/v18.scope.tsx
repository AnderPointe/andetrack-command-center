import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const s = H.useV18Scope();
  return (
    <V18Page icon={<Layers className="size-6 text-violet-300" />} title="V18 Scope Board"
      blurb="What Phase 49 ships, what stays placeholder, what remains explicitly deferred.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Assist scale governance" value={s.score.overall} tone="violet" />
        <ScoreCard label="Shipped areas"     value={s.matrix.filter(m => m.status === "shipped").length} tone="emerald" />
        <ScoreCard label="Placeholder areas" value={s.matrix.filter(m => m.status === "placeholder").length} tone="amber" />
      </div>
      <Section title="V18 feature matrix">
        <SimpleTable rows={s.matrix as any} columns={[
          { key: "area",   label: "Area" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "notes",  label: "Notes" },
        ]} />
      </Section>
      <Section title="Still deferred">
        <ul className="text-sm text-muted-foreground">{s.deferred.map(d => <li key={d}>· {d}</li>)}</ul>
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/scope")({ component: Page });
