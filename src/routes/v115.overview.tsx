import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

const TITLE = "Anderoute V11.5 — Enterprise Revenue Optimization";
const BLURB = "Mock-only. Lever-based optimization, retention risk, partner monetization, pricing & packaging optimization, capital-ready revenue governance. No autonomous deal closure.";

function Page() {
  const opt = H.useRevenueOptimization();
  const operating = H.useCommercialOperatingMaturity();
  const expansion = H.useStrategicCustomerExpansion();
  const cap = H.useCapitalReadyRevenueGov();
  const ret = H.useRetentionRisk();
  const par = H.usePartnerMonetization();
  const pricing = H.usePricingOptimization();
  const headline = H.useV115ExecHeadline();
  const overlays = H.useV115ExecutionOverlays();
  const boundary = H.useV115BackendBoundary();
  const rls = H.useV115RlsExamples();
  const reports = H.useReportsV115();
  return (
    <V115Page icon={<Gauge className="size-6 text-emerald-300" />} title={TITLE} blurb={BLURB}>
      <ExecBanner h={headline} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Optimization score" value={opt.summary.score} tone="emerald" />
        <ScoreCard label="Capital readiness"  value={Math.round(cap.axes.reduce((s,a)=>s+a.score,0)/cap.axes.length)} tone="sky" />
        <ScoreCard label="Partner ARR share"  value={par.summary.partner_arr_share_pct} tone="violet" />
        <ScoreCard label="Levers active"      value={`${opt.summary.levers_optimized}/${opt.summary.levers_total}`} tone="amber" />
      </div>
      <KpiGrid cols={4} items={[
        { label: "Net rev uplift",        value: `${opt.summary.net_revenue_uplift_pct}%` },
        { label: "Revenue quality",       value: `${opt.summary.revenue_quality_score}%` },
        { label: "Expansion whitespace",  value: `$${(expansion.program.whitespace_arr_usd / 1_000_000).toFixed(1)}M` },
        { label: "Governed deals",        value: `${pricing.summary.governed_deals_pct}%` },
        { label: "High-risk accounts",    value: ret.summary.high },
        { label: "Paying MP partners",    value: par.summary.paying_marketplace_partners },
        { label: "Partner sourced",       value: `${par.summary.partner_sourced_pct}%` },
      ]} />
      <OverlayStrip items={overlays} title="V11.5 executive overlays" />

      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Operating maturity" value={operating.summary.score} tone="emerald" />
        <ScoreCard label="Expansion readiness" value={opt.summary.expansion_readiness_pct} tone="sky" />
        <ScoreCard label="Partner monetization" value={opt.summary.partner_monetization_index} tone="violet" />
        <ScoreCard label="Save coverage" value={ret.summary.save_coverage_pct} tone="amber" />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Optimization score trend</h3>
        <p className="mt-1 text-xs text-muted-foreground">Quarterly actual vs target. Mock-only.</p>
        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
          {H.useV115OptTrend().map((q) => (
            <div key={q.quarter} className="rounded border border-white/5 bg-black/20 px-3 py-2">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{q.quarter}</div>
              <div className="mt-1 text-lg font-semibold">{q.actual}<span className="text-xs text-muted-foreground"> / {q.target}</span></div>
              <div className={`text-[11px] ${q.actual >= q.target ? "text-emerald-300" : "text-amber-300"}`}>{q.actual >= q.target ? "on track" : "below target"}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Outcome KPIs vs target</h3>
        <SimpleTable rows={H.useV115OutcomeKpis() as any} columns={[
          { key: "metric", label: "Metric" },
          { key: "target", label: "Target" },
          { key: "actual", label: "Actual" },
          { key: "tone",   label: "Status", render: (r: any) => <StatusPill status={r.tone === "good" ? "ready" : r.tone === "warn" ? "at_risk" : "blocked"} /> },
        ]} />
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Revenue risk heatmap</h3>
        <SimpleTable rows={H.useV115RevenueRiskHeatmap() as any} columns={[
          { key: "risk", label: "Risk" },
          { key: "likelihood", label: "Likelihood" },
          { key: "impact", label: "Impact" },
          { key: "owner", label: "Owner" },
          { key: "mitigation", label: "Mitigation" },
        ]} />
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Executive revenue cadence</h3>
        <SimpleTable rows={H.useV115ExecCadenceSpec() as any} columns={[
          { key: "cadence", label: "Cadence" },
          { key: "attendees", label: "Attendees" },
          { key: "inputs", label: "Inputs" },
        ]} />
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">RLS policy examples</h3>
        <p className="mt-1 text-xs text-muted-foreground">Commercial governance stays company-scoped; admin and platform-owner access is explicit, not implied.</p>
        <SimpleTable rows={rls as any} columns={[
          { key: "table", label: "Table" },
          { key: "policy", label: "Policy" },
          { key: "expression", label: "Policy expression" },
        ]} />
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Backend boundary — server fn vs server route</h3>
        <p className="mt-1 text-xs text-muted-foreground">V11.5 internal optimization runs in TanStack <code>createServerFn</code>. Partner/marketplace callbacks live under <code>/api/public/*</code> with HMAC.</p>
        <SimpleTable rows={boundary as any} columns={[{ key: "kind", label: "Kind" }, { key: "name", label: "Name" }, { key: "caller", label: "Caller" }, { key: "auth", label: "Auth" }]} />
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Commercial reporting distribution</h3>
        <SimpleTable rows={reports.distribution as any} columns={[
          { key: "report", label: "Report" },
          { key: "audience", label: "Audience" },
          { key: "cadence", label: "Cadence" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/overview")({
  head: () => ({ meta: [{ title: "Anderoute V11.5 Overview · Phase 36" }] }),
  component: Page,
});
