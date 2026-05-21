import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useInternationalCarrierOperations } from "@/v8/hooks";

export const Route = createFileRoute("/v8/carrier-ops")({
  head: () => ({ meta: [{ title: "International Carrier Operations · Anderoute" }] }),
  component: () => {
    const { carriers, rules } = useInternationalCarrierOperations();
    return (
      <V8Page icon={<Truck className="size-6 text-violet-300" />} title="International Carrier Operations"
        blurb="Country onboarding, verification, compliance, equipment, coverage, eligibility, quality, and exception queue.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={carriers as any} columns={[
            { key: "carrier", label: "Carrier" },
            { key: "country", label: "Country" },
            { key: "status",  label: "Status" },
            { key: "compliance", label: "Compliance" },
            { key: "equipment",  label: "Equipment" },
            { key: "coverage",   label: "Coverage" },
            { key: "marketplace", label: "Marketplace" },
            { key: "quality",     label: "Quality" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Carrier country eligibility rules</h3>
          <SimpleTable rows={rules as any} columns={[
            { key: "country", label: "Country" },
            { key: "rule",    label: "Rule" },
            { key: "enforced", label: "Enforced", render: (r: any) => (r.enforced ? "yes" : "no") },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
