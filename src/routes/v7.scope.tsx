import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable, StatusPill } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useV7Scope } from "@/v7/hooks";

export const Route = createFileRoute("/v7/scope")({
  head: () => ({ meta: [{ title: "V7 Scope · Anderoute" }] }),
  component: () => {
    const { matrix, deferred } = useV7Scope();
    return (
      <V7Page icon={<Layers className="size-6 text-indigo-300" />} title="V7 Scope + Feature Matrix"
        blurb="What V7 includes, what is placeholder-only, and what is still deferred.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={matrix as any} columns={[
            { key: "area",   label: "Area" },
            { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
            { key: "notes",  label: "Notes" },
          ]} />
        </Card>
        <Card className="border-rose-400/20 bg-rose-500/[0.04] p-4">
          <h3 className="text-sm font-semibold text-rose-200">Still deferred</h3>
          <ul className="mt-2 list-disc pl-5 text-xs text-rose-100/80 space-y-1">
            {deferred.map(d => <li key={d}>{d}</li>)}
          </ul>
        </Card>
      </V7Page>
    );
  },
});
