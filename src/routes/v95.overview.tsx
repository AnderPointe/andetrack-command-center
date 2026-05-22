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
  return (
    <V95Page icon={<Gauge className="size-6 text-cyan-300" />} title="Anderoute V9.5 — Global Enterprise Stewardship" blurb="Mature certification evidence, financial governance, marketplace optimization, customer trust, value creation, and category leadership execution. Mock-only — no audit / SOC 2 / autonomous claims.">
      <ExecBanner h={h} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Enterprise trust"     value={s.trust.score} tone="emerald" />
        <ScoreCard label="Stewardship domains"  value={s.domains.length} tone="sky" />
        <ScoreCard label="Open gaps"            value={s.gaps.length} tone="amber" />
        <ScoreCard label="Action items"         value={s.actions.length} tone="violet" />
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
