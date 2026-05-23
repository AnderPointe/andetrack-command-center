import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<Radar className="size-6 text-violet-300" />}
    title="Outcome Assurance Optimization Center"
    blurb="Approved · rejected · automation · approval · revenue · MP · capital · account · partner · product · category outcomes · calibration · lessons."
    data={H.useOutcomeAssuranceOptimization()} scoreLabel="Outcome optimization" />;
}
export const Route = createFileRoute("/v195/outcome")({ component: Page });
