import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { ControlPage } from "@/components/v22/ControlPage";
import * as H from "@/v22/hooks";
function Page() { return <ControlPage icon={<ListChecks className="size-6 text-emerald-300" />} title="Human Approval Lifecycle Governance Center" blurb="Requested → evidence → explanation → risk → approver + backup → escalation → approved/rejected → reason → action → outcome → audit. approver_id ≠ recommender_id." data={H.useHumanApprovalLifecycleGovernance()} />; }
export const Route = createFileRoute("/v22/approval")({ component: Page });
