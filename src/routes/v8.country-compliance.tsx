import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useCountryComplianceExecution } from "@/v8/hooks";

export const Route = createFileRoute("/v8/country-compliance")({
  head: () => ({ meta: [{ title: "Country Compliance Execution · Anderoute" }] }),
  component: () => {
    const { canada, regional } = useCountryComplianceExecution();
    return (
      <V8Page icon={<ShieldCheck className="size-6 text-violet-300" />} title="Country Compliance Execution Boards"
        blurb="Per-country control matrix, evidence status, exceptions, and legal review placeholders. Country-level legal completion is NOT asserted.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Canada — control matrix</h3>
          <SimpleTable rows={canada as any} columns={[
            { key: "control", label: "Control" },
            { key: "status",  label: "Status" },
            { key: "evidence", label: "Evidence" },
            { key: "owner",   label: "Owner" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Regional score</h3>
          <SimpleTable rows={regional as any} columns={[
            { key: "region", label: "Region" },
            { key: "score",  label: "Score" },
            { key: "owner",  label: "Owner" },
            { key: "evidence", label: "Evidence" },
            { key: "exceptions", label: "Exceptions" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
