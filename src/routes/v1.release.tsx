import { createFileRoute } from "@tanstack/react-router";
import { PackageCheck } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { ChecklistCard } from "@/components/v1/ChecklistCard";
import { V1_RELEASE_CHECKLIST } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/release")({
  head: () => ({ meta: [{ title: "V1 Release · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <V1Page
      icon={<PackageCheck className="size-6 text-indigo-300" />}
      title="V1 Release Management"
      blurb="Branch cut, QA, security, migration, release notes, and customer approval gates."
    >
      <ChecklistCard group={V1_RELEASE_CHECKLIST} />
    </V1Page>
  );
}
