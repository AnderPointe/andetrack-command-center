import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const c = H.useExecutiveRevenueCadence();
  return (
    <V105Page icon={<CalendarClock className="size-6 text-fuchsia-300" />} title="Executive Revenue Cadence" blurb="Weekly pipeline / expansion / procurement / trust + monthly + quarterly cadences.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Revenue cadence</h3>
        <SimpleTable rows={c.cadence as any} columns={[
          { key: "meeting", label: "Meeting" }, { key: "cadence", label: "Cadence" },
          { key: "completion", label: "Completion %", render: (r: any) => `${r.completion}%` },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/cadence")({
  head: () => ({ meta: [{ title: "Revenue Cadence · V10.5" }] }),
  component: Page,
});
