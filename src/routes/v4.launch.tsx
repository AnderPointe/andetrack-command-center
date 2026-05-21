import { createFileRoute } from "@tanstack/react-router";
import { Command } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { V4_READINESS, LAUNCH_MILESTONES, LAUNCH_BLOCKERS, LAUNCH_RISKS, LAUNCH_KPIS } from "@/v4/data/mockPhase21";

const STATUS_TONE: Record<string,string> = {
  done: "border-emerald-400/40 text-emerald-300",
  in_progress: "border-sky-400/40 text-sky-300",
  blocked: "border-amber-400/40 text-amber-300",
  planned: "border-white/15",
};

export const Route = createFileRoute("/v4/launch")({
  head: () => ({ meta: [{ title: "Enterprise Launch Center · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Command className="size-6 text-sky-300" />} title="Enterprise Launch Command Center"
      blurb="Live V4 enterprise launch readiness across product, security, mobile, marketplace, support, revenue and scaling.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Overall readiness</div>
            <div className="text-4xl font-semibold">{V4_READINESS.overall}%</div>
          </div>
          <Badge variant="outline" className="border-amber-400/40 text-amber-300">{LAUNCH_BLOCKERS.length} blockers</Badge>
        </div>
        <Progress value={V4_READINESS.overall} className="mt-3 h-2" />
        <div className="mt-4 grid gap-2 md:grid-cols-6">
          {LAUNCH_KPIS.map(k => (
            <div key={k.label} className="rounded border border-white/10 bg-black/20 p-2">
              <div className="text-[10px] uppercase text-muted-foreground">{k.label}</div>
              <div className="text-sm font-semibold">{k.value}</div>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid gap-3 md:grid-cols-3">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Milestones</h3>
          <ul className="mt-2 space-y-2 text-sm">{LAUNCH_MILESTONES.map(m => (
            <li key={m.id} className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate">{m.title}</div>
                <div className="text-[10px] text-muted-foreground">{m.owner} · due {m.due}</div>
              </div>
              <Badge variant="outline" className={`${STATUS_TONE[m.status] ?? "border-white/15"} text-xs`}>{m.status}</Badge>
            </li>))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold text-amber-300">Blockers</h3>
          <ul className="mt-2 space-y-2 text-sm">{LAUNCH_BLOCKERS.map(b => (
            <li key={b.id} className="rounded border border-amber-500/20 bg-amber-500/5 p-2">
              <div className="text-xs text-amber-300">{b.area} · {b.severity}</div>
              <div>{b.title}</div>
              <div className="text-xs text-muted-foreground">Owner: {b.owner}</div>
            </li>))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Risks</h3>
          <ul className="mt-2 space-y-2 text-sm">{LAUNCH_RISKS.map(r => (
            <li key={r.id} className="rounded border border-white/10 bg-black/20 p-2">
              <div className="font-medium">{r.title}</div>
              <div className="text-xs text-muted-foreground">L:{r.likelihood} · I:{r.impact} · {r.mitigation}</div>
            </li>))}
          </ul>
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Executive summary</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          V4 launch is on track at 84%. Three open blockers: Android Auto safety testing (Mobile), strategic telematics integration in security review (Integrations), and a Southeast carrier coverage gap (Network). Revenue ops and support readiness are above 80%. No autonomous-dispatch features are in scope; SOC 2, Android Auto, and CarPlay claims remain pending evidence and entitlement approval.
        </p>
      </Card>
    </V4Page>
  ),
});
