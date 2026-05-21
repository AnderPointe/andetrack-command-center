import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { SimpleTable } from "@/components/v45/ui-bits";
import { MARKETPLACE_PLAYBOOKS } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/playbooks-marketplace")({
  head: () => ({ meta: [{ title: "Marketplace Playbooks · Anderoute" }] }),
  component: () => (
    <V45Page icon={<BookOpen className="size-6 text-violet-300" />} title="Marketplace Operations Playbooks"
      blurb="Repeatable, owner-assigned procedures for onboarding, awards, disputes, suspensions, missing POD, and compliance exceptions.">
      <SimpleTable rows={MARKETPLACE_PLAYBOOKS} columns={[
        { key: "title", label: "Playbook" },
        { key: "owner", label: "Owner" },
        { key: "steps", label: "Steps" },
        { key: "assigned", label: "Assigned" },
        { key: "completed", label: "Completed" },
      ]} />
    </V45Page>
  ),
});
