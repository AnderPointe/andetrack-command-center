import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalOperatingCadence } from "@/v75/hooks";

export const Route = createFileRoute("/v75/cadence")({
  head: () => ({ meta: [{ title: "Global Operating Cadence · V7.5 · Anderoute" }] }),
  component: () => {
    const { cadences } = useGlobalOperatingCadence();
    return (
      <V75Page icon={<CalendarClock className="size-6 text-indigo-300" />} title="Global Operating Cadence"
        blurb="Daily/weekly/monthly/quarterly cadences across global ops, country launch, marketplace, support, compliance, financial, partner, expansion, executive governance.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={cadences as any} columns={[
            { key: "cadence",  label: "Cadence" },
            { key: "owner",    label: "Owner" },
            { key: "freq",     label: "Frequency" },
            { key: "duration", label: "Duration" },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
