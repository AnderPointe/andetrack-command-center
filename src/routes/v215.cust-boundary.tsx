import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { ControlPage } from "@/components/v215/ControlPage";
import * as H from "@/v215/hooks";
function Page() {
  return <ControlPage icon={<ShieldCheck className="size-6 text-emerald-300" />}
    title="Customer Trust Boundary Governance Center"
    blurb="Customer data boundary, portal exposure, comms approvals, proof approval, support data, account visibility, tenant isolation, external-use evidence approval."
    data={H.useCustomerTrustBoundaryGovernance()} />;
}
export const Route = createFileRoute("/v215/cust-boundary")({ component: Page });
