import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { ControlPage } from "@/components/v23/ControlPage";
import * as H from "@/v23/hooks";
function Page() {
  return <ControlPage icon={<AlertTriangle className="size-6 text-emerald-300" />} title="Trust Risk Automation Intelligence" blurb="V23 Trust Risk Automation Intelligence — HITL-gated, append-only evidence, RBAC + RLS enforced." data={H.useTrustRiskAutomationIntelligence()} />;
}
export const Route = createFileRoute("/v23/risk")({ component: Page });
