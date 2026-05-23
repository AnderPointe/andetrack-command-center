import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v19/ControlPage";
import * as H from "@/v19/hooks";

function Page() {
  return <ControlPage icon={<Megaphone className="size-6 text-violet-300" />}
    title="Marketplace Optimization Assurance Center"
    blurb="Density/coverage/bid/liquidity/quality/compliance/dispute/revenue assurance. Preferred-carrier rec is HITL-gated."
    scoreLabel="MP optimization assurance"
    data={H.useMarketplaceOptimizationAssurance()} />;
}
export const Route = createFileRoute("/v19/mp")({ component: Page });
