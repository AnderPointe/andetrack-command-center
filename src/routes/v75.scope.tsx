import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill, ScoreCard } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useV75Scope } from "@/v75/hooks";

export const Route = createFileRoute("/v75/scope")({
  head: () => ({ meta: [{ title: "V7.5 Scope · Anderoute" }] }),
  component: () => {
    const { matrix, deferred, score } = useV75Scope();
    return (
      <V75Page icon={<Layers className="size-6 text-indigo-300" />} title="V7.5 Scope Board"
        blurb="What Phase 28 ships, what stays placeholder, and what remains explicitly deferred.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Execution readiness" value={score.overall} tone="sky" />
          <ScoreCard label="Shipped areas"       value={matrix.filter(m => m.status === "shipped").length} tone="emerald" />
          <ScoreCard label="Placeholder areas"   value={matrix.filter(m => m.status === "placeholder").length} tone="amber" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">V7.5 feature matrix</h3>
          <div className="mt-2">
            <SimpleTable rows={matrix as any} columns={[
              { key: "area",   label: "Area" },
              { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
              { key: "notes",  label: "Notes" },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Still deferred</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {deferred.map(d => <li key={d}>{d}</li>)}
          </ul>
        </Card>
      </V75Page>
    );
  },
});
