import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { ScoreCard, KpiGrid, ExecBanner, OverlayStrip, SimpleTable } from "@/components/v95/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v95/hooks";

function Page() {
  const s = H.useGlobalEnterpriseStewardship();
  const h = H.useV95ExecHeadline();
  const overlays = H.useV95ExecutionOverlays().slice(0, 6);
  const boundary = H.useV95BackendBoundary();
  const trend = H.useV95TrustTrend();
  const spotlight = H.useV95StewardshipSpotlight();
  const outcomes = H.useV95StewardshipOutcomes();
  return (
    <V95Page icon={<Gauge className="size-6 text-cyan-300" />} title="Anderoute V9.5 — Global Enterprise Stewardship" blurb="Mature certification evidence, financial governance, marketplace optimization, customer trust, value creation, and category leadership execution. Mock-only — no audit / SOC 2 / autonomous claims.">
      <ExecBanner h={h} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Enterprise trust"     value={s.trust.score} tone="emerald" />
        <ScoreCard label="Stewardship domains"  value={s.domains.length} tone="sky" />
        <ScoreCard label="Open gaps"            value={s.gaps.length} tone="amber" />
        <ScoreCard label="Action items"         value={s.actions.length} tone="violet" />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Enterprise trust trend (target vs actual)</h3>
        <div className="mt-2 grid grid-cols-4 gap-3">
          {trend.map(t => (
            <div key={t.period} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{t.period}</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-xl font-semibold text-emerald-300">{t.score}</span>
                <span className="text-xs text-muted-foreground">/ {t.target} target</span>
              </div>
              <div className="mt-2 h-1.5 rounded bg-white/5">
                <div className="h-1.5 rounded bg-emerald-400/70" style={{ width: `${Math.min(100, (t.score / t.target) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Stewardship spotlight</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {spotlight.map(s => (
              <li key={s.label} className="rounded border border-white/5 bg-black/20 px-3 py-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
                <div className="mt-0.5"><span className="text-cyan-200">{s.value}</span> — <span className="text-xs text-muted-foreground">{s.detail}</span></div>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Outcome KPIs vs target</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {outcomes.map(o => {
              const pct = Math.round((o.current / o.target) * 100);
              const tone = pct >= 100 ? "emerald" : pct >= 92 ? "sky" : "amber";
              return (
                <li key={o.kpi} className="rounded border border-white/5 bg-black/20 px-3 py-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>{o.kpi}</span>
                    <span className="text-muted-foreground">{o.current} / {o.target}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded bg-white/5">
                    <div className={`h-1.5 rounded bg-${tone}-400/70`} style={{ width: `${Math.min(100, pct)}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <KpiGrid cols={5} items={s.domains.slice(0, 10).map(d => ({ label: d.domain, value: `${d.score}%`, sub: `owner: ${d.owner}` }))} />
      <OverlayStrip items={overlays as any} title="Executive overlays — top 6" />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Backend boundary — server fn vs server route vs edge function</h3>
        <p className="mt-1 text-xs text-muted-foreground">V9.5 internal logic uses TanStack <code>createServerFn</code>. External webhooks live under <code>/api/public/*</code>. No new edge functions in V9.5.</p>
        <SimpleTable rows={boundary as any} columns={[{ key: "kind", label: "Kind" }, { key: "name", label: "Name" }, { key: "caller", label: "Caller" }, { key: "auth", label: "Auth" }]} />
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/overview")({
  head: () => ({ meta: [{ title: "V9.5 Overview · Anderoute" }] }),
  component: Page,
});
