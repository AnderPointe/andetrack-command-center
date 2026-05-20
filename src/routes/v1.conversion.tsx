import { createFileRoute } from "@tanstack/react-router";
import { Repeat } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { StatTile } from "@/components/v1/StatTile";
import { ChecklistCard } from "@/components/v1/ChecklistCard";
import { CONVERSION_STEPS, bugStats } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/conversion")({
  head: () => ({ meta: [{ title: "Pilot to Paid · Anderoute" }] }),
  component: Page,
});

function Page() {
  const done = CONVERSION_STEPS.filter((s) => s.done).length;
  const score = Math.round((done / CONVERSION_STEPS.length) * 100);
  const bs = bugStats();
  const ready = score >= 90 && bs.p0 === 0;
  return (
    <V1Page
      icon={<Repeat className="size-6 text-indigo-300" />}
      title="Pilot → Paid Conversion"
      blurb="Concrete sequence to convert the pilot company into a paid V1 customer."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Conversion readiness" value={`${score}%`} hint={`${done}/${CONVERSION_STEPS.length} steps`} tone={score >= 90 ? "good" : score >= 70 ? "warn" : "bad"} />
        <StatTile label="P0 bug blockers" value={bs.p0} tone={bs.p0 ? "bad" : "good"} />
        <StatTile label="Action" value={ready ? "Schedule conversion" : "Hold"} tone={ready ? "good" : "warn"} hint={ready ? "All gates clear" : "Resolve blockers first"} />
      </div>
      <ChecklistCard
        group={{ id: "cv", title: "Conversion steps", items: CONVERSION_STEPS }}
        hint="Run in order with the customer; do not skip blocker review."
      />
    </V1Page>
  );
}
