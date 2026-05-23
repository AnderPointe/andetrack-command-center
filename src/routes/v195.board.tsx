import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<Brain className="size-6 text-violet-300" />}
    title="Board Assurance Intelligence Center"
    blurb="Board packet · evidence · KPI · decision · risk · explainability · approval · follow-up intelligence. Audience-scoped redaction."
    data={H.useBoardAssuranceIntelligence()} scoreLabel="Board intelligence" />;
}
export const Route = createFileRoute("/v195/board")({ component: Page });
