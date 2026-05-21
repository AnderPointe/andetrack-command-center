import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill, ScoreCard } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useRegionalRiskManagement } from "@/v75/hooks";

export const Route = createFileRoute("/v75/regional-risk")({
  head: () => ({ meta: [{ title: "Regional Risk Management · V7.5 · Anderoute" }] }),
  component: () => {
    const { risks } = useRegionalRiskManagement();
    return (
      <V75Page icon={<AlertTriangle className="size-6 text-indigo-300" />} title="Regional Risk Management"
        blurb="12 risk categories across compliance, legal, billing/tax, data residency, support, marketplace, carrier, partner, security, customer concentration, operational, mobile.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="High risks"   value={risks.filter(r => r.level === "high").length}   tone="rose" />
          <ScoreCard label="Medium risks" value={risks.filter(r => r.level === "medium").length} tone="amber" />
          <ScoreCard label="Low risks"    value={risks.filter(r => r.level === "low").length}    tone="emerald" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={risks as any} columns={[
            { key: "region",     label: "Region" },
            { key: "category",   label: "Category" },
            { key: "level",      label: "Level", render: (r: any) => <StatusPill status={r.level} /> },
            { key: "mitigation", label: "Mitigation" },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
