import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<ListChecks className="size-6 text-violet-300" />}
    title="Human Approval Optimization Center"
    blurb="Coverage · SLA · backup approver · escalation · high-risk handling · evidence · explanation · audit · rejection · outcome · override."
    data={H.useHumanApprovalOptimization()} scoreLabel="Approval optimization" />;
}
export const Route = createFileRoute("/v195/approval")({ component: Page });
