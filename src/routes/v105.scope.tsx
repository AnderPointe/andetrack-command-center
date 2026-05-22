import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const s = H.useV105Scope();
  return (
    <V105Page icon={<Layers className="size-6 text-fuchsia-300" />} title="V10.5 Scope" blurb="Feature matrix and deferred scope.">
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="Commercial scale" value={s.summary.score} tone="emerald" />
        <ScoreCard label="Areas in V10.5"   value={s.matrix.length} tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Feature matrix</h3>
        <SimpleTable rows={s.matrix as any} columns={[
          { key: "area", label: "Area" }, { key: "state", label: "State" }, { key: "owner", label: "Owner" },
        ]} />
      </Card>
      <Card className="border-amber-400/30 bg-amber-500/5 p-4">
        <h3 className="text-sm font-semibold text-amber-200">Still deferred</h3>
        <ul className="mt-2 grid gap-1 text-sm md:grid-cols-2">
          {s.deferred.map(d => <li key={d} className="rounded border border-white/10 bg-black/20 px-3 py-1.5">{d}</li>)}
        </ul>
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/scope")({
  head: () => ({ meta: [{ title: "V10.5 Scope · Phase 34" }] }),
  component: Page,
});
