import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { ControlPage } from "@/components/v19/ControlPage";
import * as H from "@/v19/hooks";

function Page() {
  return <ControlPage icon={<Users className="size-6 text-violet-300" />}
    title="Strategic Account Assurance Execution Center"
    blurb="Expansion/renewal/churn/adoption/trust/support/sponsor signal controls plus evidence, comm approval, routing, audit."
    scoreLabel="Account assurance"
    data={H.useStrategicAccountAssuranceExecution()} />;
}
export const Route = createFileRoute("/v19/accounts")({ component: Page });
