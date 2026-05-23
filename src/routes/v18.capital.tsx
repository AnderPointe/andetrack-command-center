import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { ControlPage } from "@/components/v18/ControlPage";
import * as H from "@/v18/hooks";

function Page() {
  return <ControlPage icon={<Wallet className="size-6 text-violet-300" />} title="Capital Automation Controls Center"
    blurb="Capital evidence, data room, investor/acquirer, board packet, durability, MP, risk, external-use, recommendation, routing, audit." data={H.useCapitalAutomationControls()} />;
}
export const Route = createFileRoute("/v18/capital")({ component: Page });
