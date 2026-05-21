import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { KpiGrid } from "@/components/v5/ui-bits";
import { OPS_METRICS } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/operating-metrics")({
  head: () => ({ meta: [{ title: "Operating Metrics · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<BarChart3 className="size-6 text-fuchsia-300" />} title="Advanced Operating Metrics"
      blurb="Platform reliability, ecosystem activity, marketplace, integration, mobile and AI activity at a glance.">
      <KpiGrid cols={4} items={OPS_METRICS} />
    </V5Page>
  ),
});
