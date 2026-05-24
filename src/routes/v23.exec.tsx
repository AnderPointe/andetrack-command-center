import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { ControlPage } from "@/components/v23/ControlPage";
import * as H from "@/v23/hooks";
function Page() {
  return <ControlPage icon={<Briefcase className="size-6 text-emerald-300" />} title="Executive Trust Automation Command" blurb="V23 Executive Trust Automation Command — HITL-gated, append-only evidence, RBAC + RLS enforced." data={H.useExecutiveTrustAutomationCommand()} />;
}
export const Route = createFileRoute("/v23/exec")({ component: Page });
