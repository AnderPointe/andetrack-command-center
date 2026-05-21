import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useCrossBorderExecutionPlaceholder } from "@/v75/hooks";

export const Route = createFileRoute("/v75/cross-border")({
  head: () => ({ meta: [{ title: "Cross-Border Execution · V7.5 · Anderoute" }] }),
  component: () => {
    const { shipments } = useCrossBorderExecutionPlaceholder();
    return (
      <V75Page icon={<Truck className="size-6 text-indigo-300" />} title="Cross-Border Workflow Execution Placeholder"
        blurb="Placeholder only — not production customs. Profile, checkpoint, broker, commercial invoice, document status placeholders for review.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={shipments as any} columns={[
            { key: "id",          label: "Shipment" },
            { key: "origin",      label: "Origin" },
            { key: "dest",        label: "Destination" },
            { key: "checkpoint",  label: "Checkpoint" },
            { key: "carrier",     label: "Carrier" },
            { key: "status",      label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
            { key: "docs",        label: "Docs", render: (r: any) => <StatusPill status={r.docs} /> },
            { key: "exception",   label: "Exception" },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
