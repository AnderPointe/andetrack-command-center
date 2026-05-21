import { createFileRoute } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useCrossBorderOperatingControls } from "@/v8/hooks";

export const Route = createFileRoute("/v8/cross-border")({
  head: () => ({ meta: [{ title: "Cross-Border Operating Controls · Anderoute" }] }),
  component: () => {
    const { checklist, shipments } = useCrossBorderOperatingControls();
    return (
      <V8Page icon={<Compass className="size-6 text-violet-300" />} title="Cross-Border Operating Controls"
        blurb="Placeholder checklist + audit trail for cross-border shipments. Customs production workflows remain explicitly deferred.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Control checklist</h3>
          <SimpleTable rows={checklist as any} columns={[
            { key: "item",   label: "Item" },
            { key: "status", label: "Required?" },
            { key: "category", label: "Category" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Cross-border shipments (placeholder)</h3>
          <SimpleTable rows={shipments as any} columns={[
            { key: "id", label: "ID" },
            { key: "lane", label: "Lane" },
            { key: "broker", label: "Broker" },
            { key: "docs", label: "Docs" },
            { key: "approval", label: "Approval" },
            { key: "residency", label: "Residency" },
            { key: "status", label: "Status" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
