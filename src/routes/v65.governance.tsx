import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { SimpleTable } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useStrategicGovernance } from "@/v65/hooks";

export const Route = createFileRoute("/v65/governance")({
  head: () => ({ meta: [{ title: "Strategic Governance · V6.5 · Anderoute" }] }),
  component: () => {
    const { domains, decisions } = useStrategicGovernance();
    return (
      <V65Page icon={<Crown className="size-6 text-cyan-300" />} title="Strategic Governance Center"
        blurb="Board, executive, financial, product, marketplace, AI, security, compliance, partner, data, risk, and roadmap governance with cadence + decision log.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Governance domains</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {domains.map(d => (
              <div key={d.domain} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>{d.domain}</span>
                  <span className="font-mono text-xs">{d.score}</span>
                </div>
                <Progress value={d.score} className="mt-2 h-1" />
                <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{d.cadence}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Recent governance decisions</h3>
          <div className="mt-2">
            <SimpleTable rows={decisions} columns={[
              { key: "date",     label: "Date" },
              { key: "domain",   label: "Domain" },
              { key: "decision", label: "Decision" },
              { key: "outcome",  label: "Outcome" },
            ]} />
          </div>
        </Card>
      </V65Page>
    );
  },
});
