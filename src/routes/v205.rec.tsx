import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ControlPage } from "@/components/v205/ControlPage";
import * as H from "@/v205/hooks";

function Page() {
  const d = H.useRecommendationTrustQuality();
  return <ControlPage icon={<CheckCircle2 className="size-6 text-teal-300" />} title="Recommendation Trust Quality Center" blurb="Source signal, evidence, explainability, confidence, risk, alternatives, no-action impact, policy, audit, outcome." data={d} />;
}
export const Route = createFileRoute("/v205/rec")({ component: Page });
