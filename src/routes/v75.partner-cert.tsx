import { createFileRoute } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useInternationalPartnerCertification } from "@/v75/hooks";

export const Route = createFileRoute("/v75/partner-cert")({
  head: () => ({ meta: [{ title: "Partner Certification Placeholder · V7.5 · Anderoute" }] }),
  component: () => {
    const { checks, summary } = useInternationalPartnerCertification();
    return (
      <V75Page icon={<Award className="size-6 text-indigo-300" />} title="International Partner Certification Placeholder"
        blurb="Placeholder only — no formal certification asserted. Tracks security, compliance, technical, support, documentation, regional, data handling, SLA, incident contact, customer-facing approval.">
        <KpiGrid cols={5} items={[
          { label: "Total checks", value: summary.total },
          { label: "Passing",      value: summary.passing },
          { label: "In progress",  value: summary.in_progress },
          { label: "Todo",         value: summary.todo },
          { label: "Status",       value: <StatusPill status={summary.status} />, sub: "No cert asserted" },
        ]} />

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={checks as any} columns={[
            { key: "check",  label: "Check" },
            { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
