import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ControlPage } from "@/components/v19/ControlPage";
import * as H from "@/v19/hooks";

function Page() {
  return <ControlPage icon={<CheckCircle2 className="size-6 text-violet-300" />}
    title="Recommendation Assurance Maturity Center"
    blurb="Source signals, evidence, explainability, confidence/risk, alternatives, duplicate detection, policy, routing, audit, outcomes."
    scoreLabel="Recommendation maturity"
    data={H.useRecommendationAssuranceMaturity()} />;
}
export const Route = createFileRoute("/v19/rec")({ component: Page });
