import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<Lock className="size-6 text-violet-300" />}
    title="Evidence Assurance Intelligence Center"
    blurb="15 evidence domains: revenue · MP · capital · board · account · partner · product · category · risk · rec · approval · outcome · audit · external · data-room."
    data={H.useEvidenceAssuranceIntelligence()} scoreLabel="Evidence intelligence" />;
}
export const Route = createFileRoute("/v195/evidence")({ component: Page });
