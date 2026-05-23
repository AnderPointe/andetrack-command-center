import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, KpiGrid, ExecHeadline, Section, SimpleTable, TrendBars, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const c = H.useEnterprisePerformanceCommand();
  const tr = H.useV15Trends();
  const h = H.useV15ExecHeadline();
  const cap = H.useDurableCapitalExecution();
  const rev = H.useDurableRevenuePerformance();
  const mp = H.useMarketplaceScaleGovernance();
  const cat = H.useCategoryLeadershipOperatingSystem();
  const teaser = H.useV15Phase44Teaser();
  return (
    <V15Page icon={<Gauge className="size-6 text-cyan-300" />} title="Anderoute V15 — Enterprise Performance Command" blurb="Mock-only. Executive command visibility across capital, revenue, marketplace, category, accounts, partners, product, board. No autonomous dispatch. No final IPO/SOC2/ISO claims.">
      <ExecHeadline tag="V15 exec headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-5">
        <ScoreCard label="Enterprise performance" value={c.score} tone="violet" />
        <ScoreCard label="Capital execution"      value={cap.score} tone="amber" />
        <ScoreCard label="Durable revenue"        value={rev.score} tone="emerald" />
        <ScoreCard label="MP scale governance"    value={mp.score}  tone="rose" />
        <ScoreCard label="Category leadership"    value={cat.score} tone="sky" />
      </div>
      <KpiGrid cols={4} items={[
        { label: "Enterprise QoQ", value: `+${c.trend_qoq}`, sub: "vs Q-1" },
        { label: "Open gaps",      value: c.gaps.length, sub: "Tracked" },
        { label: "Top actions",    value: c.actions.length, sub: "Owners assigned" },
        { label: "Health flags",   value: c.health_map.filter(x => x.status !== "healthy").length, sub: "Watchlist / in_prog" },
      ]} />
      <div className="grid gap-3 md:grid-cols-2">
        <TrendBars title="Performance vs Capital QoQ" points={tr.map(t => ({ label: t.q, value: t.perf, sub: `Cap ${t.cap}` }))} />
        <TrendBars title="Revenue vs Marketplace QoQ" accent="bg-emerald-400/60" labelColor="text-emerald-200"
          points={tr.map(t => ({ label: t.q, value: t.rev, sub: `MP ${t.mp}` }))} />
      </div>
      <Section title="Performance health map">
        <SimpleTable rows={c.health_map as any} columns={[
          { key: "area", label: "Area" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
      <Section title="Performance dimensions">
        <SimpleTable rows={c.kpis as any} columns={[{ key: "dim", label: "Dimension" }, { key: "pct", label: "%" }]} />
      </Section>
      <Section title="Gap panel">
        <ul className="list-disc space-y-1 pl-5 text-xs">{c.gaps.map((g) => <li key={g}>{g}</li>)}</ul>
      </Section>
      <Section title="Enterprise performance action plan">
        <SimpleTable rows={c.actions as any} columns={[
          { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "evidence", label: "Evidence" },
        ]} />
      </Section>
      <ExecHeadline tag="Phase 44 (V15.5) teaser — not started" headline="Enterprise intelligence maturity + autonomous-assist (human approval)" bullets={teaser} />
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/overview")({
  head: () => ({ meta: [{ title: "V15 Overview · Phase 43" }] }),
  component: Page,
});
