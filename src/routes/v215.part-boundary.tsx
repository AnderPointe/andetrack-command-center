import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { ControlPage } from "@/components/v215/ControlPage";
import * as H from "@/v215/hooks";
function Page() {
  return <ControlPage icon={<ShieldCheck className="size-6 text-emerald-300" />}
    title="Partner Trust Boundary Governance Center"
    blurb="Partner data boundary, portal exposure, comms approvals, proof approval, joint customer visibility, integration boundary, tenant isolation, external-use approval."
    data={H.usePartnerTrustBoundaryGovernance()} />;
}
export const Route = createFileRoute("/v215/part-boundary")({ component: Page });
