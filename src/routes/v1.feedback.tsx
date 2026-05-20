import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FEEDBACK, feedbackStats, type FeedbackStatus } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/feedback")({
  head: () => ({ meta: [{ title: "Feedback Management · Anderoute" }] }),
  component: Page,
});

const STATUS_TONE: Record<FeedbackStatus, string> = {
  new:         "border-white/15 text-muted-foreground",
  reviewed:    "border-sky-500/30 text-sky-300",
  accepted:    "border-emerald-500/30 text-emerald-300",
  planned:     "border-violet-500/30 text-violet-300",
  in_progress: "border-indigo-500/30 text-indigo-300",
  released:    "border-teal-500/30 text-teal-300",
  declined:    "border-rose-500/30 text-rose-300",
};

const IMPACT_TONE: Record<string, string> = {
  high:   "border-amber-500/30 text-amber-300",
  medium: "border-sky-500/30 text-sky-300",
  low:    "border-white/15 text-muted-foreground",
};

function Page() {
  const stats = feedbackStats();
  const grouped = FEEDBACK.reduce<Record<string, typeof FEEDBACK>>((acc, f) => {
    (acc[f.source] ??= []).push(f);
    return acc;
  }, {});
  return (
    <V1Page
      icon={<MessageSquare className="size-6 text-indigo-300" />}
      title="Feedback Triage"
      blurb="Dispatcher, driver, customer, and internal feedback grouped by source with severity, frequency, business impact, and triage status."
    >
      <div className="grid gap-3 md:grid-cols-5">
        <StatTile label="Total" value={stats.total} />
        <StatTile label="New" value={stats.new} tone={stats.new ? "warn" : "good"} />
        <StatTile label="Accepted / planned" value={stats.accepted} tone="info" />
        <StatTile label="High impact" value={stats.highImpact} tone="warn" hint="value-driving asks" />
        <StatTile label="Released" value={stats.released} tone="good" />
      </div>
      {Object.entries(grouped).map(([source, items]) => (
        <Card key={source} className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold capitalize">{source} feedback</h2>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">{items.length} items</Badge>
          </div>
          <div className="mt-3 space-y-2">
            {items.map((f) => (
              <div key={f.id} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{f.id}</span>
                    <Badge variant="outline" className="border-white/15 text-muted-foreground">{f.category}</Badge>
                    <span>{f.title}</span>
                  </div>
                  <Badge variant="outline" className={STATUS_TONE[f.status]}>{f.status.replace("_", " ")}</Badge>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-1 text-[11px] text-muted-foreground">
                  <Badge variant="outline" className={IMPACT_TONE[f.impact]}>impact: {f.impact}</Badge>
                  <span>· severity: {f.severity}</span>
                  <span>· frequency: {f.frequency}</span>
                </div>
                {f.quote && <div className="mt-1 text-xs italic text-muted-foreground">&ldquo;{f.quote}&rdquo;</div>}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </V1Page>
  );
}
