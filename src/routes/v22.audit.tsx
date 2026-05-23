import { createFileRoute } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { ControlPage } from "@/components/v22/ControlPage";
import * as H from "@/v22/hooks";
function Page() { return <ControlPage icon={<FileSearch className="size-6 text-emerald-300" />} title="Trust Audit Lifecycle Governance Center" blurb="Scheduled → owner → evidence → finding → risk → remediation → retest → board visibility → closed. 15 audit domains." data={H.useTrustAuditLifecycleGovernance()} />; }
export const Route = createFileRoute("/v22/audit")({ component: Page });
