import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { Progress } from "@/components/ui/progress";
import { CERTIFICATION_PROJECTS } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/certification")({
  head: () => ({ meta: [{ title: "Certification Execution · Anderoute" }] }),
  component: () => (
    <V45Page icon={<FileCheck2 className="size-6 text-violet-300" />} title="Enterprise Certification Execution"
      blurb="Tracked work toward SOC 2, ISO 27001 placeholder, pen test, privacy, mobile/API/EDI reviews, IR tabletop, backup/restore, and access reviews. No completion claims without auditor evidence.">
      <SimpleTable rows={CERTIFICATION_PROJECTS} columns={[
        { key: "name", label: "Project" },
        { key: "owner", label: "Owner" },
        { key: "due", label: "Due" },
        { key: "progress", label: "Progress", render: r => (
          <div className="w-40"><Progress value={r.progress} className="h-1.5" /><div className="text-[10px] text-muted-foreground mt-1">{r.progress}%</div></div>
        )},
        { key: "status", label: "Status", render: r => <StatusPill status={r.status} /> },
      ]} />
    </V45Page>
  ),
});
