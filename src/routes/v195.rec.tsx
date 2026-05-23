import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<CheckCircle2 className="size-6 text-violet-300" />}
    title="Recommendation Assurance Optimization Center"
    blurb="Source signal · evidence · explainability · confidence · risk · alt option · no-action · duplicate · policy · routing · audit · outcome."
    data={H.useRecommendationAssuranceOptimization()} scoreLabel="Rec optimization" />;
}
export const Route = createFileRoute("/v195/rec")({ component: Page });
