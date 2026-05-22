import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { ScoreCard } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const a = H.useApiEdiMonetizationOpt().summary;
  return (
    <V115Page icon={<Briefcase className="size-6 text-emerald-300" />} title="API / EDI Monetization Optimization" blurb="Metered tier ARR and overage share steering. Mock-only.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="API ARR"          value={`$${(a.api_arr_usd/1000).toFixed(0)}k / $${(a.api_arr_target/1000).toFixed(0)}k`} tone="emerald" />
        <ScoreCard label="EDI ARR"          value={`$${(a.edi_arr_usd/1000).toFixed(0)}k / $${(a.edi_arr_target/1000).toFixed(0)}k`} tone="sky" />
        <ScoreCard label="Overage share"    value={`${a.metered_overage_share_pct}%`} tone="violet" />
      </div>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/api-edi")({
  head: () => ({ meta: [{ title: "API/EDI Monetization · V11.5" }] }),
  component: Page,
});
