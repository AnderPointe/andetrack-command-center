import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<Briefcase className="size-6 text-violet-300" />}
    title="Executive Assurance Intelligence Center"
    blurb="CEO · CFO · COO · CRO · MP · Product · CS · Partner · Security queues. High-risk · overdue · escalation · board decisions."
    data={H.useExecutiveAssuranceIntelligence()} scoreLabel="Exec intelligence" />;
}
export const Route = createFileRoute("/v195/exec")({ component: Page });
