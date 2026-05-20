import { createFileRoute } from "@tanstack/react-router";
import { Smartphone } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { ChecklistCard } from "@/components/v1/ChecklistCard";
import { DRIVER_STABILIZATION } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/driver")({
  head: () => ({ meta: [{ title: "Driver Stabilization · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <V1Page
      icon={<Smartphone className="size-6 text-indigo-300" />}
      title="Driver App Stabilization"
      blurb="Focused UX, GPS, and POD polish tasks distilled from pilot driver feedback."
    >
      <ChecklistCard group={DRIVER_STABILIZATION} />
    </V1Page>
  );
}
