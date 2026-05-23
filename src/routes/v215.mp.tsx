import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v215/ControlPage";
import * as H from "@/v215/hooks";
function Page() {
  return <ControlPage icon={<Megaphone className="size-6 text-emerald-300" />}
    title="Marketplace Trust Network Governance Center"
    blurb="Carrier density, equipment, load, bid density, time-to-award, regional/lane liquidity, quality, compliance, dispute, preferred-carrier — HITL on optimizations."
    data={H.useMarketplaceTrustNetworkGovernance()} />;
}
export const Route = createFileRoute("/v215/mp")({ component: Page });
