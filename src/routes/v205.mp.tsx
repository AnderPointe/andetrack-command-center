import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v205/ControlPage";
import * as H from "@/v205/hooks";

function Page() {
  const d = H.useMarketplaceTrustGovernance();
  return <ControlPage icon={<Megaphone className="size-6 text-teal-300" />} title="Marketplace Trust Governance Center" blurb="Density, coverage, bid, time-to-award, regional/lane liquidity, carrier quality, approval trust governance." data={d} />;
}
export const Route = createFileRoute("/v205/mp")({ component: Page });
