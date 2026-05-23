import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { ControlPage } from "@/components/v215/ControlPage";
import * as H from "@/v215/hooks";
function Page() {
  return <ControlPage icon={<Lock className="size-6 text-emerald-300" />}
    title="Trust Evidence Lifecycle Center"
    blurb="Requested → collected → validated → approved → attached → board/customer/partner/external use → archived → expired → refreshed. 13 evidence domains."
    data={H.useTrustEvidenceLifecycle()} />;
}
export const Route = createFileRoute("/v215/evidence")({ component: Page });
