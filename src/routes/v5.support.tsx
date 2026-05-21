import { createFileRoute } from "@tanstack/react-router";
import { Headphones } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { KpiGrid } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { SUPPORT_METRICS } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/support")({
  head: () => ({ meta: [{ title: "Support · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<Headphones className="size-6 text-fuchsia-300" />} title="Mature Enterprise Support"
      blurb="SLA compliance, backlog, critical-incident review, and support trend signals. Support satisfaction is a placeholder.">
      <KpiGrid cols={4} items={[
        { label: "SLA compliance",   value: `${SUPPORT_METRICS.sla_compliance}%` },
        { label: "Tickets 7d",       value: SUPPORT_METRICS.ticket_volume_7d },
        { label: "First response",   value: `${SUPPORT_METRICS.first_response_min}m` },
        { label: "TTR",              value: `${SUPPORT_METRICS.ttr_h}h` },
        { label: "Crit incidents 30d", value: SUPPORT_METRICS.critical_incidents_30d },
        { label: "Escalations open", value: SUPPORT_METRICS.escalations_open },
        { label: "Backlog",          value: SUPPORT_METRICS.backlog },
        { label: "Deflection",       value: "—" },
      ]} />
      <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
        Critical incident review opens from the operations center. KB coverage, deflection, and support cost are placeholders.
      </Card>
    </V5Page>
  ),
});
