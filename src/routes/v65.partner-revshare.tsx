import { createFileRoute } from "@tanstack/react-router";
import { DollarSign } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { SimpleTable, StatusPill } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { usePartnerRevenueShare } from "@/v65/hooks";

export const Route = createFileRoute("/v65/partner-revshare")({
  head: () => ({ meta: [{ title: "Partner Revenue Share · V6.5 · Anderoute" }] }),
  component: () => {
    const { rows } = usePartnerRevenueShare();
    return (
      <V65Page icon={<DollarSign className="size-6 text-cyan-300" />} title="Partner Revenue Share"
        blurb="Placeholder — payout amounts, share percentages, dispute and approval workflow require finance + legal review before activation.">
        <Card className="border-amber-400/30 bg-amber-500/[0.04] p-3 text-xs text-amber-200">
          Placeholder: revenue share percentages and payouts are illustrative only.
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={rows} columns={[
            { key: "partner",   label: "Partner" },
            { key: "product",   label: "Product" },
            { key: "customer",  label: "Customer" },
            { key: "amount_pl", label: "Amount (pl)" },
            { key: "share_pl",  label: "Share (pl)" },
            { key: "status",    label: "Status", render: (r) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
      </V65Page>
    );
  },
});
