import { createFileRoute } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { ChecklistCard } from "@/components/v1/ChecklistCard";
import { PORTAL_STABILIZATION } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/portal")({
  head: () => ({ meta: [{ title: "Customer Portal Stabilization · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <V1Page
      icon={<Globe className="size-6 text-indigo-300" />}
      title="Customer Portal Stabilization"
      blurb="Tracking clarity, ETA, POD visibility, and mobile polish for the customer-facing portal."
    >
      <ChecklistCard group={PORTAL_STABILIZATION} />
    </V1Page>
  );
}
