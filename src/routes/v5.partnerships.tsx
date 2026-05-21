import { createFileRoute } from "@tanstack/react-router";
import { Handshake } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { PARTNERS } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/partnerships")({
  head: () => ({ meta: [{ title: "Strategic Partnerships · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<Handshake className="size-6 text-fuchsia-300" />} title="Strategic Partnership Execution Board"
      blurb="Integration, security, legal-placeholder, and joint GTM status for each strategic partner with milestone, revenue opportunity, and blockers.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Partners</h3>
        <div className="mt-2">
          <SimpleTable rows={PARTNERS} columns={[
            { key: "name",     label: "Partner" },
            { key: "category", label: "Category" },
            { key: "sponsor",  label: "Sponsor" },
            { key: "status",   label: "Status",  render: r => <StatusPill status={r.status} /> },
            { key: "gtm",      label: "GTM",     render: r => <StatusPill status={r.gtm} /> },
            { key: "launch",   label: "Launch" },
            { key: "revenue",  label: "Rev opp" },
          ]} />
        </div>
      </Card>
    </V5Page>
  ),
});
