import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<Wallet className="size-6 text-violet-300" />}
    title="Capital Assurance Intelligence Center"
    blurb="Capital · data-room · investor/acquirer · board-capital evidence · external-use approval · 2-person sign-off on > $25k · append-only audit."
    data={H.useCapitalAssuranceIntelligence()} scoreLabel="Capital intelligence" />;
}
export const Route = createFileRoute("/v195/capital")({ component: Page });
