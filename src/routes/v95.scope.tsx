import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const s = H.useV95Scope();
  return (
    <V95Page icon={<Layers className="size-6 text-cyan-300" />} title="V9.5 Scope" blurb="V95ScopeBoard, V95FeatureMatrix, V95DeferredScopePanel, V95EnterpriseTrustScore.">
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
          <Card className="border-cyan-400/40 bg-white/[0.02] p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Enterprise trust score</div>
            <div className="mt-1 text-4xl font-semibold text-cyan-200">{s.trust.score}%</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.trust.label} · +{s.trust.trend_pts} pts this quarter</div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Deferred scope</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {s.deferred.map((d) => <li key={d}>· {d}</li>)}
            </ul>
          </Card>
        </div>
      </div>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/scope")({
  head: () => ({ meta: [{ title: "V9.5 Scope · Anderoute" }] }),
  component: Page,
});
