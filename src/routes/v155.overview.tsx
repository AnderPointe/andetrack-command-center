import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { ScoreCard, KpiGrid, ExecHeadline, Section, SimpleTable, TrendBars, StatusPill } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const h = H.useV155Headline();
  const m = H.useV155Maturity();
  const heatmap = H.useV155OwnerHeatmap();
  const controls = H.useV155Controls();
  const edge = H.useV155EdgeBoundary();
  const teaser = H.useV155Phase45Teaser();
  return (
    <V155Page icon={<Brain className="size-6 text-fuchsia-300" />}
      title="Anderoute V15.5 — Enterprise Intelligence Maturity"
      blurb="Mock-only. Assist-only intelligence across capital, revenue, marketplace, accounts, partners, product, category. Every recommendation requires human approval, ships with explainability, and is outcome-tracked. No autonomous dispatch.">
      <ExecHeadline tag="V15.5 maturity headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Intelligence maturity" value={m.score} tone="violet" />
        <ScoreCard label="Calibration" value={84} tone="emerald" />
        <ScoreCard label="Approval discipline" value={91} tone="amber" />
        <ScoreCard label="Drift watch" value={68} tone="rose" />
      </div>
      <KpiGrid cols={4} items={[
        { label: "Maturity QoQ", value: `+${m.qoq}`, sub: "vs Q-1" },
        { label: "Dimensions", value: m.dimensions.length, sub: "Tracked" },
        { label: "Trend pts", value: m.trends.length, sub: "Quarterly" },
        { label: "Autonomy", value: "Assist", sub: "Humans in loop" },
      ]} />
      <div className="grid gap-3 md:grid-cols-2">
        <TrendBars title="Maturity QoQ" points={m.trends.map(t => ({ label: t.q, value: t.score }))} />
        <Section title="Maturity dimensions">
          <SimpleTable rows={m.dimensions as any} columns={[
            { key: "dim", label: "Dimension" },
            { key: "score", label: "Score" },
            { key: "target", label: "Target" },
            { key: "owner", label: "Owner" },
          ]} />
        </Section>
      </div>
      <Section title="Owner heatmap (recs + calibration)">
        <SimpleTable rows={heatmap as any} columns={[
          { key: "owner", label: "Owner" },
          { key: "recs", label: "Recs" },
          { key: "pending", label: "Pending" },
          { key: "overdue", label: "Overdue" },
          { key: "calibration", label: "Calibration", render: (r: any) => <StatusPill status={r.calibration === "tight" ? "healthy" : "watchlist"} /> },
        ]} />
      </Section>
      <Section title="Intelligence control coverage">
        <SimpleTable rows={controls as any} columns={[
          { key: "control", label: "Control" },
          { key: "coverage", label: "Coverage %" },
          { key: "last_tested", label: "Last tested" },
          { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="ServerFn vs /api/public vs Edge boundary">
        <SimpleTable rows={edge as any} columns={[
          { key: "layer", label: "Layer" },
          { key: "concern", label: "Concern" },
          { key: "auth", label: "Auth" },
          { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V155Page>
  );
}

export const Route = createFileRoute("/v155/overview")({ component: Page });
