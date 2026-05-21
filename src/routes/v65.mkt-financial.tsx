import { createFileRoute } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { KpiGrid, SimpleTable, StatusPill } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { useMarketplaceFinancialControls } from "@/v65/hooks";

export const Route = createFileRoute("/v65/mkt-financial")({
  head: () => ({ meta: [{ title: "Marketplace Financial Controls · V6.5 · Anderoute" }] }),
  component: () => {
    const { summary, settlements } = useMarketplaceFinancialControls();
    return (
      <V65Page icon={<Store className="size-6 text-cyan-300" />} title="Marketplace Financial Controls"
        blurb="Transactions, fees, dispute holds, settlement approvals, carrier payouts. All amounts are placeholders.">
        <KpiGrid cols={3} items={[
          { label: "Transactions today",      value: summary.transactions_today },
          { label: "Fees collected (pl)",     value: summary.fees_collected_pl },
          { label: "Disputed holds",          value: summary.disputed_holds },
          { label: "Pending settlements",     value: summary.pending_settlements },
          { label: "Carrier payouts (pl)",    value: summary.carrier_payouts_pl },
          { label: "Fee calc audited %",      value: `${summary.fee_calc_audited_pct}%` },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Settlement approval queue</h3>
          <div className="mt-2">
            <SimpleTable rows={settlements} columns={[
              { key: "id",         label: "ID" },
              { key: "carrier",    label: "Carrier" },
              { key: "amount_pl",  label: "Amount (pl)" },
              { key: "status",     label: "Status", render: (r) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
      </V65Page>
    );
  },
});
