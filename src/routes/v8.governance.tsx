import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable, KpiGrid } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useExecutiveStrategicGovernance } from "@/v8/hooks";

export const Route = createFileRoute("/v8/governance")({
  head: () => ({ meta: [{ title: "Executive Strategic Governance · Anderoute" }] }),
  component: () => {
    const { decisions, summary } = useExecutiveStrategicGovernance();
    return (
      <V8Page icon={<Crown className="size-6 text-violet-300" />} title="Executive Strategic Governance"
        blurb="Decision queue, approval workflow, exception board, and action tracker — every strategic move is human-approved.">
        <KpiGrid cols={4} items={[
          { label: "Open decisions",    value: summary.open },
          { label: "Oldest open (days)", value: summary.oldest_days },
          { label: "Approved (30d)",    value: summary.approved_30d },
          { label: "Exceptions open",   value: summary.exceptions_open },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={decisions as any} columns={[
            { key: "id",      label: "ID" },
            { key: "kind",    label: "Kind" },
            { key: "subject", label: "Subject" },
            { key: "owner",   label: "Owner" },
            { key: "status",  label: "Status" },
            { key: "due",     label: "Due" },
            { key: "oldest_days", label: "Open d" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
