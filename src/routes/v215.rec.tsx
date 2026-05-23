import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ControlPage } from "@/components/v215/ControlPage";
import * as H from "@/v215/hooks";
function Page() {
  return <ControlPage icon={<CheckCircle2 className="size-6 text-emerald-300" />}
    title="Recommendation Trust Lifecycle Center"
    blurb="Signal → recommendation → explanation → evidence → risk → confidence → approver → approval → action → outcome → lesson → policy tuning → evidence updated."
    data={H.useRecommendationTrustLifecycle()} />;
}
export const Route = createFileRoute("/v215/rec")({ component: Page });
