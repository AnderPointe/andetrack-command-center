import { createFileRoute } from "@tanstack/react-router";
import { GitBranch } from "lucide-react";
import { ControlPage } from "@/components/v22/ControlPage";
import * as H from "@/v22/hooks";
function Page() { return <ControlPage icon={<GitBranch className="size-6 text-emerald-300" />} title="Partner Trust Automation Governance Center" blurb="Qualification → onboarding → integration → enablement → campaign → joint customer → evidence → support → renewal → offboarding. HITL on publishing + comms." data={H.usePartnerTrustAutomationGovernance()} />; }
export const Route = createFileRoute("/v22/partner")({ component: Page });
