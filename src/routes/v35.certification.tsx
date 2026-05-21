import { createFileRoute } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CERT_PROJECTS, CERT_TASKS, CERT_GAPS, CERT_TIMELINE } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/certification")({
  head: () => ({ meta: [{ title: "Certification Execution · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<Award className="size-6 text-amber-300" />} title="Enterprise Certification Execution"
      blurb="Moving from readiness to execution: SOC 2 prep, pen test, vendor security review, privacy. No SOC 2 certification is claimed.">
      <Card className="border-amber-500/30 bg-amber-500/[0.04] p-3 text-sm text-amber-100/90">
        <Badge variant="outline" className="border-amber-500/40 text-amber-300">Not certified</Badge>{" "}
        SOC 2 / pen test / privacy reviews are in execution; no certification or attestation is implied.
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        {CERT_PROJECTS.map((p) => (
          <Card key={p.framework} className="border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between"><h3 className="font-semibold">{p.framework}</h3><Badge variant="outline" className="border-sky-500/40 text-sky-300">{p.status}</Badge></div>
            <Progress value={p.readiness} className="mt-2 h-1.5" />
            <div className="mt-1 text-xs text-muted-foreground">Target {p.target} · readiness {p.readiness}%</div>
          </Card>
        ))}
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Execution timeline</h3>
        <ul className="mt-2 space-y-1 text-sm">{CERT_TIMELINE.map((t) => (
          <li key={t.milestone} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
            <span>{t.milestone}</span>
            <span className="font-mono text-xs text-muted-foreground mr-2">{t.date}</span>
            <Badge variant="outline" className={t.status === "done" ? "border-emerald-500/40 text-emerald-300" : t.status === "in_progress" ? "border-sky-500/40 text-sky-300" : "border-amber-500/40 text-amber-300"}>{t.status}</Badge>
          </li>
        ))}</ul>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Task board</h3>
          <table className="mt-2 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Ctrl</th><th className="p-1">Task</th><th className="p-1">Owner</th><th className="p-1">Status</th></tr></thead>
            <tbody>{CERT_TASKS.map((t) => (
              <tr key={t.ctrl + t.title} className="border-t border-white/10"><td className="p-1 font-mono text-xs">{t.ctrl}</td><td className="p-1">{t.title}</td><td className="p-1 text-xs">{t.owner}</td><td className="p-1"><Badge variant="outline" className={t.status === "done" ? "border-emerald-500/40 text-emerald-300" : "border-sky-500/40 text-sky-300"}>{t.status}</Badge></td></tr>
            ))}</tbody>
          </table>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Open gaps</h3>
          <ul className="mt-2 space-y-1 text-sm">{CERT_GAPS.map((g) => (
            <li key={g.gap} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5"><span>{g.gap}</span><Badge variant="outline" className={g.severity === "medium" ? "border-amber-500/40 text-amber-300" : "border-sky-500/40 text-sky-300"}>{g.severity}</Badge></li>
          ))}</ul>
        </Card>
      </div>
    </V35Page>
  ),
});
