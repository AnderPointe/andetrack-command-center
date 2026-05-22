import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const p = H.usePartnerChannelOptimization();
  const sourced = p.partners.reduce((s, r) => s + r.sourced_usd, 0);
  const influenced = p.partners.reduce((s, r) => s + r.influenced_usd, 0);
  return (
    <V125Page icon={<Network className="size-6 text-teal-300" />} title="Partner Channel Optimization Center" blurb="Sourced / influenced pipeline, enablement, attribution, expansion opportunity per partner.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Optimization"  value={p.score} tone="emerald" />
        <ScoreCard label="Partners"      value={p.partners.length} tone="sky" />
        <ScoreCard label="Sourced"       value={`$${(sourced / 1e6).toFixed(1)}M`} tone="violet" />
        <ScoreCard label="Influenced"    value={`$${(influenced / 1e6).toFixed(1)}M`} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4 overflow-x-auto">
        <h3 className="text-sm font-semibold">Partner performance matrix</h3>
        <SimpleTable rows={p.partners as any} columns={[
          { key: "partner", label: "Partner" }, { key: "sourced_usd", label: "Sourced", render: (r: any) => `$${(r.sourced_usd / 1e6).toFixed(1)}M` }, { key: "influenced_usd", label: "Influenced", render: (r: any) => `$${(r.influenced_usd / 1e6).toFixed(1)}M` }, { key: "enablement", label: "Enable" }, { key: "certification", label: "Cert" }, { key: "support", label: "Support" }, { key: "attribution", label: "Attrib" }, { key: "conv_pct", label: "Conv %" }, { key: "risk", label: "Risk" }, { key: "expansion", label: "Expand" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Enablement gaps</h3>
        <SimpleTable rows={p.enablement_gaps as any} columns={[{ key: "partner", label: "Partner" }, { key: "gap", label: "Gap" }, { key: "owner", label: "Owner" }]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Action plan</h3>
        <SimpleTable rows={p.action_plan as any} columns={[{ key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "impact", label: "Impact" }]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/partner-opt")({
  head: () => ({ meta: [{ title: "Partner Optimization · V12.5" }] }),
  component: Page,
});
