import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v22/ControlPage";
import * as H from "@/v22/hooks";
function Page() { return <ControlPage icon={<Megaphone className="size-6 text-emerald-300" />} title="Category Trust Lifecycle Leadership Center" blurb="Narrative, proof, market education, positioning, differentiation, sales/website/board narrative, publishing + external-use approval, audit." data={H.useCategoryTrustLifecycleLeadership()} />; }
export const Route = createFileRoute("/v22/category")({ component: Page });
