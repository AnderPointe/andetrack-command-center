import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { Card } from "@/components/ui/card";
import {
  V45_MATURITY, V45_FEATURE_MATRIX, APPROVAL_QUEUE, MARKETPLACE_OPS,
  SOC2_READINESS, MOBILE_LAUNCH, ACQUISITION_READINESS, DEMO_HIGHLIGHTS,
} from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/overview")({
  head: () => ({ meta: [{ title: "V4.5 Overview · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Gauge className="size-6 text-violet-300" />} title="V4.5 Operational Maturity"
      blurb="Human-approved automation, national marketplace ops, certification execution, mobile launch, acquisition readiness, and a national operating model. Mock data — no autonomous dispatch.">
      <KpiGrid cols={6} items={DEMO_HIGHLIGHTS} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Overall maturity" value={V45_MATURITY.overall} tone="violet" />
        <ScoreCard label="Automation" value={V45_MATURITY.automation} tone="sky" />
        <ScoreCard label="Marketplace ops" value={V45_MATURITY.marketplace_ops} tone="emerald" />
        <ScoreCard label="Mobile launch" value={V45_MATURITY.mobile_launch} tone="sky" />
        <ScoreCard label="SOC 2 execution" value={V45_MATURITY.soc2_execution} tone="amber" />
        <ScoreCard label="Acquisition" value={V45_MATURITY.acquisition} tone="amber" />
        <ScoreCard label="Customer success" value={V45_MATURITY.customer_success} tone="emerald" />
        <ScoreCard label="Support" value={V45_MATURITY.support} tone="emerald" />
        <ScoreCard label="AI governance" value={V45_MATURITY.ai_governance} tone="sky" />
        <ScoreCard label="Revenue ops" value={V45_MATURITY.revenue_ops} tone="emerald" />
        <ScoreCard label="Partner ecosystem" value={V45_MATURITY.partner_ecosystem} tone="amber" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Today's command bar</h3>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>· <Link to="/v45/approvals" className="text-violet-300 hover:underline">{APPROVAL_QUEUE.filter(a=>a.status==="pending").length} approvals</Link> waiting on humans</li>
            <li>· <Link to="/v45/disputes" className="text-violet-300 hover:underline">{MARKETPLACE_OPS.disputes_open} marketplace disputes</Link> open</li>
            <li>· <Link to="/v45/soc2" className="text-violet-300 hover:underline">SOC 2 readiness {SOC2_READINESS}%</Link></li>
            <li>· <Link to="/v45/mobile-launch" className="text-violet-300 hover:underline">Mobile launch iOS {MOBILE_LAUNCH.ios}% · Android {MOBILE_LAUNCH.android}%</Link></li>
            <li>· <Link to="/v45/acquisition" className="text-violet-300 hover:underline">Acquisition {ACQUISITION_READINESS.overall}%</Link></li>
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Feature matrix</h3>
          <div className="mt-2">
            <SimpleTable rows={V45_FEATURE_MATRIX} columns={[
              { key: "area", label: "Area" },
              { key: "ga", label: "Status", render: r => <StatusPill status={r.ga} /> },
              { key: "notes", label: "Notes" },
            ]} />
          </div>
        </Card>
      </div>
    </V45Page>
  ),
});
