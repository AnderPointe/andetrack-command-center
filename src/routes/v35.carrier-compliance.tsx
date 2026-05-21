import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { COMPLIANCE_ALERTS, COMPLIANCE_SCORE_CARDS } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/carrier-compliance")({
  head: () => ({ meta: [{ title: "Carrier Compliance · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<ClipboardCheck className="size-6 text-amber-300" />} title="Carrier Compliance Automation (placeholder)"
      blurb="Document expiration, missing-document alerts, and per-carrier compliance scoring. Authority + safety ratings remain placeholder integrations.">
      <Card className="border-amber-500/30 bg-amber-500/[0.04] p-3 text-sm text-amber-100/90">
        <Badge variant="outline" className="border-amber-500/40 text-amber-300">Placeholder</Badge>{" "}
        Compliance signals are illustrative. Real DOT/FMCSA + insurance integrations are deferred.
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Alert queue</h3>
          <ul className="mt-2 space-y-1.5 text-sm">{COMPLIANCE_ALERTS.map((a) => (
            <li key={a.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
              <span>{a.carrier} — <span className="text-xs text-muted-foreground">{a.type}{a.days ? ` (${a.days}d)` : ""}</span></span>
              <Badge variant="outline" className={a.severity === "high" ? "border-rose-500/40 text-rose-300" : a.severity === "warn" ? "border-amber-500/40 text-amber-300" : "border-sky-500/40 text-sky-300"}>{a.severity}</Badge>
            </li>
          ))}</ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Compliance scorecards</h3>
          <div className="mt-2 space-y-2">{COMPLIANCE_SCORE_CARDS.map((c) => (
            <div key={c.carrier} className="rounded border border-white/10 bg-black/20 p-2">
              <div className="flex items-center justify-between text-sm"><span>{c.carrier}</span><span className="font-mono">{c.score}</span></div>
              <Progress value={c.score} className="mt-1 h-1.5" />
              <div className="mt-1 text-xs text-muted-foreground">Expiring: {c.expiring} · Missing: {c.missing}</div>
            </div>
          ))}</div>
        </Card>
      </div>
    </V35Page>
  ),
});
