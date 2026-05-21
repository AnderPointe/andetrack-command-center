import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable, KpiGrid } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useRevenueReconciliationMaturity } from "@/v8/hooks";

export const Route = createFileRoute("/v8/revenue-recon")({
  head: () => ({ meta: [{ title: "Revenue Reconciliation Maturity · Anderoute" }] }),
  component: () => {
    const { events, summary } = useRevenueReconciliationMaturity();
    return (
      <V8Page icon={<Wallet className="size-6 text-violet-300" />} title="Revenue Reconciliation Maturity (Placeholder)"
        blurb="Event matching across subscriptions, usage, marketplace fees, API overage, partner revshare, carrier settlements, invoices, payments. NOT GAAP / financial-audit complete.">
        <KpiGrid cols={3} items={[
          { label: "Matched events",    value: summary.matched },
          { label: "Unmatched events",  value: summary.unmatched },
          { label: "Exceptions open",   value: summary.exceptions_open },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={events as any} columns={[
            { key: "source",    label: "Source" },
            { key: "events",    label: "Events" },
            { key: "matched",   label: "Matched" },
            { key: "unmatched", label: "Unmatched" },
            { key: "owner",     label: "Owner" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
