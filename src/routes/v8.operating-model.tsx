import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable, ScoreCard } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useLongTermGlobalOperatingModel } from "@/v8/hooks";

export const Route = createFileRoute("/v8/operating-model")({
  head: () => ({ meta: [{ title: "Long-Term Global Operating Model · Anderoute" }] }),
  component: () => {
    const { model, summary } = useLongTermGlobalOperatingModel();
    return (
      <V8Page icon={<Building2 className="size-6 text-violet-300" />} title="Long-Term Global Operating Model"
        blurb="Global product, regional, country, marketplace, carrier, financial, compliance, support, customer, partner, AI, security, and board governance — owners + cadence + maturity.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Maturity" value={summary.maturity} tone="sky" />
          <ScoreCard label="Areas" value={summary.areas} tone="emerald" />
          <ScoreCard label="Owners" value={summary.owners} tone="amber" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={model as any} columns={[
            { key: "area",    label: "Area" },
            { key: "owner",   label: "Owner" },
            { key: "cadence", label: "Cadence" },
            { key: "maturity", label: "Maturity" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
