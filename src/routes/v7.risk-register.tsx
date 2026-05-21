import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable, StatusPill, ScoreCard } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useStrategicGlobalRiskRegister } from "@/v7/hooks";

export const Route = createFileRoute("/v7/risk-register")({
  head: () => ({ meta: [{ title: "Global Risk Register · V7 · Anderoute" }] }),
  component: () => {
    const { risks } = useStrategicGlobalRiskRegister();
    const high = risks.filter(r => r.severity === "high").length;
    return (
      <V7Page icon={<AlertTriangle className="size-6 text-indigo-300" />} title="Strategic Global Risk Register"
        blurb="14 risk categories — country launch, compliance, residency, financial, billing/tax, marketplace, partner, support, localization, security, mobile approval, AI gov, concentration, regional revenue.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="High-severity risks"   value={Math.round((high / risks.length) * 100)} tone="rose" />
          <ScoreCard label="Coverage"              value={100} tone="sky" />
          <ScoreCard label="Mitigation in motion"  value={71}  tone="amber" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={risks as any} columns={[
            { key: "category",   label: "Category" },
            { key: "risk",       label: "Risk" },
            { key: "severity",   label: "Severity", render: (r: any) => <StatusPill status={r.severity} /> },
            { key: "owner",      label: "Owner" },
            { key: "mitigation", label: "Mitigation" },
          ]} />
        </Card>
      </V7Page>
    );
  },
});
