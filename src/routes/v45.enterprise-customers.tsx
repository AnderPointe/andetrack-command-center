import { createFileRoute } from "@tanstack/react-router";
import { Users2 } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { ENTERPRISE_CUSTOMERS } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/enterprise-customers")({
  head: () => ({ meta: [{ title: "Enterprise Customers · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Users2 className="size-6 text-violet-300" />} title="Enterprise Customer Maturity"
      blurb="Onboarding, adoption, integration, reporting, sponsorship, renewal and expansion readiness per enterprise account.">
      <SimpleTable rows={ENTERPRISE_CUSTOMERS} columns={[
        { key: "name", label: "Account" },
        { key: "sponsor", label: "Sponsor" },
        { key: "onboarding", label: "Onboarding" },
        { key: "adoption", label: "Adoption" },
        { key: "support", label: "Support" },
        { key: "integration", label: "Integration" },
        { key: "reporting", label: "Reporting" },
        { key: "risk", label: "Risk", render: r => <StatusPill status={r.risk} /> },
        { key: "renewal", label: "Renewal", render: r => <StatusPill status={r.renewal} /> },
        { key: "expansion", label: "Expansion", render: r => <StatusPill status={r.expansion} /> },
      ]} />
    </V45Page>
  ),
});
