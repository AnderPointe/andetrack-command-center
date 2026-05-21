import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { CUSTOMER_HEALTH } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/customer-success")({
  head: () => ({ meta: [{ title: "Customer Success · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<HeartPulse className="size-6 text-fuchsia-300" />} title="Mature Customer Success"
      blurb="Health, adoption, sponsor engagement, QBR status, and renewal readiness for the enterprise book.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Customer health command center</h3>
        <div className="mt-2">
          <SimpleTable rows={CUSTOMER_HEALTH} columns={[
            { key: "customer", label: "Customer" },
            { key: "health",   label: "Health" },
            { key: "adoption", label: "Adoption" },
            { key: "sponsor",  label: "Sponsor",  render: r => <StatusPill status={r.sponsor} /> },
            { key: "qbr",      label: "QBR",      render: r => <StatusPill status={r.qbr} /> },
            { key: "renewal",  label: "Renewal",  render: r => <StatusPill status={r.renewal} /> },
          ]} />
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
        Success plans, renewal-readiness, and expansion playbooks open from each account (mock).
      </Card>
    </V5Page>
  ),
});
