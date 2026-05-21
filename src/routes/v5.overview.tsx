import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { KpiGrid, ScoreCard, SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import {
  V5_MATURITY, V5_FEATURE_MATRIX, LIQUIDITY, CERT_COMPLETION,
  DEMO_HIGHLIGHTS, BOARD_RISKS,
} from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/overview")({
  head: () => ({ meta: [{ title: "V5 Overview · Anderoute" }] }),
  component: () => (
    <V5Page icon={<Gauge className="size-6 text-fuchsia-300" />} title="V5 National-Scale Maturity"
      blurb="Marketplace liquidity, certification execution, executive reporting, category leadership, mature revenue/CS/support, governance, growth and data-room readiness. All mock — no autonomous dispatch, no claimed certifications.">
      <KpiGrid cols={6} items={DEMO_HIGHLIGHTS} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Overall maturity"      value={V5_MATURITY.overall}      tone="violet"  />
        <ScoreCard label="Product"               value={V5_MATURITY.product}      tone="emerald" />
        <ScoreCard label="Marketplace"           value={V5_MATURITY.marketplace}  tone="sky"     />
        <ScoreCard label="Revenue"               value={V5_MATURITY.revenue}      tone="emerald" />
        <ScoreCard label="Customer success"      value={V5_MATURITY.customer_success} tone="emerald" />
        <ScoreCard label="Support"               value={V5_MATURITY.support}      tone="emerald" />
        <ScoreCard label="Compliance"            value={V5_MATURITY.compliance}   tone="amber"   />
        <ScoreCard label="Security"              value={V5_MATURITY.security}     tone="sky"     />
        <ScoreCard label="Mobile"                value={V5_MATURITY.mobile}       tone="sky"     />
        <ScoreCard label="Integration"           value={V5_MATURITY.integration}  tone="emerald" />
        <ScoreCard label="Partner"               value={V5_MATURITY.partner}      tone="amber"   />
        <ScoreCard label="Category leadership"   value={V5_MATURITY.category_leadership} tone="amber" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Today's command bar</h3>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>· <Link to="/v5/liquidity"     className="text-fuchsia-300 hover:underline">Liquidity {LIQUIDITY.score}%</Link> · {LIQUIDITY.uncovered} uncovered loads</li>
            <li>· <Link to="/v5/certification" className="text-fuchsia-300 hover:underline">SOC 2 {CERT_COMPLETION.soc2}%</Link> complete</li>
            <li>· <Link to="/v5/board"         className="text-fuchsia-300 hover:underline">{BOARD_RISKS.length} strategic risks</Link> tracked</li>
            <li>· <Link to="/v5/supply-demand" className="text-fuchsia-300 hover:underline">Carrier recruiting</Link> recommended for SE</li>
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Feature matrix</h3>
          <div className="mt-2">
            <SimpleTable rows={V5_FEATURE_MATRIX} columns={[
              { key: "area",  label: "Area" },
              { key: "ga",    label: "Status", render: r => <StatusPill status={r.ga} /> },
              { key: "notes", label: "Notes" },
            ]} />
          </div>
        </Card>
      </div>
    </V5Page>
  ),
});
