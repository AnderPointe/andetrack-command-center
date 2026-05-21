import { createFileRoute } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useControlledCountryPilot } from "@/v75/hooks";

export const Route = createFileRoute("/v75/country-pilot")({
  head: () => ({ meta: [{ title: "Controlled Country Pilot · V7.5 · Anderoute" }] }),
  component: () => {
    const { steps, country, conditions } = useControlledCountryPilot();
    const done = steps.filter(s => s.status === "done").length;
    const blocked = steps.filter(s => s.status === "blocked").length;
    const inFlight = steps.filter(s => s.status === "in_progress").length;
    return (
      <V75Page icon={<PlayCircle className="size-6 text-indigo-300" />} title="Controlled Country Pilot Workflow"
        blurb={`Active pilot: ${country}. 15-step controlled launch with executive approval, legal/data residency review, and pilot monitoring.`}>
        <KpiGrid cols={4} items={[
          { label: "Country", value: country },
          { label: "Done",    value: `${done}/${steps.length}` },
          { label: "In flight", value: inFlight },
          { label: "Blocked", value: blocked, sub: blocked ? "Localization" : "—" },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Pilot steps</h3>
          <SimpleTable rows={steps as any} columns={[
            { key: "step",   label: "Step" },
            { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Pilot launch conditions ({country})</h3>
          <SimpleTable rows={conditions as any} columns={[
            { key: "condition", label: "Condition" },
            { key: "owner",     label: "Owner" },
            { key: "status",    label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
