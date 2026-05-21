import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useAdvancedFinancialAuditReadiness } from "@/v75/hooks";

export const Route = createFileRoute("/v75/financial-audit")({
  head: () => ({ meta: [{ title: "Advanced Financial Audit Readiness · V7.5 · Anderoute" }] }),
  component: () => {
    const { audit } = useAdvancedFinancialAuditReadiness();
    return (
      <V75Page icon={<Receipt className="size-6 text-indigo-300" />} title="Advanced Financial Audit Readiness"
        blurb="Readiness only — no audit completeness claim. Tracks subscription/billing/usage/marketplace/API/partner controls and evidence collection.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Audit readiness" value={audit.score} tone="amber" />
          <ScoreCard label="Exceptions" value={audit.items.filter(i => i.status === "exception").length} tone="rose" />
          <ScoreCard label="Passing controls" value={audit.items.filter(i => i.status === "passing").length} tone="emerald" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={audit.items as any} columns={[
            { key: "area",     label: "Area" },
            { key: "status",   label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
            { key: "evidence", label: "Evidence", render: (r: any) => <StatusPill status={r.evidence} /> },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
