import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill, ScoreCard } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useRegulatedCustomerOnboarding } from "@/v75/hooks";

export const Route = createFileRoute("/v75/regulated-onboarding")({
  head: () => ({ meta: [{ title: "Regulated Customer Onboarding · V7.5 · Anderoute" }] }),
  component: () => {
    const { steps } = useRegulatedCustomerOnboarding();
    const done = steps.filter(s => s.status === "done").length;
    const pct = Math.round((done / steps.length) * 100);
    return (
      <V75Page icon={<ShieldCheck className="size-6 text-indigo-300" />} title="Regulated Customer Onboarding"
        blurb="Security questionnaire, data processing review, AI usage disclosure, API/EDI security, executive sign-off — required for regulated enterprise customers.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Onboarding complete" value={pct} tone="sky" />
          <ScoreCard label="In progress" value={steps.filter(s => s.status === "in_progress").length} tone="amber" />
          <ScoreCard label="Remaining" value={steps.filter(s => s.status === "todo").length} tone="rose" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={steps as any} columns={[
            { key: "step",   label: "Step" },
            { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
