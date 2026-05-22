import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const a = H.useAPIEDIRevenueIntelligence();
  return (
    <V125Page icon={<Briefcase className="size-6 text-teal-300" />} title="API/EDI Revenue Intelligence" blurb="Metered API + EDI placeholder revenue, expansion opportunity, support burden, revenue risk.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Intel score"      value={a.score} tone="emerald" />
        <ScoreCard label="API rev (plchldr)" value={`$${(a.api.revenue_usd_placeholder / 1e3).toFixed(0)}k`} tone="sky" />
        <ScoreCard label="EDI rev (plchldr)" value={`$${(a.edi.revenue_usd_placeholder / 1e3).toFixed(0)}k`} tone="violet" />
        <ScoreCard label="Dev accounts"      value={a.api.dev_accounts} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">API metrics</h3>
        <ul className="grid gap-1 text-sm md:grid-cols-3">
          <li>Usage: {a.api.usage_calls_m}M calls</li>
          <li>Overages (plchldr): ${a.api.overages_usd_placeholder.toLocaleString()}</li>
          <li>Plan adoption: {a.api.plan_adoption_pct}%</li>
        </ul>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">EDI metrics (placeholder)</h3>
        <ul className="grid gap-1 text-sm md:grid-cols-3">
          <li>Txn volume: {a.edi.txn_volume_m}M</li>
          <li>Support tickets: {a.edi.support_tickets}</li>
        </ul>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Expansion opportunities</h3>
        <SimpleTable rows={a.expansion as any} columns={[{ key: "customer", label: "Customer" }, { key: "opp_usd", label: "Opp", render: (r: any) => `$${(r.opp_usd / 1e3).toFixed(0)}k` }, { key: "signal", label: "Signal" }]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Risks</h3>
        <SimpleTable rows={a.risks as any} columns={[{ key: "risk", label: "Risk" }, { key: "owner", label: "Owner" }, { key: "severity", label: "Severity" }]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/api-edi")({
  head: () => ({ meta: [{ title: "API/EDI Intel · V12.5" }] }),
  component: Page,
});
