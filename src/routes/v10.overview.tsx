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
  return (
    <V10Page icon={<Gauge className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <ExecBanner h={h} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Category leadership" value={c.summary.score} tone="emerald" />
        <ScoreCard label="Trust commercial"    value={H.useEnterpriseTrustCommercialization().summary.sales_readiness} tone="sky" />
        <ScoreCard label="MP value proof"      value={H.useMarketplaceValueProof().summary.score} tone="violet" />
        <ScoreCard label="Defensibility"       value={H.useEcosystemDefensibility().summary.score} tone="amber" />
      </div>
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
