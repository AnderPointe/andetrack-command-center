import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FEEDBACK, type FeedbackStatus } from "@/v1/data/mockPhase14";

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

function Page() {
  const grouped = FEEDBACK.reduce<Record<string, typeof FEEDBACK>>((acc, f) => {
    (acc[f.source] ??= []).push(f);
    return acc;
  }, {});
  return (
    <V1Page
      icon={<MessageSquare className="size-6 text-indigo-300" />}
      title="Feedback Management System"
      blurb="Dispatcher, driver, customer, and internal feedback grouped by source with severity, frequency, business impact, and triage status."
    >
      {Object.entries(grouped).map(([source, items]) => (
        <Card key={source} className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold capitalize">{source} feedback</h2>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">{items.length} items</Badge>
          </div>
          <div className="mt-3 space-y-2">
            {items.map((f) => (
              <div key={f.id} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{f.id}</span>
                    <Badge variant="outline" className="border-white/15 text-muted-foreground">{f.category}</Badge>
                    <span>{f.title}</span>
                  </div>
                  <Badge variant="outline" className={STATUS_TONE[f.status]}>{f.status.replace("_", " ")}</Badge>
                </div>
                <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-muted-foreground">
                  <span>severity: {f.severity}</span>
                  <span>· freq: {f.frequency}</span>
                  <span>· impact: {f.impact}</span>
                </div>
                {f.quote && <div className="mt-1 text-xs italic text-muted-foreground">"{f.quote}"</div>}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </V1Page>
  );
}
