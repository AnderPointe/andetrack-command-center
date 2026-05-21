import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { SimpleTable, StatusPill } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { useRiskControlMatrix } from "@/v65/hooks";

export const Route = createFileRoute("/v65/risk-matrix")({
  head: () => ({ meta: [{ title: "Risk + Controls · V6.5 · Anderoute" }] }),
  component: () => {
    const { rows } = useRiskControlMatrix();
    return (
      <V65Page icon={<ShieldAlert className="size-6 text-cyan-300" />} title="Risk + Control Matrix"
        blurb="Financial, security, compliance, operational, marketplace, AI, data, mobile, integration, partner, revenue, customer, legal placeholders — owners, frequency, last test, evidence, remediation.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={rows as any} columns={[
            { key: "category",    label: "Category" },
            { key: "risk",        label: "Risk" },
            { key: "owner",       label: "Owner" },
            { key: "freq",        label: "Freq" },
            { key: "last_tested", label: "Last tested" },
            { key: "result",      label: "Result", render: (r: any) => <StatusPill status={r.result} /> },
            { key: "remediation", label: "Remediation" },
          ]} />
        </Card>
      </V65Page>
    );
  },
});
