import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<Users className="size-6 text-violet-300" />}
    title="Strategic Account Assurance Intelligence Center"
    blurb="Expansion · renewal · churn · adoption · trust · support · sponsor signals · evidence · customer communication approval-gated."
    data={H.useStrategicAccountAssuranceIntelligence()} scoreLabel="Account intelligence" />;
}
export const Route = createFileRoute("/v195/accounts")({ component: Page });
