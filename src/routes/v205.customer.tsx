import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { ControlPage } from "@/components/v205/ControlPage";
import * as H from "@/v205/hooks";

function Page() {
  const d = H.useCustomerTrustOperatingIntelligence();
  return <ControlPage icon={<Users className="size-6 text-teal-300" />} title="Customer Trust Operating Intelligence Center" blurb="Adoption, renewal, expansion, comms controls, proof approval, data boundary, strategic account trust." data={d} />;
}
export const Route = createFileRoute("/v205/customer")({ component: Page });
