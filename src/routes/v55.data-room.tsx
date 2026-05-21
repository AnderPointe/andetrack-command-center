import { createFileRoute } from "@tanstack/react-router";
import { FolderArchive } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { SimpleTable, StatusPill } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAdvancedDataRoom, useDataRoomProgress } from "@/v55/hooks";

export const Route = createFileRoute("/v55/data-room")({
  head: () => ({ meta: [{ title: "Data Room · Anderoute V5.5" }] }),
  component: () => {
    const { items, requests } = useAdvancedDataRoom();
    const progress = useDataRoomProgress();
    return (
      <V55Page icon={<FolderArchive className="size-6 text-amber-300" />} title="Advanced Data Room & Due Diligence"
        blurb="Product, architecture, security, compliance, customers, revenue, marketplace, partners, roadmap, support, legal (placeholder), financial (placeholder), risks, metrics, references, technical docs.">
        <div className="grid gap-3 md:grid-cols-4 text-sm">
          <Card className="border-amber-400/30 bg-white/[0.02] p-4">
            <div className="text-[10px] uppercase text-muted-foreground">Overall readiness</div>
            <div className="mt-1 text-2xl font-semibold">{progress.pct}%</div>
            <Progress value={progress.pct} className="mt-2 h-1.5" />
            <div className="mt-1 text-[11px] text-muted-foreground">{progress.complete}/{progress.total} sections complete</div>
          </Card>
          <Card className="border-emerald-400/30 bg-white/[0.02] p-4"><div className="text-xs uppercase text-muted-foreground">Complete</div><div className="text-2xl">{progress.complete}</div></Card>
          <Card className="border-sky-400/30 bg-white/[0.02] p-4"><div className="text-xs uppercase text-muted-foreground">In progress</div><div className="text-2xl">{progress.in_progress}</div></Card>
          <Card className="border-amber-400/30 bg-white/[0.02] p-4"><div className="text-xs uppercase text-muted-foreground">Placeholder</div><div className="text-2xl">{progress.placeholder}</div></Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Section status</h3>
          <div className="mt-2">
            <SimpleTable rows={items} columns={[
              { key: "section", label: "Section" },
              { key: "status",  label: "Status", render: (r) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Due diligence requests</h3>
          <div className="mt-2">
            <SimpleTable rows={requests} columns={[
              { key: "id",     label: "ID" },
              { key: "from",   label: "From" },
              { key: "topic",  label: "Topic" },
              { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
      </V55Page>
    );
  },
});
