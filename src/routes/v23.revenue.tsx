import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { ControlPage } from "@/components/v23/ControlPage";
import * as H from "@/v23/hooks";
function Page() {
  return <ControlPage icon={<TrendingUp className="size-6 text-emerald-300" />} title="Revenue Trust Automation Systems" blurb="V23 Revenue Trust Automation Systems — HITL-gated, append-only evidence, RBAC + RLS enforced." data={H.useRevenueTrustAutomationSystems()} />;
}
export const Route = createFileRoute("/v23/revenue")({ component: Page });
