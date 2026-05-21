import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { ScoreCard, KpiGrid } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { useCategoryDefiningPlatform, useIntelligentLogisticsNetwork, useMarketplaceLiquidityIntelligence, usePlatformEconomics } from "@/v6/hooks";

export const Route = createFileRoute("/v6/overview")({
  head: () => ({ meta: [{ title: "V6 Overview · Anderoute" }] }),
  component: () => {
    const { scores } = useCategoryDefiningPlatform();
    const { health, volume } = useIntelligentLogisticsNetwork();
    const { liquidity } = useMarketplaceLiquidityIntelligence();
    const { economics } = usePlatformEconomics();
    return (
      <V6Page icon={<Gauge className="size-6 text-emerald-300" />} title="Anderoute V6 — Category-Defining Platform"
        blurb="Intelligent logistics network spanning dispatch, EliteNav driver GPS, CoPilot AI ops, marketplace, API/EDI, telematics, enterprise governance, board reporting and category-leading defensibility.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Category leadership" value={scores.overall} tone="emerald" />
          <ScoreCard label="Defensibility" value={scores.defensibility} tone="violet" />
          <ScoreCard label="Network health" value={health} tone="sky" />
          <ScoreCard label="Liquidity" value={liquidity.score} tone="amber" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Active companies", value: volume.companies },
          { label: "Active drivers", value: volume.drivers.toLocaleString() },
          { label: "ARR (placeholder)", value: `$${economics.total_arr_pl}M` },
          { label: "NRR (pl)", value: `${economics.nrr_pl}%` },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
          <h2 className="font-semibold">Jump in</h2>
          <ul className="mt-2 grid gap-1 text-muted-foreground md:grid-cols-3">
            <li>· <Link to="/v6/category" className="text-emerald-300 hover:underline">Category Platform</Link></li>
            <li>· <Link to="/v6/network" className="text-emerald-300 hover:underline">Logistics Network</Link></li>
            <li>· <Link to="/v6/liquidity" className="text-emerald-300 hover:underline">Liquidity Intelligence</Link></li>
            <li>· <Link to="/v6/economics" className="text-emerald-300 hover:underline">Platform Economics</Link></li>
            <li>· <Link to="/v6/board" className="text-emerald-300 hover:underline">Board OS</Link></li>
            <li>· <Link to="/v6/exit-readiness" className="text-emerald-300 hover:underline">Exit/IPO Readiness</Link></li>
            <li>· <Link to="/v6/demo" className="text-emerald-300 hover:underline">Demo Flow</Link></li>
          </ul>
        </Card>
      </V6Page>
    );
  },
});
