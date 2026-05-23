import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { ControlPage } from "@/components/v19/ControlPage";
import * as H from "@/v19/hooks";

function Page() {
  return <ControlPage icon={<Boxes className="size-6 text-violet-300" />}
    title="Product-Line Assurance Execution Center"
    blurb="12 product lines (Dispatch, EliteNav, Driver Mobile, Customer Portal, CoPilot, Marketplace, API, EDI, Telematics, Partners, Reports, Governance)."
    scoreLabel="Product assurance"
    data={H.useProductLineAssuranceExecution()} />;
}
export const Route = createFileRoute("/v19/products")({ component: Page });
