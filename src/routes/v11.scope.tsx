import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, ScoreCard } from "@/components/v11/ui-bits";
import * as H from "@/v11/hooks";

function Page() {
  const s = H.useV11Scope();
  return (
    <V11Page icon={<Layers className="size-6 text-cyan-300" />} title="V11 Scope" blurb="V11 enterprise revenue maturity scope. Mock-only.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Revenue engine maturity" value={s.summary.score} tone="emerald" />
        <ScoreCard label="V11 areas in scope" value={String(s.matrix.length)} tone="sky" />
        <ScoreCard label="Deferred items" value={String(s.deferred.length)} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">V11 feature matrix</h3>
        <SimpleTable rows={s.matrix as any} columns={[
          { key: "area", label: "Area" }, { key: "state", label: "State" }, { key: "owner", label: "Owner" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Deferred scope</h3>
        <ul className="mt-2 grid gap-1.5 text-sm md:grid-cols-2">
          {s.deferred.map((d) => <li key={d} className="rounded border border-white/5 bg-black/20 px-3 py-1.5 text-muted-foreground">— {d}</li>)}
        </ul>
      </Card>
    </V11Page>
  );
}

export const Route = createFileRoute("/v11/scope")({
  head: () => ({ meta: [{ title: "V11 Scope · Phase 35" }] }),
  component: Page,
});
