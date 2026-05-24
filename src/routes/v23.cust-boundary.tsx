import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { ControlPage } from "@/components/v23/ControlPage";
import * as H from "@/v23/hooks";
function Page() {
  return <ControlPage icon={<ShieldCheck className="size-6 text-emerald-300" />} title="Customer Boundary Automation Governance" blurb="V23 Customer Boundary Automation Governance — HITL-gated, append-only evidence, RBAC + RLS enforced." data={H.useCustomerBoundaryAutomationGovernance()} />;
}
export const Route = createFileRoute("/v23/cust-boundary")({ component: Page });
