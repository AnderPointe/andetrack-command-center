import { createFileRoute } from "@tanstack/react-router";
import { FileSpreadsheet } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { SimpleTable, StatusPill } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { useRevenueRecognitionReadiness } from "@/v65/hooks";

export const Route = createFileRoute("/v65/revenue-rec")({
  head: () => ({ meta: [{ title: "Revenue Recognition Readiness · V6.5 · Anderoute" }] }),
  component: () => {
    const { events, exceptions } = useRevenueRecognitionReadiness();
    return (
      <V65Page icon={<FileSpreadsheet className="size-6 text-cyan-300" />} title="Revenue Recognition Readiness"
        blurb="Placeholder only — does not claim accounting or legal completeness. Classifies revenue events and surfaces recognition exceptions for finance review.">
        <Card className="border-amber-400/30 bg-amber-500/[0.04] p-3 text-xs text-amber-200">
          Placeholder: classifications + service periods need finance review before production use.
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Revenue event classification</h3>
          <div className="mt-2">
            <SimpleTable rows={events} columns={[
              { key: "type",        label: "Event type" },
              { key: "count",       label: "Count" },
              { key: "amount_pl",   label: "Amount (pl)" },
              { key: "recognition", label: "Recognition" },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Revenue control exceptions</h3>
          <div className="mt-2">
            <SimpleTable rows={exceptions} columns={[
              { key: "event",  label: "Event" },
              { key: "issue",  label: "Issue" },
              { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
      </V65Page>
    );
  },
});
