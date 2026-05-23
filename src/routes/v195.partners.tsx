import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<Network className="size-6 text-violet-300" />}
    title="Partner Assurance Intelligence Center"
    blurb="Performance · enablement · support · pipeline · joint customers · risk · evidence · partner-facing communication approval-gated."
    data={H.usePartnerAssuranceIntelligence()} scoreLabel="Partner intelligence" />;
}
export const Route = createFileRoute("/v195/partners")({ component: Page });
