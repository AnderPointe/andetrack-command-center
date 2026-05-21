import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { ScoreCard, KpiGrid } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { usePlatformOperatingSystem, useEnterpriseFinancialControls, useGlobalExpansionReadiness, useAdvancedPartnerMarketplace } from "@/v65/hooks";

export const Route = createFileRoute("/v65/overview")({
  head: () => ({ meta: [{ title: "V6.5 Overview · Anderoute" }] }),
  component: () => {
    const { score } = usePlatformOperatingSystem();
    const { controls } = useEnterpriseFinancialControls();
    const { countries } = useGlobalExpansionReadiness();
    const { listings } = useAdvancedPartnerMarketplace();
    const globalAvg = Math.round(countries.reduce((s, c) => s + c.score, 0) / countries.length);
    const partnerHealth = Math.round((listings.filter(l => l.status === "approved").length / listings.length) * 100);
    return (
      <V65Page icon={<Gauge className="size-6 text-cyan-300" />} title="Anderoute V6.5 — Strategic Operating Maturity"
        blurb="Enterprise operating system for logistics networks: executive governance, financial controls, global expansion planning, mature marketplace economics, partner marketplace expansion, advanced compliance tracking, and board-level oversight.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Strategic operating" value={score.overall} tone="emerald" />
          <ScoreCard label="Financial controls" value={controls.score} tone="amber" />
          <ScoreCard label="Global readiness" value={globalAvg} tone="sky" />
          <ScoreCard label="Partner ecosystem" value={partnerHealth} tone="violet" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Operating areas tracked", value: score.byArea.length },
          { label: "Approved partners",       value: listings.filter(l => l.status === "approved").length },
          { label: "Countries evaluated",     value: countries.length },
          { label: "Open exec actions",       value: 5 },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
          <h2 className="font-semibold">Jump in</h2>
          <ul className="mt-2 grid gap-1 text-muted-foreground md:grid-cols-3">
            <li>· <Link to="/v65/platform-os" className="text-cyan-300 hover:underline">Platform OS</Link></li>
            <li>· <Link to="/v65/financial-controls" className="text-cyan-300 hover:underline">Financial Controls</Link></li>
            <li>· <Link to="/v65/global" className="text-cyan-300 hover:underline">Global Expansion</Link></li>
            <li>· <Link to="/v65/partner-marketplace" className="text-cyan-300 hover:underline">Partner Marketplace</Link></li>
            <li>· <Link to="/v65/governance" className="text-cyan-300 hover:underline">Governance</Link></li>
            <li>· <Link to="/v65/demo" className="text-cyan-300 hover:underline">Demo Flow</Link></li>
          </ul>
        </Card>
      </V65Page>
    );
  },
});
