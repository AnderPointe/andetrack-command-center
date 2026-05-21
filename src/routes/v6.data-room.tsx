import { createFileRoute } from "@tanstack/react-router";
import { FolderArchive } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { SimpleTable, StatusPill, ScoreCard } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { useAdvancedInvestorDataRoom } from "@/v6/hooks";

export const Route = createFileRoute("/v6/data-room")({
  head: () => ({ meta: [{ title: "Investor Data Room · V6" }] }),
  component: () => {
    const { sections, requests } = useAdvancedInvestorDataRoom();
    const complete = sections.filter(s => s.status === "complete").length;
    const inProg = sections.filter(s => s.status === "in_progress").length;
    const pl = sections.filter(s => s.status === "placeholder").length;
    const readiness = Math.round(((complete + inProg * 0.5) / sections.length) * 100);
    return (
      <V6Page icon={<FolderArchive className="size-6 text-emerald-300" />} title="Advanced Investor / Acquirer Data Room"
        blurb="Company, product, architecture, security, compliance, customer, marketplace, partner, roadmap, operating model, board, references, risks, legal, financial, and diligence sections.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Readiness" value={readiness} tone="emerald" />
          <ScoreCard label="Complete" value={Math.round(complete/sections.length*100)} tone="sky" />
          <ScoreCard label="In progress" value={Math.round(inProg/sections.length*100)} tone="amber" />
          <ScoreCard label="Placeholder" value={Math.round(pl/sections.length*100)} tone="rose" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={sections} columns={[
            { key: "section", label: "Section" },
            { key: "status",  label: "Status", render: (r) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Due-diligence requests</h3>
          <div className="mt-2">
            <SimpleTable rows={requests} columns={[
              { key: "who",    label: "From" },
              { key: "topic",  label: "Topic" },
              { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
              { key: "due",    label: "Due" },
            ]} />
          </div>
        </Card>
      </V6Page>
    );
  },
});
