import { createFileRoute } from "@tanstack/react-router";
import { Plug } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { KpiGrid, SimpleTable } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { useAPIPartnerBillingControls } from "@/v65/hooks";

export const Route = createFileRoute("/v65/api-billing")({
  head: () => ({ meta: [{ title: "API + Partner Billing Controls · V6.5 · Anderoute" }] }),
  component: () => {
    const { api, events } = useAPIPartnerBillingControls();
    return (
      <V65Page icon={<Plug className="size-6 text-cyan-300" />} title="API + Partner Billing Controls"
        blurb="API usage, plan limits, overages, partner revenue share placeholder, partner billing events, rate-limit enforcement, audit.">
        <KpiGrid cols={3} items={[
          { label: "API calls (30d)",        value: api.total_calls_30d.toLocaleString() },
          { label: "Billed overages",        value: api.billed_overages },
          { label: "Partner rev share (pl)", value: api.partner_rev_share_pl },
          { label: "Partner billing events", value: api.partner_billing_events },
          { label: "Overage approvals pending", value: api.overage_approvals_pending },
          { label: "Rate-limit violations",  value: api.rate_limit_violations },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Partner billing events</h3>
          <div className="mt-2">
            <SimpleTable rows={events} columns={[
              { key: "ts",       label: "Time" },
              { key: "partner",  label: "Partner" },
              { key: "event",    label: "Event" },
              { key: "units",    label: "Units" },
            ]} />
          </div>
        </Card>
      </V65Page>
    );
  },
});
