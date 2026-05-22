import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const m = H.useMarketplaceQualityGovernance();
  return (
    <V95Page icon={<Sparkles className="size-6 text-cyan-300" />} title="Marketplace Quality Governance" blurb="Carrier verification, preferred program, watchlist, suspension/reinstatement, dispute review, fee review, T&S policies.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Governance areas</h3>
        <div className="mt-2">
          <SimpleTable rows={m.areas as any} columns={[
            { key: "area", label: "Area" }, { key: "owner", label: "Owner" },
            { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Carrier tiers</h3>
        <div className="mt-2">
          <SimpleTable rows={m.tiers as any} columns={[
            { key: "tier", label: "Tier" },
            { key: "carriers", label: "Carriers" },
            { key: "share", label: "Volume share %", render: (r: any) => `${r.share}%` },
          ]} />
        </div>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/mp-quality")({
  head: () => ({ meta: [{ title: "MP Quality · Anderoute V9.5" }] }),
  component: Page,
});
