import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const c = H.useMarketplaceProofCommercialization();
  return (
    <V105Page icon={<BookOpen className="size-6 text-fuchsia-300" />} title="Marketplace Proof Commercialization" blurb="Coverage, bid density, quality, compliance, regional liquidity proof — approved before external use.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">MP proof library</h3>
        <SimpleTable rows={c.proofs as any} columns={[
          { key: "id", label: "ID" }, { key: "proof", label: "Proof" }, { key: "region", label: "Region" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/mp-proof")({
  head: () => ({ meta: [{ title: "MP Proof · V10.5" }] }),
  component: Page,
});
