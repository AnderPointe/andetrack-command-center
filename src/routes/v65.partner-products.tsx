import { createFileRoute } from "@tanstack/react-router";
import { PackagePlus } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { SimpleTable } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { usePartnerProductCatalog } from "@/v65/hooks";

export const Route = createFileRoute("/v65/partner-products")({
  head: () => ({ meta: [{ title: "Partner Products · V6.5 · Anderoute" }] }),
  component: () => {
    const { products } = usePartnerProductCatalog();
    return (
      <V65Page icon={<PackagePlus className="size-6 text-cyan-300" />} title="Partner Product Catalog"
        blurb="Partner products with integration type, pricing model placeholder, revenue share placeholder, certification status, customer eligibility.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={products} columns={[
            { key: "partner",      label: "Partner" },
            { key: "product",      label: "Product" },
            { key: "type",         label: "Integration" },
            { key: "pricing_pl",   label: "Pricing (pl)" },
            { key: "revshare_pl",  label: "Rev share (pl)" },
          ]} />
        </Card>
      </V65Page>
    );
  },
});
