import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<AlertTriangle className="size-6 text-violet-300" />}
    title="Predictive Risk Assurance Optimization Center"
    blurb="15 risk categories: revenue · concentration · renewal · expansion · liquidity · density · partner · product · capital · diligence · proof · board · compliance · AI · ops."
    data={H.usePredictiveRiskAssuranceOptimization()} scoreLabel="Risk optimization" />;
}
export const Route = createFileRoute("/v195/risk")({ component: Page });
