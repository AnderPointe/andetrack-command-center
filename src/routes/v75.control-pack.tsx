import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useRegulatedControlPack } from "@/v75/hooks";

export const Route = createFileRoute("/v75/control-pack")({
  head: () => ({ meta: [{ title: "Regulated Control Pack · V7.5 · Anderoute" }] }),
  component: () => {
    const { sections, summary } = useRegulatedControlPack();
    return (
      <V75Page icon={<FileText className="size-6 text-indigo-300" />} title="Regulated Customer Control Pack"
        blurb="14-section control pack: security, privacy, access, AI usage, retention, incident response, API/EDI/mobile, support, audit logging, business continuity, subprocessor placeholders.">
        <KpiGrid cols={4} items={[
          { label: "Drafted",     value: summary.drafted, sub: `of ${summary.total}` },
          { label: "In review",   value: summary.in_review },
          { label: "Placeholder", value: summary.placeholder, sub: "Not asserted" },
          { label: "Next review", value: summary.next_review, sub: summary.signoff_owners.join(" · ") },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={sections as any} columns={[
            { key: "section", label: "Section" },
            { key: "status",  label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
          Export to PDF / DOCX is a placeholder. Approval workflow requires {summary.signoff_owners.join(" + ")} sign-off before customer share.
        </Card>
      </V75Page>
    );
  },
});
