import { createFileRoute } from "@tanstack/react-router";
import { Headphones } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { ScoreCard, KpiGrid } from "@/components/v45/ui-bits";
import { SUPPORT_MATURITY } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/support")({
  head: () => ({ meta: [{ title: "Support · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Headphones className="size-6 text-violet-300" />} title="Support Operations Maturity"
      blurb="SLA compliance, escalation trend, KB coverage, and ticket mix across driver, customer, integration, and marketplace lanes.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Maturity score" value={SUPPORT_MATURITY.score} tone="emerald" />
        <ScoreCard label="SLA compliance" value={SUPPORT_MATURITY.sla_compliance} tone="emerald" />
        <ScoreCard label="KB coverage" value={SUPPORT_MATURITY.kb_coverage} tone="amber" />
      </div>
      <KpiGrid cols={4} items={[
        { label: "Tickets / wk", value: SUPPORT_MATURITY.tickets_week.toLocaleString() },
        { label: "Escalation rate", value: `${SUPPORT_MATURITY.escalation_rate}%` },
        { label: "Critical incidents", value: SUPPORT_MATURITY.critical_incidents },
        { label: "TTFR", value: `${SUPPORT_MATURITY.ttfr_min}m` },
        { label: "TTR", value: `${SUPPORT_MATURITY.ttr_hrs}h` },
        { label: "Backlog", value: SUPPORT_MATURITY.backlog },
        { label: "Driver issues", value: SUPPORT_MATURITY.driver_issues },
        { label: "Customer issues", value: SUPPORT_MATURITY.customer_issues },
      ]} />
    </V45Page>
  ),
});
