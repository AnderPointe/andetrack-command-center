import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable, StatusPill } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useCrossBorderWorkflowPlaceholder } from "@/v7/hooks";

export const Route = createFileRoute("/v7/cross-border")({
  head: () => ({ meta: [{ title: "Cross-Border Workflow · V7 · Anderoute" }] }),
  component: () => {
    const { shipments, timeline } = useCrossBorderWorkflowPlaceholder();
    return (
      <V7Page icon={<Truck className="size-6 text-indigo-300" />} title="Cross-Border Logistics Workflow (Placeholder)"
        blurb="Customs documents, broker, border checkpoint, and international carrier workflows are placeholders. Not production.">
        <Card className="border-amber-400/30 bg-amber-500/[0.04] p-4 text-xs text-amber-100/90">
          Customs and broker integrations are NOT live. Do not represent these workflows as production.
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Cross-border shipments</h3>
          <div className="mt-2">
            <SimpleTable rows={shipments as any} columns={[
              { key: "id",         label: "ID" },
              { key: "origin",     label: "Origin" },
              { key: "dest",       label: "Dest" },
              { key: "carrier",    label: "Carrier" },
              { key: "checkpoint", label: "Checkpoint" },
              { key: "customs",    label: "Customs",  render: (r: any) => <StatusPill status={r.customs} /> },
              { key: "status",     label: "Status",   render: (r: any) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Customer-facing timeline (placeholder)</h3>
          <ol className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            {timeline.map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-28 shrink-0 font-mono text-indigo-300">{t.ts}</span>
                <span>{t.event}</span>
              </li>
            ))}
          </ol>
        </Card>
      </V7Page>
    );
  },
});
