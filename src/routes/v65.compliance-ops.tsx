import { createFileRoute } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useComplianceControlOperations } from "@/v65/hooks";

export const Route = createFileRoute("/v65/compliance-ops")({
  head: () => ({ meta: [{ title: "Compliance Ops · V6.5 · Anderoute" }] }),
  component: () => {
    const { rows } = useComplianceControlOperations();
    return (
      <V65Page icon={<Scale className="size-6 text-cyan-300" />} title="Compliance Control Operations"
        blurb="Access, retention, privacy, security logging, incident response, vendor management, API / EDI / mobile security, AI governance, financial + marketplace controls.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="grid gap-2 md:grid-cols-3">
            {rows.map(r => (
              <div key={r.area} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>{r.area}</span>
                  <span className="font-mono text-xs">{r.score}</span>
                </div>
                <Progress value={r.score} className="mt-2 h-1" />
                <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                  {r.exceptions} exception{r.exceptions === 1 ? "" : "s"}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </V65Page>
    );
  },
});
