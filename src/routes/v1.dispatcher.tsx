import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { ChecklistCard } from "@/components/v1/ChecklistCard";
import { DISPATCHER_STABILIZATION } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/dispatcher")({
  head: () => ({ meta: [{ title: "Dispatcher Stabilization · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <V1Page
      icon={<ClipboardCheck className="size-6 text-indigo-300" />}
      title="Dispatcher Workflow Stabilization"
      blurb="Load board, map clarity, alert prioritization, and audit timeline polish for the dispatcher dashboard."
    >
      <ChecklistCard group={DISPATCHER_STABILIZATION} />
    </V1Page>
  );
}
