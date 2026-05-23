import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v19/ControlPage";
import * as H from "@/v19/hooks";

function Page() {
  return <ControlPage icon={<Megaphone className="size-6 text-violet-300" />}
    title="Category Assurance Execution Center"
    blurb="Narrative/proof/education/positioning/differentiation/sales/website/board narrative + proof publishing & external-use gating."
    scoreLabel="Category assurance"
    data={H.useCategoryAssuranceExecution()} />;
}
export const Route = createFileRoute("/v19/category")({ component: Page });
