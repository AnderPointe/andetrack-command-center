import { createFileRoute } from "@tanstack/react-router";
import { GitBranch } from "lucide-react";
import { ControlPage } from "@/components/v215/ControlPage";
import * as H from "@/v215/hooks";
function Page() {
  return <ControlPage icon={<GitBranch className="size-6 text-emerald-300" />}
    title="Partner Trust Lifecycle Intelligence Center"
    blurb="Qualification → onboarding → integration → enablement → campaign → joint customer → evidence → support → renewal → offboarding. Boundary, recommendation, routing."
    data={H.usePartnerTrustLifecycle()} />;
}
export const Route = createFileRoute("/v215/partner")({ component: Page });
