import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill, ScoreCard } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useRevenueReconciliationPlaceholder } from "@/v75/hooks";

export const Route = createFileRoute("/v75/revenue-recon")({
  head: () => ({ meta: [{ title: "Revenue Reconciliation Placeholder · V7.5 · Anderoute" }] }),
  component: () => {
    const { events } = useRevenueReconciliationPlaceholder();
    const unmatched = events.filter(e => e.status === "unmatched").length;
    const exceptions = events.filter(e => e.status === "exception").length;
    return (
      <V75Page icon={<Wallet className="size-6 text-indigo-300" />} title="Revenue Reconciliation Placeholder"
        blurb="Placeholder only — does not claim accounting completeness. Matches billing/subscription/usage/marketplace events for review by owners.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Unmatched" value={unmatched} tone="rose" />
          <ScoreCard label="Exceptions" value={exceptions} tone="amber" />
          <ScoreCard label="Matched" value={events.filter(e => e.status === "matched").length} tone="emerald" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={events as any} columns={[
            { key: "id",     label: "Event" },
            { key: "type",   label: "Type" },
            { key: "amount", label: "Amount", render: (r: any) => `$${r.amount.toFixed(2)}` },
            { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
            { key: "reason", label: "Reason" },
            { key: "owner",  label: "Owner" },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
