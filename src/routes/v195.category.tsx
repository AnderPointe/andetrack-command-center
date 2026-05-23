import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<Megaphone className="size-6 text-violet-300" />}
    title="Category Assurance Intelligence Center"
    blurb="Narrative · proof assets · education · positioning · differentiation · sales · web/demo · board narrative · proof publishing approval-gated."
    data={H.useCategoryAssuranceIntelligence()} scoreLabel="Category intelligence" />;
}
export const Route = createFileRoute("/v195/category")({ component: Page });
