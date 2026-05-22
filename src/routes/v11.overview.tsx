import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v11/ui-bits";
import * as H from "@/v11/hooks";

function Page() {
  const e = H.useEnterpriseRevenueEngine();
  const t = H.useTrustLedEnterpriseSales();
  const mon = H.usePlatformMonetizationMaturity();
  const proc = H.useProcurementAcceleration();
  const partner = H.useGlobalPartnerCommercialization();
  const risks = H.useRevenueRiskGovernance();
  const renewal = H.useRenewalExpansionGovernance();
  return (
    <V11Page icon={<Gauge className="size-6 text-cyan-300" />} title="Anderoute V11 — Enterprise Revenue Maturity"
      blurb="Mock-only. Revenue engine, account expansion, monetization, pricing, deal desk, trust-led sales, procurement, proof, MP, API/EDI, partner, SE, RevOps, renewals, risk, board. No autonomous dispatch, no certification/IPO claims.">
      <ExecBanner h={H.useV11ExecHeadline()} />

      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Revenue engine"        value={e.summary.score} tone="emerald" />
        <ScoreCard label="Trust-led sales"       value={t.summary.score} tone="sky" />
        <ScoreCard label="Monetization maturity" value={mon.summary.score} tone="violet" />
        <ScoreCard label="Partner commercial"    value={partner.summary.score} tone="amber" />
      </div>

      <KpiGrid cols={4} items={[
        { label: "Enterprise opps",      value: e.health.enterprise_opps },
        { label: "Blocked deals",        value: e.health.blocked },
        { label: "Trust accelerated 30d",value: t.summary.accelerated_30d },
        { label: "Procurement median",   value: `${proc.summary.median_days}d` },
      ]} />

      <OverlayStrip items={H.useV11ExecutionOverlays()} title="V11 executive overlays" />

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Top enterprise opportunities</h3>
        <SimpleTable rows={e.opps as any} columns={[
          { key: "id", label: "ID" }, { key: "account", label: "Account" }, { key: "stage", label: "Stage" },
          { key: "arr_band", label: "ARR band" }, { key: "win_prob", label: "Win %" },
          { key: "next", label: "Next action" }, { key: "blocker", label: "Blocker", render: (r: any) => r.blocker ?? "—" },
        ]} />
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Blocked deal command panel</h3>
        <SimpleTable rows={e.blocked as any} columns={[
          { key: "deal", label: "Deal" }, { key: "blocker", label: "Blocker" }, { key: "owner", label: "Owner" },
          { key: "age_days", label: "Age (d)" },
          { key: "severity", label: "Severity", render: (r: any) => <StatusPill status={r.severity === "high" ? "blocked" : r.severity === "med" ? "at_risk" : "ready"} /> },
        ]} />
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Next-best commercial actions</h3>
        <SimpleTable rows={e.nba as any} columns={[
          { key: "role", label: "Role" }, { key: "action", label: "Action" }, { key: "impact", label: "Impact" },
        ]} />
      </Card>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Renewal & expansion pipeline</h3>
          <SimpleTable rows={renewal.pipeline as any} columns={[
            { key: "account", label: "Account" }, { key: "renewal_q", label: "Renewal" },
            { key: "readiness", label: "Readiness" },
            { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk === "high" ? "blocked" : r.risk === "med" ? "at_risk" : "ready"} /> },
            { key: "expansion", label: "Expansion" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Revenue risk heatmap (top 8)</h3>
          <SimpleTable rows={risks.risks.slice(0, 8) as any} columns={[
            { key: "risk", label: "Risk" }, { key: "likelihood", label: "Likelihood" },
            { key: "impact", label: "Impact" }, { key: "owner", label: "Owner" },
          ]} />
        </Card>
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Backend boundary — server fn vs server route</h3>
        <p className="mt-1 text-xs text-muted-foreground">V11 internal logic uses TanStack <code>createServerFn</code>. Partner/procurement callbacks live under <code>/api/public/*</code> with HMAC signatures.</p>
        <SimpleTable rows={H.useV11BackendBoundary() as any} columns={[
          { key: "kind", label: "Kind" }, { key: "name", label: "Name" }, { key: "caller", label: "Caller" }, { key: "auth", label: "Auth" },
        ]} />
      </Card>
    </V11Page>
  );
}

export const Route = createFileRoute("/v11/overview")({
  head: () => ({ meta: [{ title: "Anderoute V11 Overview · Phase 35" }] }),
  component: Page,
});
