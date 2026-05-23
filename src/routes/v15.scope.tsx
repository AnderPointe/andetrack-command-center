import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Section, SimpleTable, StatusPill, ScoreCard } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const s = H.useV15Scope();
  const f = H.useV15FeatureMatrix();
  const c = H.useEnterprisePerformanceCommand();
  return (
    <V15Page icon={<Layers className="size-6 text-cyan-300" />} title="V15 Scope & Feature Matrix" blurb="Phase 43 scope board, V14.5→V15 feature matrix, deferred scope panel.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Enterprise performance" value={c.score} tone="violet" />
        <ScoreCard label="V15 areas included" value={s.included.length} tone="emerald" />
        <ScoreCard label="V15 deferred" value={s.deferred.length} tone="rose" />
      </div>
      <Section title="Included">
        <ul className="grid list-disc gap-1 pl-5 text-xs md:grid-cols-2">{s.included.map((x) => <li key={x}>{x}</li>)}</ul>
      </Section>
      <Section title="Deferred (do NOT build)">
        <ul className="grid list-disc gap-1 pl-5 text-xs md:grid-cols-2">{s.deferred.map((x) => <li key={x}>{x}</li>)}</ul>
      </Section>
      <Section title="V14.5 → V15 feature matrix">
        <SimpleTable rows={f as any} columns={[
          { key: "area", label: "Area" }, { key: "v145", label: "V14.5" }, { key: "v15", label: "V15" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/scope")({
  head: () => ({ meta: [{ title: "V15 Scope · Phase 43" }] }),
  component: Page,
});
