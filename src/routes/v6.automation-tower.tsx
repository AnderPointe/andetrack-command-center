import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { KpiGrid, SimpleTable } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { useAutomationControlTower } from "@/v6/hooks";

export const Route = createFileRoute("/v6/automation-tower")({
  head: () => ({ meta: [{ title: "Automation Control Tower · V6" }] }),
  component: () => {
    const { tower } = useAutomationControlTower();
    return (
      <V6Page icon={<ShieldCheck className="size-6 text-emerald-300" />} title="Automation Control Tower"
        blurb="Live pending approvals, outcomes, overrides and policy violations across customer ETA, dispatch recommendations, billing adjustments, EDI acks, webhook retries and support triage.">
        <KpiGrid cols={6} items={[
          { label: "Pending", value: tower.pending },
          { label: "Approved 24h", value: tower.approved_24h },
          { label: "Rejected 24h", value: tower.rejected_24h },
          { label: "Success rate", value: `${tower.success_rate}%` },
          { label: "Failure rate", value: `${tower.failure_rate}%` },
          { label: "Override rate", value: `${tower.override_rate}%` },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">By type (24h)</h3>
          <div className="mt-2">
            <SimpleTable rows={tower.by_type} columns={[
              { key: "kind",     label: "Kind" },
              { key: "approved", label: "Approved" },
              { key: "rejected", label: "Rejected" },
            ]} />
          </div>
        </Card>
        <Card className="border-rose-400/30 bg-rose-500/[0.04] p-4">
          <h3 className="text-sm font-semibold text-rose-200">Policy violations</h3>
          <ul className="mt-2 space-y-1 text-xs">
            {tower.violations.map(v => (
              <li key={v.id} className="flex justify-between"><span>{v.policy}</span><span className="text-muted-foreground">{v.action}</span><span className="text-emerald-300">{v.outcome}</span></li>
            ))}
          </ul>
        </Card>
      </V6Page>
    );
  },
});
