import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { ControlPage } from "@/components/v18/ControlPage";
import * as H from "@/v18/hooks";

function Page() {
  return <ControlPage icon={<Users className="size-6 text-violet-300" />} title="Strategic Account Automation Controls Center"
    blurb="Expansion, renewal, churn, adoption, trust, support, exec sponsor, evidence, customer comms, recommendation, routing, audit." data={H.useStrategicAccountAutomationControls()} />;
}
export const Route = createFileRoute("/v18/accounts")({ component: Page });
