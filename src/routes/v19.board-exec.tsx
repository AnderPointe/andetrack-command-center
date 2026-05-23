import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { ControlPage } from "@/components/v19/ControlPage";
import * as H from "@/v19/hooks";

function Page() {
  return <ControlPage icon={<Brain className="size-6 text-violet-300" />}
    title="Board Assurance Execution Center"
    blurb="Board packet/KPI/decision/risk/explainability/approval/follow-up assurance with audit trail and exceptions."
    scoreLabel="Board assurance execution"
    data={H.useBoardAssuranceExecution()} />;
}
export const Route = createFileRoute("/v19/board-exec")({ component: Page });
