import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { ScoreCard, KpiGrid } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import {
  useGlobalOperatingReadiness, useGlobalLogisticsNetwork,
  usePlatformFinancialMaturity, useMarketplaceTrustSafetyMaturity,
} from "@/v7/hooks";

export const Route = createFileRoute("/v7/overview")({
  head: () => ({ meta: [{ title: "V7 Overview · Anderoute" }] }),
  component: () => {
    const { score } = useGlobalOperatingReadiness();
    const { metrics, regional } = useGlobalLogisticsNetwork();
    const { maturity } = usePlatformFinancialMaturity();
    const { summary } = useMarketplaceTrustSafetyMaturity();
    return (
      <V7Page icon={<Gauge className="size-6 text-indigo-300" />} title="Anderoute V7 — Global Logistics Operating Network"
        blurb="Global-ready operating network: regulated controls, advanced marketplace intelligence, platform financial maturity, global partner ecosystem, country readiness planning. Compliance / audit / autonomous claims are NOT asserted.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Global readiness"    value={score.overall}     tone="sky" />
          <ScoreCard label="Financial maturity"  value={maturity.score}    tone="amber" />
          <ScoreCard label="Trust + safety"      value={summary.score}     tone="emerald" />
          <ScoreCard label="Marketplace liquidity" value={metrics.marketplace_liquidity} tone="violet" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Countries tracked",  value: metrics.countries },
          { label: "Regions active",     value: metrics.regions },
          { label: "Active partners",    value: metrics.partners },
          { label: "Active shipments",   value: metrics.shipments.toLocaleString() },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
          <h2 className="font-semibold">Jump in</h2>
          <ul className="mt-2 grid gap-1 text-muted-foreground md:grid-cols-3">
            <li>· <Link to="/v7/network" className="text-indigo-300 hover:underline">Global network</Link></li>
            <li>· <Link to="/v7/country-matrix" className="text-indigo-300 hover:underline">Country matrix</Link></li>
            <li>· <Link to="/v7/regulated-controls" className="text-indigo-300 hover:underline">Regulated controls</Link></li>
            <li>· <Link to="/v7/marketplace-intel" className="text-indigo-300 hover:underline">Marketplace intel</Link></li>
            <li>· <Link to="/v7/exec-dashboard" className="text-indigo-300 hover:underline">Exec dashboard</Link></li>
            <li>· <Link to="/v7/demo" className="text-indigo-300 hover:underline">Demo flow</Link></li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">{regional.length} regions monitored.</p>
        </Card>
      </V7Page>
    );
  },
});
