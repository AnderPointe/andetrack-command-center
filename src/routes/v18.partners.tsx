import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { ControlPage } from "@/components/v18/ControlPage";
import * as H from "@/v18/hooks";

function Page() {
  return <ControlPage icon={<Network className="size-6 text-violet-300" />} title="Partner Automation Controls Center"
    blurb="Partner performance, enablement, support, pipeline, joint customers, risk, evidence, partner-facing comms, recommendation, routing, audit." data={H.usePartnerAutomationControls()} />;
}
export const Route = createFileRoute("/v18/partners")({ component: Page });
