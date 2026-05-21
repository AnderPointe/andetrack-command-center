import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { COMPLIANCE_TASKS, COMPLIANCE_EXCEPTIONS, COMPLIANCE_KPIS } from "@/v4/data/mockPhase21";

const STATUS_TONE: Record<string,string> = {
  done: "border-emerald-400/40 text-emerald-300",
  in_progress: "border-sky-400/40 text-sky-300",
  planned: "border-white/15",
};

export const Route = createFileRoute("/v4/compliance")({
  head: () => ({ meta: [{ title: "Compliance Ops · Anderoute" }] }),
  component: () => (
    <V4Page icon={<ShieldCheck className="size-6 text-sky-300" />} title="Compliance Operations Center"
      blurb="Access reviews, retention, vendor reviews, DR testing, audit trails and security questionnaire responses.">
      <div className="grid gap-3 md:grid-cols-5">
        {Object.entries(COMPLIANCE_KPIS).map(([k,v]) => (
          <Card key={k} className="border-white/10 bg-white/[0.02] p-3">
            <div className="text-[10px] uppercase text-muted-foreground">{k.replace(/_/g," ")}</div>
            <div className="mt-1 text-lg font-semibold">{v}{k.endsWith("pct") ? "%" : ""}</div>
            {k === "evidence_coverage_pct" && <Progress value={v as number} className="mt-1 h-1" />}
          </Card>
        ))}
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Tasks</h3>
        <ul className="mt-2 space-y-1 text-sm">{COMPLIANCE_TASKS.map(t => (
          <li key={t.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
            <span>{t.area} <span className="text-xs text-muted-foreground">· due {t.due} · {t.owner}</span></span>
            <Badge variant="outline" className={STATUS_TONE[t.status] ?? "border-white/15"}>{t.status}</Badge>
          </li>))}
        </ul>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Exceptions</h3>
        <ul className="mt-2 space-y-1 text-sm">{COMPLIANCE_EXCEPTIONS.map(e => (
          <li key={e.id} className="rounded border border-amber-500/20 bg-amber-500/5 p-2">
            <div className="text-xs text-amber-300">{e.area} · expires {e.expires} · {e.status}</div>
            <div>{e.desc}</div>
          </li>))}
        </ul>
      </Card>
    </V4Page>
  ),
});
