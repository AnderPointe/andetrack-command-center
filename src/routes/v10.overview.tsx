import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Anderoute V10 — Global Category Leadership";
const BLURB = "Mock-only. Category leadership, trust commercialization, marketplace value proof, platform economics, defensibility, retention/expansion. No autonomous dispatch, no certification claims without evidence.";

function Page() {
  const c = H.useGlobalCategoryLeadership();
  const h = H.useV10ExecHeadline();
  const overlays = H.useV10ExecutionOverlays().slice(0, 6);
  const boundary = H.useV10BackendBoundary();
  const trend = H.useV10CategoryTrend();
  const spotlight = H.useV10LeadershipSpotlight();
  const kpis = H.useV10OutcomeKpis();
  return (
    <V10Page icon={<Gauge className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <ExecBanner h={h} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Category leadership" value={c.summary.score} tone="emerald" />
        <ScoreCard label="Trust commercial"    value={H.useEnterpriseTrustCommercialization().summary.sales_readiness} tone="sky" />
        <ScoreCard label="MP value proof"      value={H.useMarketplaceValueProof().summary.score} tone="violet" />
        <ScoreCard label="Defensibility"       value={H.useEcosystemDefensibility().summary.score} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Category leadership trend — actual vs target</h3>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {trend.map(t => {
            const ahead = t.score >= t.target;
            return (
              <div key={t.period} className="rounded-lg border border-white/10 bg-black/30 p-3">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{t.period}</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className={`text-2xl font-semibold ${ahead ? "text-emerald-200" : "text-amber-200"}`}>{t.score}</span>
                  <span className="text-xs text-muted-foreground">/ {t.target}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full ${ahead ? "bg-emerald-400/60" : "bg-amber-400/60"}`} style={{ width: `${Math.min(100, t.score)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Outcome KPIs — V10 commitments</h3>
        <div className="mt-3 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {kpis.map(k => {
            const good = k.tone === "good";
            const pct = Math.min(100, Math.round((k.value / Math.max(k.target, 1)) * 100));
            return (
              <div key={k.label} className="rounded-lg border border-white/10 bg-black/30 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">{k.label}</span>
                  <StatusPill status={good ? "ready" : "needs_refresh"} />
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl font-semibold">{k.value}</span>
                  <span className="text-xs text-muted-foreground">target {k.target}</span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full ${good ? "bg-emerald-400/60" : "bg-amber-400/60"}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Leadership spotlight — recent wins</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {spotlight.map(s => (
            <li key={s.area} className="grid grid-cols-[10rem_1fr_6rem] items-center gap-2 border-b border-white/5 py-1 last:border-0">
              <span className="text-amber-200">{s.area}</span>
              <span>{s.win}</span>
              <span className="text-xs text-muted-foreground">{s.owner}</span>
            </li>
          ))}
        </ul>
      </Card>
      <KpiGrid cols={5} items={c.pillars.slice(0, 10).map(p => ({ label: p.pillar, value: `${p.score}%`, sub: `owner: ${p.owner}` }))} />
      <OverlayStrip items={overlays as any} title="Executive overlays — top 6" />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Backend boundary — server fn vs server route vs edge function</h3>
        <p className="mt-1 text-xs text-muted-foreground">V10 internal logic uses TanStack <code>createServerFn</code>. External webhooks live under <code>/api/public/*</code>. No new edge functions in V10.</p>
        <SimpleTable rows={boundary as any} columns={[{ key: "kind", label: "Kind" }, { key: "name", label: "Name" }, { key: "caller", label: "Caller" }, { key: "auth", label: "Auth" }]} />
      </Card>
    </V10Page>
  );
}


export const Route = createFileRoute("/v10/overview")({
  head: () => ({ meta: [{ title: "Anderoute V10 — Global Category Leadership · Anderoute V10" }] }),
  component: Page,
});
