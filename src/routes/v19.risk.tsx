import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { ControlPage } from "@/components/v19/ControlPage";
import * as H from "@/v19/hooks";

function Page() {
  return <ControlPage icon={<AlertTriangle className="size-6 text-violet-300" />}
    title="Predictive Risk Assurance Maturity Center"
    blurb="15 risk categories. Owner coverage, evidence, escalation, mitigation, recurrence, approval routing, outcomes, board visibility."
    scoreLabel="Risk maturity"
    data={H.usePredictiveRiskAssuranceMaturity()} />;
}
export const Route = createFileRoute("/v19/risk")({ component: Page });
