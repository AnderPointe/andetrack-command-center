import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, KpiGrid, ExecHeadline, Section, SimpleTable, TrendBars } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const o = H.useEnterpriseOperatingExcellence();
  const tr = H.useV145Trends();
  const h = H.useV145ExecHeadline();
  const hp = H.useV145PolishHeadlines();
  const cap = H.useStrategicCapitalDiscipline();
  const rev = H.useDurableRevenueSystems();
  const mp = H.useMarketplaceEconomicsScale();
  const cat = H.useCategoryExecutionMaturity();
  const lt = H.useLongTermPerformanceManagement();
  const teaser = H.useV145Phase43Teaser();
  const edge = H.useV145EdgeExtended();
  const heat = H.useV145OwnerHeatmap();
  const cov = H.useV145ControlCoverage();
  return (
    <V145Page icon={<Gauge className="size-6 text-fuchsia-300" />} title="Anderoute V14.5 — Enterprise Operating Excellence" blurb="Mock-only. Disciplined operating platform: capital discipline, durable revenue, marketplace scale, category execution, board execution, long-term performance. No autonomous dispatch. No final IPO/SOC2/ISO claims.">
      <ExecHeadline tag="V14.5 exec headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-5">
        <ScoreCard label="Operating excellence" value={o.score} tone="violet" />
        <ScoreCard label="Capital discipline"  value={cap.score} tone="amber" />
        <ScoreCard label="Revenue durability"  value={rev.score} tone="emerald" />
        <ScoreCard label="MP economics scale"  value={mp.score}  tone="rose" />
        <ScoreCard label="Category execution"  value={cat.score} tone="sky" />
      </div>
      <KpiGrid cols={4} items={[
        { label: "LT performance", value: `${lt.score}%`, sub: "Trend +2 QoQ" },
        { label: "OpEx QoQ",       value: `+${o.trend_qoq}`, sub: "vs Q-1" },
        { label: "Open gaps",      value: o.gaps.length, sub: "Tracked" },
        { label: "Top actions",    value: o.actions.length, sub: "Owners assigned" },
      ]} />
      <div className="grid gap-3 md:grid-cols-2">
        <TrendBars title="OpEx vs Capital QoQ" points={tr.map(t => ({ label: t.q, value: t.opex, sub: `Cap ${t.cap}` }))} />
        <TrendBars title="Durability vs MP" accent="bg-emerald-400/60" labelColor="text-emerald-200"
          points={tr.map(t => ({ label: t.q, value: t.dur, sub: `MP ${t.mp}` }))} />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <ExecHeadline tag={hp.capital.tag} headline={hp.capital.headline} bullets={hp.capital.bullets} />
        <ExecHeadline tag={hp.revenue.tag} headline={hp.revenue.headline} bullets={hp.revenue.bullets} />
        <ExecHeadline tag={hp.mp.tag}      headline={hp.mp.headline}      bullets={hp.mp.bullets} />
        <ExecHeadline tag={hp.board.tag}   headline={hp.board.headline}   bullets={hp.board.bullets} />
      </div>
      <Section title="Operating dimensions">
        <SimpleTable rows={o.kpis as any} columns={[{ key: "dim", label: "Dimension" }, { key: "pct", label: "%" }]} />
      </Section>
      <Section title="Owner accountability heatmap (polish)">
        <SimpleTable rows={heat as any} columns={[
          { key: "owner", label: "Owner" }, { key: "actions", label: "Actions" },
          { key: "overdue", label: "Overdue" }, { key: "atRisk", label: "At risk" },
          { key: "fresh", label: "Evidence %" },
        ]} />
      </Section>
      <Section title="Operating control coverage (polish)">
        <SimpleTable rows={cov as any} columns={[
          { key: "layer", label: "Control layer" }, { key: "coverage", label: "Coverage %" },
          { key: "tested_q", label: "Last tested" }, { key: "evidence", label: "Evidence" },
        ]} />
      </Section>
      <Section title="Edge Function vs ServerFn separation (extended)">
        <SimpleTable rows={edge as any} columns={[
          { key: "boundary", label: "Boundary" }, { key: "name", label: "Surface" },
          { key: "caller", label: "Caller" }, { key: "auth", label: "Auth" },
          { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <ExecHeadline tag="Phase 43 (V15) teaser — not started" headline="Enterprise Performance Command + Strategic Operating Intelligence" bullets={teaser} />
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/overview")({
  head: () => ({ meta: [{ title: "V14.5 Overview · Phase 42" }] }),
  component: Page,
});
