import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { ControlPage } from "@/components/v205/ControlPage";
import * as H from "@/v205/hooks";

function Page() {
  const d = H.usePartnerTrustOperatingIntelligence();
  return <ControlPage icon={<Network className="size-6 text-teal-300" />} title="Partner Trust Operating Intelligence Center" blurb="Performance, enablement, pipeline, joint customer, evidence approval, comms controls, data boundary trust." data={d} />;
}
export const Route = createFileRoute("/v205/partner")({ component: Page });
