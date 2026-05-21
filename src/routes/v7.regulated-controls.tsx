import { createFileRoute } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable, StatusPill, ScoreCard } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useRegulatedEnterpriseControls } from "@/v7/hooks";

export const Route = createFileRoute("/v7/regulated-controls")({
  head: () => ({ meta: [{ title: "Regulated Controls · V7 · Anderoute" }] }),
  component: () => {
    const { controls, exceptions } = useRegulatedEnterpriseControls();
    const pass = controls.filter(c => c.status === "pass").length;
    return (
      <V7Page icon={<Shield className="size-6 text-indigo-300" />} title="Regulated Enterprise Controls Center"
        blurb="16 control areas: access, privacy, retention, audit logging, financial, AI governance, vendor risk, incident response, change management, evidence collection, policy ack.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Controls passing" value={Math.round((pass / controls.length) * 100)} tone="emerald" />
          <ScoreCard label="Coverage"         value={100} tone="sky" />
          <ScoreCard label="Open exceptions"  value={Math.round((exceptions.length / controls.length) * 100)} tone="rose" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Control matrix</h3>
          <div className="mt-2">
            <SimpleTable rows={controls as any} columns={[
              { key: "area",     label: "Area" },
              { key: "owner",    label: "Owner" },
              { key: "freq",     label: "Freq" },
              { key: "evidence", label: "Evidence", render: (r: any) => <StatusPill status={r.evidence} /> },
              { key: "status",   label: "Status",   render: (r: any) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Exception queue</h3>
          <div className="mt-2">
            <SimpleTable rows={exceptions as any} columns={[
              { key: "control",  label: "Control" },
              { key: "owner",    label: "Owner" },
              { key: "age_days", label: "Age (d)" },
              { key: "severity", label: "Severity", render: (r: any) => <StatusPill status={r.severity} /> },
              { key: "note",     label: "Note" },
            ]} />
          </div>
        </Card>
      </V7Page>
    );
  },
});
