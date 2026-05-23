import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { ControlPage } from "@/components/v215/ControlPage";
import * as H from "@/v215/hooks";
function Page() {
  return <ControlPage icon={<ListChecks className="size-6 text-emerald-300" />}
    title="Human Approval Trust Lifecycle Controls"
    blurb="Requested → evidence attached → explanation → risk scored → approver assigned → backup → approved/rejected → reason → action → outcome → audit. approver_id ≠ recommender_id."
    data={H.useHumanApprovalTrustLifecycle()} />;
}
export const Route = createFileRoute("/v215/approval")({ component: Page });
