import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, KpiGrid, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const r = H.useDurableRevenuePerformance();
  return (
    <V15Page icon={<TrendingUp className="size-6 text-cyan-300" />} title="Durable Revenue Performance Center" blurb="Revenue durability matrix, renewal/expansion performance, concentration, evidence freshness, action plan.">
      <ScoreCard label="Durable revenue" value={r.score} tone="emerald" />
      <KpiGrid cols={3} items={[
        { label: "DSO (days)",      value: r.payment_health.dso_days },
        { label: "Dispute rate %",  value: r.payment_health.dispute_rate_pct },
        { label: "Hold rate %",     value: r.payment_health.hold_rate_pct },
      ]} />
      <Section title="Durability matrix">
        <SimpleTable rows={r.matrix as any} columns={[
          { key: "stream", label: "Stream" }, { key: "durability", label: "Durability" }, { key: "trend", label: "Trend" },
          { key: "concentration", label: "Concentration", render: (x: any) => <StatusPill status={x.concentration} /> },
          { key: "evidence", label: "Evidence", render: (x: any) => <StatusPill status={x.evidence} /> },
        ]} />
      </Section>
      <Section title="Concentration">
        <SimpleTable rows={r.concentration as any} columns={[
          { key: "axis", label: "Axis" }, { key: "top1_pct", label: "Top1 %" }, { key: "top5_pct", label: "Top5 %" },
          { key: "status", label: "Status", render: (x: any) => <StatusPill status={x.status} /> },
        ]} />
      </Section>
      <Section title="Revenue evidence">
        <SimpleTable rows={r.evidence as any} columns={[
          { key: "item", label: "Item" }, { key: "owner", label: "Owner" },
          { key: "fresh", label: "Freshness", render: (x: any) => <StatusPill status={x.fresh} /> },
        ]} />
      </Section>
      <Section title="Durable revenue action plan">
        <ol className="list-decimal space-y-1 pl-5 text-xs">{r.actions.map((a) => <li key={a}>{a}</li>)}</ol>
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/revenue")({
  head: () => ({ meta: [{ title: "Durable Revenue · V15" }] }),
  component: Page,
});
