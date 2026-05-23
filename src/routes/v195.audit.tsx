import { createFileRoute } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<FileSearch className="size-6 text-violet-300" />}
    title="Assurance Audit Optimization Center"
    blurb="15 audit areas optimized · schedule · finding reduction · remediation speed · evidence completeness · board-visible findings · readiness."
    data={H.useAssuranceAuditOptimization()} scoreLabel="Audit optimization" />;
}
export const Route = createFileRoute("/v195/audit")({ component: Page });
