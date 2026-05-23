import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, KpiGrid, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const m = H.useMarketplaceScaleGovernance();
  return (
    <V15Page icon={<Megaphone className="size-6 text-cyan-300" />} title="Marketplace Scale Governance Center" blurb="Scale governance score, KPI grid, regional matrix, lane liquidity placeholder, exceptions, action plan.">
      <ScoreCard label="MP scale governance" value={m.score} tone="rose" />
      <KpiGrid cols={4} items={[
        { label: "Fee capture",       value: `${m.kpis.fee_capture_pct}%` },
        { label: "Load coverage",     value: `${m.kpis.load_coverage_pct}%` },
        { label: "Avg bids/load",     value: m.kpis.avg_bids_per_load },
        { label: "Time-to-first-bid", value: `${m.kpis.time_to_first_bid_min}m` },
        { label: "Time-to-award",     value: `${m.kpis.time_to_award_min}m` },
        { label: "Carrier quality",   value: m.kpis.carrier_quality },
        { label: "Carrier compliance", value: `${m.kpis.carrier_compliance}%` },
        { label: "Unit econ",         value: m.kpis.unit_econ_confidence },
      ]} />
      <Section title="Regional governance">
        <SimpleTable rows={m.regions as any} columns={[
          { key: "region", label: "Region" }, { key: "economics", label: "Economics" }, { key: "density", label: "Density" },
          { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
        ]} />
      </Section>
      <Section title="Lane liquidity (placeholder)">
        <div className="text-xs text-muted-foreground">Lane-level liquidity placeholder — V15.5 will introduce lane intelligence overlay.</div>
      </Section>
      <Section title="Scale governance exceptions">
        <SimpleTable rows={m.exceptions as any} columns={[
          { key: "exception", label: "Exception" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
      <Section title="Action plan">
        <ol className="list-decimal space-y-1 pl-5 text-xs">{m.action_plan.map((a) => <li key={a}>{a}</li>)}</ol>
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/mp-gov")({
  head: () => ({ meta: [{ title: "MP Scale Governance · V15" }] }),
  component: Page,
});
