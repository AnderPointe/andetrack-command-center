import { createFileRoute } from "@tanstack/react-router";
import { Banknote } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { ChecklistCard } from "@/components/v1/ChecklistCard";
import { COMMERCIAL_CHECKS } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/commercial")({
  head: () => ({ meta: [{ title: "Commercial Readiness · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <V1Page
      icon={<Banknote className="size-6 text-indigo-300" />}
      title="Commercial Readiness"
      blurb="Pricing, support model, references, ROI story, and security/privacy materials for sales motion."
    >
      <ChecklistCard group={{ id: "cm", title: "Commercial checks", items: COMMERCIAL_CHECKS }} />
    </V1Page>
  );
}
