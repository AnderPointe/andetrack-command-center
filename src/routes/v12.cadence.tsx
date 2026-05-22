import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const rows = H.useGlobalCommercialCadence();
  return (
    <V12Page icon={<CalendarClock className="size-6 text-cyan-300" />} title="Global Commercial Operating Cadence" blurb="10 recurring commercial cadences with owners and attendees. Forms the executive heartbeat of V12.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={rows as any} columns={[
          { key: "cadence", label: "Cadence" }, { key: "owner", label: "Owner" }, { key: "attendees", label: "Attendees" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/cadence")({
  head: () => ({ meta: [{ title: "Commercial Cadence · V12" }] }),
  component: Page,
});
