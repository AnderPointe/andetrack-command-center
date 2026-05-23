import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, Section, SimpleTable, KpiGrid } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const r = H.useDurableRevenueSystems();
  return (
    <V145Page icon={<TrendingUp className="size-6 text-fuchsia-300" />} title="Durable Revenue Systems Center" blurb="System-level durability across renewal, expansion, marketplace, API, EDI, partner, payment, and disputes.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Durable revenue" value={r.score} tone="emerald" />
        <ScoreCard label="Evidence freshness" value={`${r.evidence_fresh_pct}%`} tone="violet" />
        <ScoreCard label="Concentration dims" value={r.concentration.length} tone="amber" />
      </div>
      <Section title="RevenueSystemHealthMatrix">
        <SimpleTable rows={r.systems as any} columns={[
          { key: "system", label: "System" }, { key: "durability", label: "Durability %" }, { key: "trend", label: "Trend" },
        ]} />
      </Section>
      <Section title="RevenueSystemRiskPanel — concentration">
        <KpiGrid cols={4} items={r.concentration.map(c => ({ label: c.dim, value: `${c.pct}%` }))} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/rev-systems")({ head: () => ({ meta: [{ title: "Durable Revenue · V14.5" }] }), component: Page });
