import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v215/ControlPage";
import * as H from "@/v215/hooks";
function Page() {
  return <ControlPage icon={<Megaphone className="size-6 text-emerald-300" />}
    title="Category Trust Network Leadership Center"
    blurb="Narrative, proof, market education, positioning, differentiation, sales/website/board narrative, publishing & external-use approval, audit."
    data={H.useCategoryTrustNetworkLeadership()} />;
}
export const Route = createFileRoute("/v215/category")({ component: Page });
