import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ControlPage } from "@/components/v23/ControlPage";
import * as H from "@/v23/hooks";
function Page() {
  return <ControlPage icon={<CheckCircle2 className="size-6 text-emerald-300" />} title="Recommendation Automation Governance" blurb="V23 Recommendation Automation Governance — HITL-gated, append-only evidence, RBAC + RLS enforced." data={H.useRecommendationAutomationGovernance()} />;
}
export const Route = createFileRoute("/v23/rec")({ component: Page });
