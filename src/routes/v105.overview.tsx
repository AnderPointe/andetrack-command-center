import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

const TITLE = "Anderoute V10.5 — Enterprise Commercialization Scale";
const BLURB = "Mock-only. Commercial scale, trust monetization, sales OS, deal desk, expansion, procurement, proof, capital readiness, board growth, expansion discipline. No autonomous dispatch, no certification or IPO/M&A claims.";

function Page() {
  const c = H.useEnterpriseCommercialization();
  const t = H.useTrustMonetization();
  const cap = H.useStrategicCapitalReadiness();
  const exp = H.useRevenueExpansionMaturity();
  const headline = H.useV105ExecHeadline();
  const overlays = H.useV105ExecutionOverlays();
  const boundary = H.useV105BackendBoundary();
  return (
    <V105Page icon={<Gauge className="size-6 text-fuchsia-300" />} title={TITLE} blurb={BLURB}>
      <ExecBanner h={headline} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Commercial scale"   value={c.summary.score} tone="emerald" />
        <ScoreCard label="Trust monetization" value={t.summary.score} tone="sky" />
        <ScoreCard label="Capital readiness"  value={cap.summary.readiness} tone="amber" />
        <ScoreCard label="Expansion maturity" value={exp.summary.score} tone="violet" />
      </div>
      <KpiGrid cols={4} items={[
        { label: "Active opps",        value: c.pipeline.length },
        { label: "Deals unblocked 30d",value: t.summary.deals_unblocked },
        { label: "Expansion pipeline", value: exp.summary.pipeline_count },
        { label: "Open procurement",   value: H.useProcurementAcceleration().summary.open },
      ]} />
      <OverlayStrip items={overlays} title="V10.5 executive overlays" />

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Commercial scale trend</h3>
        <p className="mt-1 text-xs text-muted-foreground">Quarterly actual vs target. Mock-only.</p>
        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
          {H.useV105CommercialTrend().map((q) => (
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
        <SimpleTable rows={H.useV105OutcomeKpis() as any} columns={[
          { key: "metric", label: "Metric" },
          { key: "target", label: "Target" },
          { key: "actual", label: "Actual" },
          { key: "tone",   label: "Status", render: (r: any) => <StatusPill status={r.tone === "good" ? "ready" : r.tone === "warn" ? "at_risk" : "blocked"} /> },
        ]} />
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Commercial risk heatmap</h3>
        <SimpleTable rows={H.useV105CommercialRiskHeatmap() as any} columns={[
          { key: "risk", label: "Risk" },
          { key: "likelihood", label: "Likelihood" },
          { key: "impact", label: "Impact" },
          { key: "owner", label: "Owner" },
          { key: "mitigation", label: "Mitigation" },
        ]} />
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Executive revenue cadence</h3>
        <SimpleTable rows={H.useV105ExecCadenceSpec() as any} columns={[
          { key: "cadence", label: "Cadence" },
          { key: "attendees", label: "Attendees" },
          { key: "inputs", label: "Inputs" },
        ]} />
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Backend boundary — server fn vs server route</h3>
        <p className="mt-1 text-xs text-muted-foreground">V10.5 internal logic uses TanStack <code>createServerFn</code>. External proof-approval callbacks live under <code>/api/public/*</code>.</p>
        <SimpleTable rows={boundary as any} columns={[{ key: "kind", label: "Kind" }, { key: "name", label: "Name" }, { key: "caller", label: "Caller" }, { key: "auth", label: "Auth" }]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/overview")({
  head: () => ({ meta: [{ title: "Anderoute V10.5 Overview · Phase 34" }] }),
  component: Page,
});
