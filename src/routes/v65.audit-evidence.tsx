import { createFileRoute } from "@tanstack/react-router";
import { ArchiveRestore } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuditControlEvidence } from "@/v65/hooks";

export const Route = createFileRoute("/v65/audit-evidence")({
  head: () => ({ meta: [{ title: "Audit Evidence · V6.5 · Anderoute" }] }),
  component: () => {
    const { rows } = useAuditControlEvidence();
    return (
      <V65Page icon={<ArchiveRestore className="size-6 text-cyan-300" />} title="Audit Control Evidence Center"
        blurb="Billing, revenue, API, marketplace fee, EDI, security, access review, AI / automation approvals, support access, retention, incident response — freshness tracking. No certification is asserted.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="grid gap-2 md:grid-cols-2">
            {rows.map(r => (
              <div key={r.type} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>{r.type}</span>
                  <span className="font-mono text-xs">{r.freshness}%</span>
                </div>
                <Progress value={r.freshness} className="mt-2 h-1" />
                <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                  Last: {r.last} · Owner: {r.owner}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </V65Page>
    );
  },
});
