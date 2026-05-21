import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable, StatusPill, ScoreCard } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useV8Scope } from "@/v8/hooks";

export const Route = createFileRoute("/v8/scope")({
  head: () => ({ meta: [{ title: "V8 Scope · Anderoute" }] }),
  component: () => {
    const { matrix, deferred, scale } = useV8Scope();
    return (
      <V8Page icon={<Layers className="size-6 text-violet-300" />} title="V8 Scope Board"
        blurb="What Phase 29 ships, what stays placeholder, and what remains explicitly deferred.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Global scale" value={scale.score} tone="sky" />
          <ScoreCard label="Shipped areas" value={matrix.filter(m => m.status === "shipped").length} tone="emerald" />
          <ScoreCard label="Placeholder areas" value={matrix.filter(m => m.status === "placeholder").length} tone="amber" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">V8 feature matrix</h3>
          <SimpleTable rows={matrix as any} columns={[
            { key: "area", label: "Area" },
            { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
            { key: "notes", label: "Notes" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Still deferred</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {deferred.map(d => <li key={d}>{d}</li>)}
          </ul>
        </Card>
      </V8Page>
    );
  },
});
