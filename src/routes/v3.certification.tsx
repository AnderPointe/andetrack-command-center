import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CERT_READINESS } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/certification")({
  head: () => ({ meta: [{ title: "Certification Readiness · Anderoute V3" }] }),
  component: () => {
    const avg = Math.round(CERT_READINESS.reduce((s, c) => s + c.score, 0) / CERT_READINESS.length);
    return (
      <V3Page icon={<ShieldCheck className="size-6 text-sky-300" />} title="Enterprise Certification Readiness"
        blurb="SOC 2 readiness preparation, pen test plan, mobile security review, data retention, access control, and incident response. Not certified — readiness only.">
        <Card className="border-amber-500/30 bg-amber-500/[0.04] p-4 text-sm">
          <strong className="text-amber-200">Disclaimer:</strong>
          <span className="ml-2 text-muted-foreground">Anderoute is not SOC 2 certified. This dashboard tracks readiness only.</span>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Overall readiness</h2><Badge variant="outline" className="border-sky-500/40 text-sky-300">{avg}%</Badge></div>
          <Progress value={avg} className="mt-3 h-1.5" />
          <div className="mt-4 grid gap-2 md:grid-cols-3">{CERT_READINESS.map((c) => (
            <div key={c.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between"><span>{c.area}</span><span className="font-mono text-xs">{c.score}</span></div>
              <Progress value={c.score} className="mt-2 h-1" />
              <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{c.status.replace("_", " ")}</div>
            </div>
          ))}</div>
        </Card>
      </V3Page>
    );
  },
});
