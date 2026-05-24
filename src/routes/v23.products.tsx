import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { ControlPage } from "@/components/v23/ControlPage";
import * as H from "@/v23/hooks";
function Page() {
  return <ControlPage icon={<Boxes className="size-6 text-emerald-300" />} title="Product Trust Automation Intelligence" blurb="V23 Product Trust Automation Intelligence — HITL-gated, append-only evidence, RBAC + RLS enforced." data={H.useProductTrustAutomationIntelligence()} />;
}
export const Route = createFileRoute("/v23/products")({ component: Page });
