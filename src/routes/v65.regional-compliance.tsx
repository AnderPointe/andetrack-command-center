import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { SimpleTable, StatusPill } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { useRegionalComplianceReadiness } from "@/v65/hooks";

export const Route = createFileRoute("/v65/regional-compliance")({
  head: () => ({ meta: [{ title: "Regional Compliance Readiness · V6.5 · Anderoute" }] }),
  component: () => {
    const { regions } = useRegionalComplianceReadiness();
    return (
      <V65Page icon={<FileCheck2 className="size-6 text-cyan-300" />} title="Regional Compliance Readiness"
        blurb="Placeholder — does not assert regulatory compliance. Tracks research status, privacy / transport / billing-tax posture, data residency and legal review by region.">
        <Card className="border-amber-400/30 bg-amber-500/[0.04] p-3 text-xs text-amber-200">
          Placeholder: requires legal counsel review per region before any market entry.
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={regions} columns={[
            { key: "region",    label: "Region" },
            { key: "country",   label: "Country" },
            { key: "research",  label: "Research", render: (r) => <StatusPill status={r.research} /> },
            { key: "privacy",   label: "Privacy" },
            { key: "transport", label: "Transport" },
            { key: "risk",      label: "Risk",     render: (r) => <StatusPill status={r.risk} /> },
          ]} />
        </Card>
      </V65Page>
    );
  },
});
