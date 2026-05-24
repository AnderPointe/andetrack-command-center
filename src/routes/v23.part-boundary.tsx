import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { ControlPage } from "@/components/v23/ControlPage";
import * as H from "@/v23/hooks";
function Page() {
  return <ControlPage icon={<ShieldCheck className="size-6 text-emerald-300" />} title="Partner Boundary Automation Governance" blurb="V23 Partner Boundary Automation Governance — HITL-gated, append-only evidence, RBAC + RLS enforced." data={H.usePartnerBoundaryAutomationGovernance()} />;
}
export const Route = createFileRoute("/v23/part-boundary")({ component: Page });
