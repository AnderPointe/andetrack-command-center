import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable, StatusPill } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalComplianceControls } from "@/v7/hooks";

export const Route = createFileRoute("/v7/compliance-matrix")({
  head: () => ({ meta: [{ title: "Compliance Matrix · V7 · Anderoute" }] }),
  component: () => {
    const { matrix, gaps } = useGlobalComplianceControls();
    return (
      <V7Page icon={<FileCheck2 className="size-6 text-indigo-300" />} title="Global Compliance Control Matrix"
        blurb="Region × control coverage. Compliance is NOT asserted complete — gaps are tracked openly.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Region × control matrix</h3>
          <div className="mt-2">
            <SimpleTable rows={matrix as any} columns={[
              { key: "region",      label: "Region" },
              { key: "privacy",     label: "Privacy",     render: (r: any) => <StatusPill status={r.privacy} /> },
              { key: "security",    label: "Security",    render: (r: any) => <StatusPill status={r.security} /> },
              { key: "financial",   label: "Financial",   render: (r: any) => <StatusPill status={r.financial} /> },
              { key: "marketplace", label: "Mkt",         render: (r: any) => <StatusPill status={r.marketplace} /> },
              { key: "ai",          label: "AI",          render: (r: any) => <StatusPill status={r.ai} /> },
              { key: "retention",   label: "Retention",   render: (r: any) => <StatusPill status={r.retention} /> },
              { key: "incident",    label: "Incident",    render: (r: any) => <StatusPill status={r.incident} /> },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Gap register + remediation plan</h3>
          <div className="mt-2">
            <SimpleTable rows={gaps as any} columns={[
              { key: "region",   label: "Region" },
              { key: "area",     label: "Area" },
              { key: "severity", label: "Severity", render: (r: any) => <StatusPill status={r.severity} /> },
              { key: "owner",    label: "Owner" },
              { key: "eta",      label: "ETA" },
            ]} />
          </div>
        </Card>
      </V7Page>
    );
  },
});
