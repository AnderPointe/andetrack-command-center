import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const cmd = H.useEnterpriseCommercialCommand();
  const rq = H.useRevenueQualityGovernance();
  const ge = H.useGlobalAccountExpansion();
  const ret = H.useExpansionRetention();
  const mp = H.useMarketplaceRevenueGovernance();
  const partner = H.usePartnerChannelMaturity();
  const board = H.useBoardReadyRevenueReporting();
  const forecast = H.useCommercialForecastGovernance();
  const capital = H.useCapitalGradeCommercialReporting();
  const opmodel = H.useCommercialOperatingModel();
  const cadence = H.useGlobalCommercialCadence();
  const teaser = H.useV12Phase38Teaser();
  const boundary = H.useV12BackendBoundary();
  const rls = H.useV12RlsExamples();
  return (
    <V12Page icon={<Gauge className="size-6 text-cyan-300" />} title="Anderoute V12 — Enterprise Commercial Command" blurb="Mock-only. Commercial OS for enterprise logistics SaaS — revenue quality, global expansion, deal execution, trust-led procurement, capital-grade reporting. No autonomous closure or audit-completeness claims.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Commercial command" value={cmd.score.score} tone="emerald" />
        <ScoreCard label="Revenue quality"    value={rq.score}        tone="sky" />
        <ScoreCard label="Partner maturity"   value={partner.score}   tone="violet" />
        <ScoreCard label="MP revenue gov."    value={mp.score}        tone="amber" />
      </div>
      <KpiGrid cols={4} items={[
        { label: "Enterprise pipeline",  value: `$${(cmd.score.enterprise_pipeline_usd/1_000_000).toFixed(1)}M` },
        { label: "Expansion pipeline",   value: `$${(cmd.score.expansion_pipeline_usd/1_000_000).toFixed(1)}M` },
        { label: "Partner sourced",      value: `$${(cmd.score.partner_sourced_usd/1_000_000).toFixed(1)}M` },
        { label: "Trust-influenced",     value: `$${(cmd.score.trust_influenced_usd/1_000_000).toFixed(1)}M` },
        { label: "Velocity",             value: `${cmd.score.velocity_days}d` },
        { label: "Slippage",             value: `${cmd.score.slippage_pct}%` },
        { label: "Procurement blocked",  value: String(cmd.score.blocked_procurement) },
        { label: "At-risk renewals",     value: String(ret.churn_risk) },
      ]} />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Board-ready revenue — section status</h3>
        <SimpleTable rows={board.sections as any} columns={[
          { key: "section", label: "Section" },
          { key: "status",  label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "note",    label: "Note" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Global expansion snapshot</h3>
        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-5">
          <div className="rounded border border-white/5 bg-black/20 p-2"><div className="text-[11px] uppercase text-muted-foreground">Global</div><div className="text-lg font-semibold">{ge.total_global}</div></div>
          <div className="rounded border border-white/5 bg-black/20 p-2"><div className="text-[11px] uppercase text-muted-foreground">Multi-region</div><div className="text-lg font-semibold">{ge.multi_region}</div></div>
          <div className="rounded border border-white/5 bg-black/20 p-2"><div className="text-[11px] uppercase text-muted-foreground">Expansion ready</div><div className="text-lg font-semibold">{ge.expansion_ready}</div></div>
          <div className="rounded border border-white/5 bg-black/20 p-2"><div className="text-[11px] uppercase text-muted-foreground">At risk</div><div className="text-lg font-semibold">{ge.at_risk}</div></div>
          <div className="rounded border border-white/5 bg-black/20 p-2"><div className="text-[11px] uppercase text-muted-foreground">Regulated</div><div className="text-lg font-semibold">{ge.regulated}</div></div>
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Backend boundary (V12)</h3>
        <SimpleTable rows={boundary as any} columns={[
          { key: "kind", label: "Kind" }, { key: "name", label: "Name" }, { key: "caller", label: "Caller" }, { key: "auth", label: "Auth" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">RLS examples (V12)</h3>
        <SimpleTable rows={rls as any} columns={[
          { key: "table", label: "Table" }, { key: "policy", label: "Policy" }, { key: "expression", label: "Expression" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/overview")({
  head: () => ({ meta: [{ title: "Anderoute V12 Overview · Phase 37" }] }),
  component: Page,
});
