import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { ControlPage } from "@/components/v23/ControlPage";
import * as H from "@/v23/hooks";
function Page() {
  return <ControlPage icon={<Radar className="size-6 text-emerald-300" />} title="Outcome Automation Intelligence" blurb="V23 Outcome Automation Intelligence — HITL-gated, append-only evidence, RBAC + RLS enforced." data={H.useOutcomeAutomationIntelligence()} />;
}
export const Route = createFileRoute("/v23/outcome")({ component: Page });
