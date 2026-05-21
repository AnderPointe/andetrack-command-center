import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalComplianceControlExecution } from "@/v75/hooks";

export const Route = createFileRoute("/v75/compliance")({
  head: () => ({ meta: [{ title: "Global Compliance Control Execution · V7.5 · Anderoute" }] }),
  component: () => {
    const { controls } = useGlobalComplianceControlExecution();
    return (
      <V75Page icon={<FileCheck2 className="size-6 text-indigo-300" />} title="Global Compliance Control Execution"
        blurb="Per-control owner, region, evidence needed/collected, test status, exception, remediation, next review, executive escalation.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={controls as any} columns={[
            { key: "control",            label: "Control" },
            { key: "owner",              label: "Owner" },
            { key: "region",             label: "Region" },
            { key: "evidence_collected", label: "Evidence", render: (r: any) => <StatusPill status={r.evidence_collected} /> },
            { key: "status",             label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
            { key: "exception",          label: "Exception" },
            { key: "next_review",        label: "Next review" },
            { key: "escalate",           label: "Escalate", render: (r: any) => r.escalate ? "Yes" : "No" },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
