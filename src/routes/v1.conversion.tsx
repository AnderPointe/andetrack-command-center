import { createFileRoute } from "@tanstack/react-router";
import { Repeat } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { ChecklistCard } from "@/components/v1/ChecklistCard";
import { CONVERSION_STEPS } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/conversion")({
  head: () => ({ meta: [{ title: "Pilot to Paid · Anderoute" }] }),
  component: Page,
});

function Page() {
  const done = CONVERSION_STEPS.filter((s) => s.done).length;
  const score = Math.round((done / CONVERSION_STEPS.length) * 100);
  return (
    <V1Page
      icon={<Repeat className="size-6 text-indigo-300" />}
      title="Pilot → Paid Conversion"
      blurb={`Conversion readiness ${score}%. Convert the pilot once unresolved blockers are cleared and pricing/support are confirmed.`}
    >
      <ChecklistCard group={{ id: "cv", title: "Conversion steps", items: CONVERSION_STEPS }} />
    </V1Page>
  );
}
