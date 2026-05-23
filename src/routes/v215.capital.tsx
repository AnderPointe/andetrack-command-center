import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { ControlPage } from "@/components/v215/ControlPage";
import * as H from "@/v215/hooks";
function Page() {
  return <ControlPage icon={<Wallet className="size-6 text-emerald-300" />}
    title="Capital Trust Network Readiness Center"
    blurb="Data room, investor/acquirer, board, durability, MP, strategic risk, external-use approval, capital recommendation/approval/audit. Two-person sign-off >$25k."
    data={H.useCapitalTrustNetworkReadiness()} />;
}
export const Route = createFileRoute("/v215/capital")({ component: Page });
