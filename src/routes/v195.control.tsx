import { createFileRoute } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<Settings2 className="size-6 text-violet-300" />}
    title="Assurance Control Optimization Center"
    blurb="15 control domains optimized · exception reduction · remediation · owner coverage · evidence freshness · policy compliance."
    data={H.useAssuranceControlOptimization()} scoreLabel="Control optimization" />;
}
export const Route = createFileRoute("/v195/control")({ component: Page });
