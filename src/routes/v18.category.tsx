import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v18/ControlPage";
import * as H from "@/v18/hooks";

function Page() {
  return <ControlPage icon={<Megaphone className="size-6 text-violet-300" />} title="Category Automation Controls Center"
    blurb="Narrative, proof asset, market education, positioning, differentiation, sales/website/board narrative, proof publishing, external-use, recommendation, audit." data={H.useCategoryAutomationControls()} />;
}
export const Route = createFileRoute("/v18/category")({ component: Page });
