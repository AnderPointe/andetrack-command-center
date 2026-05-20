import { createFileRoute } from "@tanstack/react-router";
import { CloudOff } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OFFLINE_QUEUE } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/offline")({
  head: () => ({ meta: [{ title: "V1.1 Offline & Sync · Anderoute" }] }),
  component: Page,
});

const stateTone: Record<string, string> = {
  synced:  "border-emerald-500/30 text-emerald-300",
  syncing: "border-sky-500/30 text-sky-300",
  queued:  "border-amber-500/30 text-amber-300",
  failed:  "border-rose-500/30 text-rose-300",
};

function Page() {
  const synced = OFFLINE_QUEUE.filter((e) => e.state === "synced").length;
  const failed = OFFLINE_QUEUE.filter((e) => e.state === "failed").length;
  const pending = OFFLINE_QUEUE.length - synced - failed;
  return (
    <V11Page
      icon={<CloudOff className="size-6 text-fuchsia-300" />}
      title="Offline & Sync Improvements"
      blurb="Idempotency keys, preserved order, retry policy, and clear feedback when critical actions are still queued. Prevents duplicate delivered status."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Synced" value={synced} tone="good" />
        <StatTile label="Pending" value={pending} tone="warn" />
        <StatTile label="Failed" value={failed} tone={failed ? "bad" : "good"} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Queue</h2>
        <div className="mt-3 space-y-2 text-sm">
          {OFFLINE_QUEUE.map((e) => (
            <div key={e.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs text-muted-foreground">{e.id}</span> · {e.kind} · {e.driver}
                </div>
                <Badge variant="outline" className={stateTone[e.state]}>{e.state}</Badge>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                captured {e.capturedAt} · retries {e.retryCount} · key <span className="font-mono">{e.idempotencyKey}</span>
              </div>
              {e.note && <div className="mt-1 text-xs text-rose-200/90">{e.note}</div>}
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
        <h2 className="font-semibold text-foreground">Rules</h2>
        <ul className="mt-2 list-disc pl-5">
          <li>Idempotency keys per action prevent duplicates on retry.</li>
          <li>Order preserved per driver to avoid out-of-sequence status.</li>
          <li>POD and delivered status warn the driver if still queued.</li>
          <li>Failed events surface a conflict resolution drawer.</li>
        </ul>
      </Card>
    </V11Page>
  );
}
