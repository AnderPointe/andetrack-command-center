import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const p = H.useProductLineCommercialization();
  return (
    <V105Page icon={<Boxes className="size-6 text-fuchsia-300" />} title="Product-Line Commercialization" blurb="Commercial, demo, proof, pricing readiness per product line — with commercial risk.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Product lines</h3>
        <SimpleTable rows={p.lines as any} columns={[
          { key: "line", label: "Line" },
          { key: "commercial", label: "Commercial", render: (r: any) => `${r.commercial}%` },
          { key: "demo",       label: "Demo",       render: (r: any) => `${r.demo}%` },
          { key: "proof",      label: "Proof",      render: (r: any) => `${r.proof}%` },
          { key: "pricing",    label: "Pricing",    render: (r: any) => `${r.pricing}%` },
          { key: "risk",       label: "Risk",       render: (r: any) => <StatusPill status={r.risk} /> },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/product-lines")({
  head: () => ({ meta: [{ title: "Product Lines · V10.5" }] }),
  component: Page,
});
