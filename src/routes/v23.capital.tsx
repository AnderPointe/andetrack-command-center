import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { ControlPage } from "@/components/v23/ControlPage";
import * as H from "@/v23/hooks";
function Page() {
  return <ControlPage icon={<Wallet className="size-6 text-emerald-300" />} title="Capital Trust Automation Readiness" blurb="V23 Capital Trust Automation Readiness — HITL-gated, append-only evidence, RBAC + RLS enforced." data={H.useCapitalTrustAutomationReadiness()} />;
}
export const Route = createFileRoute("/v23/capital")({ component: Page });
