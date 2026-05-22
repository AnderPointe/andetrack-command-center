import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { ScoreCard } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const m = H.useMarketplaceMonetizationOpt().summary;
  return (
    <V115Page icon={<Megaphone className="size-6 text-emerald-300" />} title="Marketplace Monetization Optimization" blurb="Take-rate steering, GMV, and active buyers/sellers. Mock-only.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Take rate"      value={`${m.take_rate_pct}% / ${m.target_pct}%`} tone="emerald" />
        <ScoreCard label="GMV QTD"        value={`$${(m.gmv_qtd_usd/1_000_000).toFixed(1)}M`} tone="sky" />
        <ScoreCard label="Active buyers"  value={m.active_buyers} tone="violet" />
        <ScoreCard label="Active sellers" value={m.active_sellers} tone="amber" />
      </div>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/marketplace")({
  head: () => ({ meta: [{ title: "MP Monetization · V11.5" }] }),
  component: Page,
});
