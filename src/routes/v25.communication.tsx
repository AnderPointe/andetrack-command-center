import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CUSTOMER_COMM_DRAFTS, CUSTOMER_COMM_TYPES } from "@/v25/data/mockPhase18";

const tone: Record<string, string> = { pending_approval: "border-amber-500/30 text-amber-300", sent: "border-emerald-500/30 text-emerald-300", rejected: "border-rose-500/30 text-rose-300", approved: "border-sky-500/30 text-sky-300", failed: "border-rose-500/30 text-rose-300" };

export const Route = createFileRoute("/v25/communication")({
  head: () => ({ meta: [{ title: "Customer Communication · Anderoute" }] }),
  component: () => (
    <V25Page icon={<MessageSquare className="size-6 text-emerald-300" />} title="Customer Communication Automation" blurb="CoPilot drafts customer messages — dispatcher reviews, edits, approves. Nothing sends without explicit approval.">
      <Card className="border-white/10 bg-white/[0.02] p-3">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Supported types</div>
        <div className="mt-1 flex flex-wrap gap-1">{CUSTOMER_COMM_TYPES.map((t) => <Badge key={t} variant="outline" className="border-white/15 text-muted-foreground text-[10px]">{t}</Badge>)}</div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Approval queue</h2>
        <div className="mt-3 space-y-2">
          {CUSTOMER_COMM_DRAFTS.map((m) => (
            <div key={m.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <div><span className="font-medium">{m.customer}</span> <span className="text-xs text-muted-foreground">· {m.type} · {m.load} · {m.channel}</span></div>
                <Badge variant="outline" className={tone[m.status]}>{m.status.replace("_"," ")}</Badge>
              </div>
              <div className="mt-2 rounded border border-white/10 bg-black/30 p-2 text-xs text-muted-foreground">{m.draft}</div>
              <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{m.at}</div>
            </div>
          ))}
        </div>
      </Card>
    </V25Page>
  ),
});
