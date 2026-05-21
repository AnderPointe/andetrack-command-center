import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { KpiGrid, SimpleTable, StatusPill } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useExecutiveGlobalOperatingDashboard } from "@/v7/hooks";

export const Route = createFileRoute("/v7/exec-dashboard")({
  head: () => ({ meta: [{ title: "Exec Global Dashboard · V7 · Anderoute" }] }),
  component: () => {
    const { kpis, decisions } = useExecutiveGlobalOperatingDashboard();
    return (
      <V7Page icon={<Crown className="size-6 text-indigo-300" />} title="Executive Global Operating Dashboard"
        blurb="Board-level KPIs across readiness, marketplace, partners, financial, compliance, support, mobile, and revenue. Decision queue surfaces executive approvals.">
        <KpiGrid cols={3} items={kpis.map(k => ({ label: k.label, value: `${k.value}%` }))} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Decisions needed</h3>
          <div className="mt-2">
            <SimpleTable rows={decisions as any} columns={[
              { key: "decision", label: "Decision" },
              { key: "owner",    label: "Owner" },
              { key: "status",   label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
      </V7Page>
    );
  },
});
