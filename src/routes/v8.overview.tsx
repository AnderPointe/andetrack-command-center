import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { ScoreCard, KpiGrid, ExecBanner, SimpleTable, StatusPill } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import {
  useV8Scope, useGlobalOperatingNetworkScale, useFinancialControlMaturity,
  useAdvancedComplianceExecution, useExecutiveStrategicGovernance, useV8ExecHeadline,
} from "@/v8/hooks";

export const Route = createFileRoute("/v8/overview")({
  head: () => ({ meta: [{ title: "V8 Overview · Anderoute" }] }),
  component: () => {
    const { scale, metrics } = useGlobalOperatingNetworkScale();
    const { matrix } = useV8Scope();
    const { maturity } = useFinancialControlMaturity();
    const { summary: comp } = useAdvancedComplianceExecution();
    const { summary: dec } = useExecutiveStrategicGovernance();
    const headline = useV8ExecHeadline();
    return (
      <V8Page icon={<Gauge className="size-6 text-violet-300" />} title="Anderoute V8 — Global Operating Network Scale"
        blurb="Country-level operating execution, mature financial controls, international marketplace operations, advanced compliance execution, global partner & customer success, executive strategic governance. No final audit / compliance / autonomous claims.">
        <ExecBanner h={headline} />
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Global scale"           value={scale.score}             tone="sky" />
          <ScoreCard label="Financial maturity"     value={maturity.score}          tone="amber" />
          <ScoreCard label="Compliance execution"   value={comp.score}              tone="emerald" />
          <ScoreCard label="Open decisions"         value={dec.open}                tone="rose" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Countries active",    value: scale.countries_active,   sub: "USA" },
          { label: "Controlled pilots",   value: scale.countries_pilot,    sub: "Canada" },
          { label: "In planning",         value: scale.countries_planning, sub: "Mexico" },
          { label: "Research-stage",      value: scale.countries_research, sub: "EU, UK" },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Top network signals</h3>
          <SimpleTable rows={metrics.slice(0, 10) as any} columns={[
            { key: "metric", label: "Metric" },
            { key: "value",  label: "Value" },
            { key: "sub",    label: "Notes" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Scope status</h3>
          <SimpleTable rows={matrix as any} columns={[
            { key: "area",   label: "Area" },
            { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
            { key: "notes",  label: "Notes" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
          <h2 className="font-semibold">Jump in</h2>
          <ul className="mt-2 grid gap-1 text-muted-foreground md:grid-cols-3">
            <li>· <Link to="/v8/network-scale"      className="text-violet-300 hover:underline">Network scale</Link></li>
            <li>· <Link to="/v8/country-command"    className="text-violet-300 hover:underline">Country command</Link></li>
            <li>· <Link to="/v8/intl-marketplace"   className="text-violet-300 hover:underline">Intl marketplace</Link></li>
            <li>· <Link to="/v8/financial-maturity" className="text-violet-300 hover:underline">Financial maturity</Link></li>
            <li>· <Link to="/v8/governance"         className="text-violet-300 hover:underline">Strategic governance</Link></li>
            <li>· <Link to="/v8/demo"               className="text-violet-300 hover:underline">Demo flow</Link></li>
          </ul>
        </Card>
      </V8Page>
    );
  },
});
