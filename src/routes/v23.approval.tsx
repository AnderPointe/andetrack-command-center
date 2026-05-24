import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { ControlPage } from "@/components/v23/ControlPage";
import * as H from "@/v23/hooks";
function Page() {
  return <ControlPage icon={<ListChecks className="size-6 text-emerald-300" />} title="Human Approval Automation Governance" blurb="V23 Human Approval Automation Governance — HITL-gated, append-only evidence, RBAC + RLS enforced." data={H.useHumanApprovalAutomationGovernance()} />;
}
export const Route = createFileRoute("/v23/approval")({ component: Page });
