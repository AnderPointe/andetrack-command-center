import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<Boxes className="size-6 text-violet-300" />}
    title="Product-Line Assurance Intelligence Center"
    blurb="12 product lines: Dispatch · EliteNav · Driver · Customer · CoPilot · MP · API · EDI · Telematics · Partner MP · Reports · Governance."
    data={H.useProductLineAssuranceIntelligence()} scoreLabel="Product intelligence" />;
}
export const Route = createFileRoute("/v195/products")({ component: Page });
