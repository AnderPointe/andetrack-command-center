import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { ControlPage } from "@/components/v19/ControlPage";
import * as H from "@/v19/hooks";

function Page() {
  return <ControlPage icon={<ListChecks className="size-6 text-violet-300" />}
    title="Human Approval Assurance Maturity Center"
    blurb="Coverage, SLA, backup approvers, escalation, evidence, explanation, rejection quality, outcome linkage, override."
    scoreLabel="Approval maturity"
    data={H.useHumanApprovalAssuranceMaturity()} />;
}
export const Route = createFileRoute("/v19/approval")({ component: Page });
