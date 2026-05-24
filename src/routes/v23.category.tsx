import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v23/ControlPage";
import * as H from "@/v23/hooks";
function Page() {
  return <ControlPage icon={<Megaphone className="size-6 text-emerald-300" />} title="Category Trust Automation Leadership" blurb="V23 Category Trust Automation Leadership — HITL-gated, append-only evidence, RBAC + RLS enforced." data={H.useCategoryTrustAutomationLeadership()} />;
}
export const Route = createFileRoute("/v23/category")({ component: Page });
