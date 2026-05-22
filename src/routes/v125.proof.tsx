import { createFileRoute } from "@tanstack/react-router";
import { Stamp } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const p = H.useCommercialProofControls();
  const ready = p.filter((r) => r.freshness === "ready").length;
  const totalDeals = p.reduce((s, r) => s + r.used_in_deals, 0);
  const influence = p.reduce((s, r) => s + r.influence_usd_placeholder, 0);
  return (
    <V125Page icon={<Stamp className="size-6 text-teal-300" />} title="Commercial Proof Control Center" blurb="Approval, freshness, deal usage, revenue influence placeholder per proof asset.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Proof assets"  value={p.length} tone="sky" />
        <ScoreCard label="Fresh / ready" value={ready}    tone="emerald" />
        <ScoreCard label="Deal uses"     value={totalDeals} tone="violet" />
        <ScoreCard label="Influence (plchldr)" value={`$${(influence / 1e6).toFixed(1)}M`} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4 overflow-x-auto">
        <SimpleTable rows={p as any} columns={[
          { key: "asset", label: "Asset" }, { key: "type", label: "Type" }, { key: "customer", label: "Cust." }, { key: "legal", label: "Legal" }, { key: "security", label: "Sec" }, { key: "sales", label: "Sales" }, { key: "visibility", label: "Vis" }, { key: "expires", label: "Expires" }, { key: "used_in_deals", label: "Deals" }, { key: "freshness", label: "Fresh", render: (r: any) => <StatusPill status={r.freshness} /> }, { key: "risk", label: "Risk" },
        ]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/proof")({
  head: () => ({ meta: [{ title: "Proof Control · V12.5" }] }),
  component: Page,
});
