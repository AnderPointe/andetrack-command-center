import { createFileRoute } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { CARRIER_TIERS, PREFERRED_CARRIERS } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/carrier-quality")({
  head: () => ({ meta: [{ title: "Carrier Quality · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<Award className="size-6 text-fuchsia-300" />} title="Carrier Quality Program"
      blurb="Tiering, preferred carriers, watchlist and suspension reviews. Quality recommendations are human-approved.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Tier rollup</h3>
        <div className="mt-2">
          <SimpleTable rows={CARRIER_TIERS} columns={[
            { key: "tier",         label: "Tier", render: r => <StatusPill status={r.tier} /> },
            { key: "count",        label: "Carriers" },
            { key: "otp",          label: "OTP %" },
            { key: "dispute_rate", label: "Dispute %" },
          ]} />
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Preferred carriers</h3>
        <div className="mt-2">
          <SimpleTable rows={PREFERRED_CARRIERS} columns={[
            { key: "name",    label: "Carrier" },
            { key: "tier",    label: "Tier", render: r => <StatusPill status={r.tier} /> },
            { key: "otp",     label: "OTP %" },
            { key: "regions", label: "Regions" },
          ]} />
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
        Improvement plans and recognition awards open as a tier action (mock).
      </Card>
    </V5Page>
  ),
});
