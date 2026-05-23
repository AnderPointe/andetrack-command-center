import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const cap = H.useEnterpriseCapitalReadiness();
  const ri = H.useRevenueIntelligenceMaturity();
  const dil = H.useCommercialDiligence();
  const dr = H.useCapitalDataRoom();
  const mp = H.useMarketplaceEconomicsGovernance();
  const exec = H.useExecutiveValueCreation();
  const teaser = H.useV13Phase40Teaser();
  const boundary = H.useV13BackendBoundary();
  const rls = H.useV13RlsExamples();
  const headline = H.useV13ExecHeadline();
  const edge = H.useV13EdgeVsServerFn();
  const dilReady = dil.filter((d) => d.status === "ready").length;
  return (
    <V13Page icon={<Gauge className="size-6 text-indigo-300" />} title="Anderoute V13 — Enterprise Capital Readiness" blurb="Mock-only. Capital-grade enterprise OS — revenue intelligence, commercial diligence, capital data room, marketplace economics, partner value, executive value creation, board capital governance. No autonomous dispatch, no IPO/acquisition/audit completeness claims.">
      <Card className="border-indigo-400/20 bg-indigo-400/5 p-4">
        <div className="text-xs uppercase tracking-wide text-indigo-200/80">V13 exec headline</div>
        <p className="mt-1 text-sm">{headline.headline}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-foreground/80">
          {headline.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
      </Card>
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Capital readiness"   value={cap.score}  tone="emerald" />
        <ScoreCard label="Revenue intel"       value={ri.score}   tone="sky" />
        <ScoreCard label="Diligence (ready)"   value={Math.round((dilReady/dil.length)*100)} tone="violet" />
        <ScoreCard label="Exec value creation" value={exec.score} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Capital readiness KPIs</h3>
        <SimpleTable rows={cap.kpis as any} columns={[
          { key: "kpi", label: "KPI" }, { key: "pct", label: "%" },
        ]} />
      </Card>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Capital gaps</h3>
          <SimpleTable rows={cap.gaps as any} columns={[
            { key: "gap", label: "Gap" }, { key: "owner", label: "Owner" }, { key: "severity", label: "Severity" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Marketplace economics ({mp.score}%)</h3>
          <SimpleTable rows={mp.metrics.slice(0,6) as any} columns={[
            { key: "metric", label: "Metric" }, { key: "value", label: "Value" }, { key: "trend", label: "Trend" },
          ]} />
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Data room status</h3>
        <SimpleTable rows={dr as any} columns={[
          { key: "section", label: "Section" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Server boundary &amp; RLS examples</h3>
        <div className="mt-2 grid gap-3 lg:grid-cols-2">
          <SimpleTable rows={boundary as any} columns={[{ key: "kind", label: "Kind" }, { key: "name", label: "Name" }, { key: "auth", label: "Auth" }]} />
          <SimpleTable rows={rls as any} columns={[{ key: "table", label: "Table" }, { key: "policy", label: "Policy" }]} />
        </div>
      </Card>
      <Card className="border-indigo-400/20 bg-indigo-400/5 p-4">
        <h3 className="text-sm font-semibold text-indigo-100">Phase 40 (V13.5) teaser — not started</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/90">
          {teaser.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/overview")({
  head: () => ({ meta: [{ title: "V13 Overview · Phase 39" }] }),
  component: Page,
});
