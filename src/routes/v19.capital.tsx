import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { ControlPage } from "@/components/v19/ControlPage";
import * as H from "@/v19/hooks";

function Page() {
  return <ControlPage icon={<Wallet className="size-6 text-violet-300" />}
    title="Capital Assurance Execution Center"
    blurb="Capital/data-room/investor/board evidence, external-use gating, 2-person approval, append-only audit."
    scoreLabel="Capital assurance"
    data={H.useCapitalAssuranceExecution()} />;
}
export const Route = createFileRoute("/v19/capital")({ component: Page });
