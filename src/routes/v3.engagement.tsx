import { createFileRoute } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { DRIVER_PERFORMANCE, DRIVER_ANNOUNCEMENTS, DRIVER_FEEDBACK } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/engagement")({
  head: () => ({ meta: [{ title: "Driver Engagement · Anderoute V3" }] }),
  component: () => (
    <V3Page icon={<Award className="size-6 text-sky-300" />} title="Driver Engagement"
      blurb="Driver performance summaries, announcements, training reminders, and feedback inbox.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Performance (30d)</h2>
        <table className="mt-2 w-full text-sm"><thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Driver</th><th className="p-2">Loads</th><th className="p-2">On-time</th><th className="p-2">Status acc.</th><th className="p-2">POD</th><th className="p-2">Sync</th></tr></thead>
          <tbody>{DRIVER_PERFORMANCE.map((d) => (
            <tr key={d.driver} className="border-t border-white/10"><td className="p-2 font-mono text-xs">{d.driver}</td><td className="p-2 font-mono">{d.loads_30d}</td><td className="p-2 font-mono">{d.on_time_pct}%</td><td className="p-2 font-mono">{d.status_accuracy}%</td><td className="p-2 font-mono">{d.pod_completion}%</td><td className="p-2 font-mono">{d.sync_reliability}%</td></tr>
          ))}</tbody></table>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Announcements</h3>
          <ul className="mt-2 space-y-1.5 text-sm">{DRIVER_ANNOUNCEMENTS.map((a) => (
            <li key={a.id} className="rounded border border-white/10 bg-black/20 p-2"><div className="flex items-center justify-between"><span className="font-medium">{a.title}</span><span className="font-mono text-xs text-muted-foreground">{a.ts}</span></div><p className="mt-1 text-xs text-muted-foreground">{a.body}</p></li>
          ))}</ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Feedback inbox</h3>
          <ul className="mt-2 space-y-1.5 text-sm">{DRIVER_FEEDBACK.map((f) => (
            <li key={f.id} className="rounded border border-white/10 bg-black/20 p-2"><div className="flex items-center justify-between"><span className="font-mono text-xs">{f.driver} · {f.topic}</span><span className="font-mono text-xs text-muted-foreground">{f.ts}</span></div><p className="mt-1 text-xs text-muted-foreground">{f.text}</p></li>
          ))}</ul>
        </Card>
      </div>
    </V3Page>
  ),
});
