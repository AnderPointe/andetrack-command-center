import { createFileRoute } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { ControlPage } from "@/components/v23/ControlPage";
import * as H from "@/v23/hooks";
function Page() {
  return <ControlPage icon={<FileSearch className="size-6 text-emerald-300" />} title="Trust Audit Automation Network" blurb="V23 Trust Audit Automation Network — HITL-gated, append-only evidence, RBAC + RLS enforced." data={H.useTrustAuditAutomationNetwork()} />;
}
export const Route = createFileRoute("/v23/audit")({ component: Page });
