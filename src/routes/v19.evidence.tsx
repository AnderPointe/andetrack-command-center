import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { ControlPage } from "@/components/v19/ControlPage";
import * as H from "@/v19/hooks";

function Page() {
  return <ControlPage icon={<Lock className="size-6 text-violet-300" />}
    title="Control Evidence Maturity Center"
    blurb="15 evidence domains. Freshness, completeness, owner coverage, approval, use status, exceptions, audit."
    scoreLabel="Evidence maturity"
    data={H.useControlEvidenceMaturity()} />;
}
export const Route = createFileRoute("/v19/evidence")({ component: Page });
