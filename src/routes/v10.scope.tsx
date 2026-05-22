import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "V10 Scope";
const BLURB = "V10ScopeBoard, V10FeatureMatrix, V10DeferredScopePanel, V10CategoryLeadershipScore.";

function Page() {
  const s = H.useV10Scope();
  return (
    <V10Page icon={<Layers className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Feature matrix</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {s.matrix.map((m) => (
              <li key={m.area} className="flex items-center justify-between rounded border border-white/5 bg-black/20 px-3 py-1.5">
                <div><div className="font-medium">{m.area}</div><div className="text-xs text-muted-foreground">{m.note}</div></div>
                <StatusPill status={m.status} />
              </li>
            ))}
          </ul>
        </Card>
        <div className="space-y-3">
          <Card className="border-amber-400/40 bg-white/[0.02] p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Category leadership</div>
            <div className="mt-1 text-4xl font-semibold text-amber-200">{s.leadership.score}%</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.leadership.label} · +{s.leadership.trend_pts} pts QoQ</div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Deferred scope</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {s.deferred.map((d) => <li key={d}>· {d}</li>)}
            </ul>
          </Card>
        </div>
      </div>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/scope")({
  head: () => ({ meta: [{ title: "V10 Scope · Anderoute V10" }] }),
  component: Page,
});
