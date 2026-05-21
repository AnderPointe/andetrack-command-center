import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalProductAdoption } from "@/v8/hooks";

export const Route = createFileRoute("/v8/adoption")({
  head: () => ({ meta: [{ title: "Global Product Adoption · Anderoute" }] }),
  component: () => {
    const { products, gaps } = useGlobalProductAdoption();
    return (
      <V8Page icon={<BarChart3 className="size-6 text-violet-300" />} title="Global Product Adoption Dashboard"
        blurb="Country/region adoption across Dispatch, EliteNav, mobile, customer portal, CoPilot, marketplace, API, EDI, telematics, reports, enterprise governance, and partner marketplace.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={products as any} columns={[
            { key: "product", label: "Product" },
            { key: "USA",     label: "USA" },
            { key: "Canada",  label: "Canada" },
            { key: "Mexico",  label: "Mexico" },
            { key: "EU",      label: "EU" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Adoption gaps</h3>
          <SimpleTable rows={gaps as any} columns={[
            { key: "gap",   label: "Gap" },
            { key: "owner", label: "Owner" },
            { key: "recommendation", label: "Recommendation" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
