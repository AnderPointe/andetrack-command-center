import { createFileRoute } from "@tanstack/react-router";
import { Siren } from "lucide-react";
import { ControlPage } from "@/components/v23/ControlPage";
import * as H from "@/v23/hooks";
function Page() {
  return <ControlPage icon={<Siren className="size-6 text-emerald-300" />} title="Enterprise Trust Automation Exception Management" blurb="V23 Enterprise Trust Automation Exception Management — HITL-gated, append-only evidence, RBAC + RLS enforced." data={H.useEnterpriseTrustAutomationExceptions()} />;
}
export const Route = createFileRoute("/v23/exception")({ component: Page });
