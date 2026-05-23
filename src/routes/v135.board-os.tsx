import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const os = H.useV135BoardStrategicOS();
  const decisions = H.useV135BoardDecisions();
  const cadence = H.useV135ExecCadence();
  return (
    <V135Page icon={<CalendarClock className="size-6 text-fuchsia-300" />} title="Board Strategic Operating System" blurb="Board cadence, strategic decision system, and executive value-creation cadence.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Board cadence</h3>
        <SimpleTable rows={os.cadence as any} columns={[
          { key: "ritual", label: "Ritual" }, { key: "owner", label: "Owner" }, { key: "cadence", label: "Cadence" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Executive value-creation cadence</h3>
        <SimpleTable rows={cadence as any} columns={[
          { key: "ritual", label: "Ritual" }, { key: "owner", label: "Owner" },
          { key: "cadence", label: "Cadence" }, { key: "output", label: "Output" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Board strategic decision system</h3>
        <SimpleTable rows={decisions as any} columns={[
          { key: "decision", label: "Decision" }, { key: "owner", label: "Owner" },
          { key: "cadence", label: "Cadence" }, { key: "evidence", label: "Evidence" }, { key: "status", label: "Status" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Legacy decisions log</h3>
        <SimpleTable rows={os.decisions_log as any} columns={[
          { key: "decision", label: "Decision" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/board-os")({
  head: () => ({ meta: [{ title: "Board Strategic OS · V13.5" }] }),
  component: Page,
});
