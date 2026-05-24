import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { ControlPage } from "@/components/v23/ControlPage";
import * as H from "@/v23/hooks";
function Page() {
  return <ControlPage icon={<Lock className="size-6 text-emerald-300" />} title="Trust Evidence Automation Network" blurb="V23 Trust Evidence Automation Network — HITL-gated, append-only evidence, RBAC + RLS enforced." data={H.useTrustEvidenceAutomationNetwork()} />;
}
export const Route = createFileRoute("/v23/evidence")({ component: Page });
