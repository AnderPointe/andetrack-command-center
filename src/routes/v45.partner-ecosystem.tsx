import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { KpiGrid, SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { PARTNER_ECOSYSTEM } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/partner-ecosystem")({
  head: () => ({ meta: [{ title: "Partner Ecosystem · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Network className="size-6 text-violet-300" />} title="Partner Ecosystem Management"
      blurb="Active, integration, revenue, and strategic partners with health and revenue contribution. SLAs and certifications are placeholders.">
      <KpiGrid cols={5} items={[
        { label: "Total", value: PARTNER_ECOSYSTEM.total_partners },
        { label: "Active", value: PARTNER_ECOSYSTEM.active },
        { label: "Integration", value: PARTNER_ECOSYSTEM.integration },
        { label: "Revenue", value: PARTNER_ECOSYSTEM.revenue },
        { label: "Strategic", value: PARTNER_ECOSYSTEM.strategic },
      ]} />
      <SimpleTable rows={PARTNER_ECOSYSTEM.partners} columns={[
        { key: "name", label: "Partner" },
        { key: "type", label: "Type" },
        { key: "health", label: "Health", render: r => `${r.health}` },
        { key: "revenue_share", label: "Revenue share", render: r => `$${r.revenue_share.toLocaleString()}` },
        { key: "status", label: "Status", render: r => <StatusPill status={r.status} /> },
      ]} />
    </V45Page>
  ),
});
