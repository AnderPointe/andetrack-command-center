import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useReportsV75 } from "@/v75/hooks";

export const Route = createFileRoute("/v75/reports")({
  head: () => ({ meta: [{ title: "V7.5 Reports · Anderoute" }] }),
  component: () => {
    const { reports } = useReportsV75();
    return (
      <V75Page icon={<FileBarChart className="size-6 text-indigo-300" />} title="Global Launch Reporting"
        blurb="17 V7.5 reports across expansion, country launch, regulated onboarding, financial audit, partner launch, marketplace, residency, support, compliance, risk, governance, cadence.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={reports as any} columns={[
            { key: "name",   label: "Report" },
            { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
