import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/scope")({
  head: () => ({ meta: [{ title: "V8.5 Scope · Anderoute" }] }),
  component: () => {
    const s = H.useV85Scope();
    return (
      <V85Page icon={<Layers className="size-6 text-fuchsia-300" />} title="V8.5 Scope Board" blurb="Phase 30 scope, status, and explicit deferrals.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Operating discipline" value={s.discipline.score} tone="emerald" />
          <ScoreCard label="Shipped areas" value={s.matrix.filter(m=>m.status==="shipped").length} tone="sky" />
          <ScoreCard label="Placeholder areas" value={s.matrix.filter(m=>m.status==="placeholder").length} tone="amber" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">V8.5 feature matrix</h3>
          <SimpleTable rows={s.matrix as any} columns={[{key:"area",label:"Area"},{key:"status",label:"Status",render:(r:any)=><StatusPill status={r.status}/>},{key:"notes",label:"Notes"}]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Still deferred</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">{s.deferred.map(x=><li key={x}>{x}</li>)}</ul>
        </Card>
      </V85Page>);
  },
});
