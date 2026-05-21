import { createFileRoute } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useControlledCountryPilot } from "@/v75/hooks";

export const Route = createFileRoute("/v75/country-pilot")({
  head: () => ({ meta: [{ title: "Controlled Country Pilot · V7.5 · Anderoute" }] }),
  component: () => {
    const { steps, country } = useControlledCountryPilot();
    const done = steps.filter(s => s.status === "done").length;
    return (
      <V75Page icon={<PlayCircle className="size-6 text-indigo-300" />} title="Controlled Country Pilot Workflow"
        blurb={`Active pilot: ${country}. 15-step controlled launch with executive approval, legal/data residency review, and pilot monitoring.`}>
        <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Pilot progress — {country}</h3>
            <span className="text-xs text-muted-foreground">{done}/{steps.length} done</span>
          </div>
        </Card>
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
