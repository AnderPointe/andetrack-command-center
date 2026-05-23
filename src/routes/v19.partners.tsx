import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { ControlPage } from "@/components/v19/ControlPage";
import * as H from "@/v19/hooks";

function Page() {
  return <ControlPage icon={<Network className="size-6 text-violet-300" />}
    title="Partner Assurance Execution Center"
    blurb="Partner performance/enablement/support/pipeline/joint-customer/risk controls plus evidence, comm, approval, audit."
    scoreLabel="Partner assurance"
    data={H.usePartnerAssuranceExecution()} />;
}
export const Route = createFileRoute("/v19/partners")({ component: Page });
