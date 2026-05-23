import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<Megaphone className="size-6 text-violet-300" />}
    title="Marketplace Assurance Governance Center"
    blurb="Carrier density · equipment · load · bid density · time-to-award · liquidity · quality · compliance · dispute · approval governance."
    data={H.useMarketplaceAssuranceGovernance()} scoreLabel="MP governance" />;
}
export const Route = createFileRoute("/v195/mp")({ component: Page });
