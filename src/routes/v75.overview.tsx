import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { ScoreCard, KpiGrid } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useV75Scope, useGlobalExpansionExecution, useAdvancedFinancialAuditReadiness, useGlobalMarketplaceDiscipline } from "@/v75/hooks";

export const Route = createFileRoute("/v75/overview")({
  head: () => ({ meta: [{ title: "V7.5 Overview · Anderoute" }] }),
  component: () => {
    const { score } = useV75Scope();
    const { countries, blockers } = useGlobalExpansionExecution();
    const { audit } = useAdvancedFinancialAuditReadiness();
    const { discipline } = useGlobalMarketplaceDiscipline();
    return (
      <V75Page icon={<Gauge className="size-6 text-indigo-300" />} title="Anderoute V7.5 — Global Expansion Execution"
        blurb="Controlled country pilots, regulated customer onboarding, advanced financial audit readiness, international partner launches, regional marketplace activation, and executive global launch governance. No compliance/audit/autonomous claims.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Execution readiness"  value={score.overall} tone="sky" />
          <ScoreCard label="Financial audit"      value={audit.score}    tone="amber" />
          <ScoreCard label="Marketplace discipline" value={discipline.score} tone="emerald" />
          <ScoreCard label="Open blockers"        value={blockers.length} tone="rose" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Countries tracked",  value: countries.length },
          { label: "In pilot",           value: countries.filter(c => c.phase === "Controlled Pilot").length },
          { label: "In planning",        value: countries.filter(c => c.phase === "Planning").length },
          { label: "In research",        value: countries.filter(c => c.phase === "Research").length },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
          <h2 className="font-semibold">Jump in</h2>
          <ul className="mt-2 grid gap-1 text-muted-foreground md:grid-cols-3">
            <li>· <Link to="/v75/expansion" className="text-indigo-300 hover:underline">Expansion execution</Link></li>
            <li>· <Link to="/v75/country-launch" className="text-indigo-300 hover:underline">Country launches</Link></li>
            <li>· <Link to="/v75/regulated-onboarding" className="text-indigo-300 hover:underline">Regulated onboarding</Link></li>
            <li>· <Link to="/v75/financial-audit" className="text-indigo-300 hover:underline">Financial audit</Link></li>
            <li>· <Link to="/v75/launch-governance" className="text-indigo-300 hover:underline">Launch governance</Link></li>
            <li>· <Link to="/v75/demo" className="text-indigo-300 hover:underline">Demo flow</Link></li>
          </ul>
        </Card>
      </V75Page>
    );
  },
});
