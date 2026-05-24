import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { ControlPage } from "@/components/v23/ControlPage";
import * as H from "@/v23/hooks";
function Page() {
  return <ControlPage icon={<Network className="size-6 text-emerald-300" />} title="Enterprise Trust Automation Operating Network" blurb="V23 Enterprise Trust Automation Operating Network — HITL-gated, append-only evidence, RBAC + RLS enforced." data={H.useEnterpriseTrustAutomationOperating()} />;
}
export const Route = createFileRoute("/v23/operating")({ component: Page });
