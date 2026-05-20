import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/v11/demo")({
  head: () => ({ meta: [{ title: "V1.1 Demo Flow · Anderoute" }] }),
  component: Page,
});

const STEPS = [
  "Company admin opens V1.1 dashboard.",
  "Admin imports 20 drivers via CSV import wizard.",
  "Admin imports 15 vehicles.",
  "Admin activates the Growth trial billing plan.",
  "Dispatcher opens the improved load board.",
  "Dispatcher filters by delayed loads + cargo vans.",
  "Dispatcher creates a new load.",
  "ETA engine calculates the delivery window status.",
  "Driver accepts the load on mobile.",
  "Driver goes offline before loading.",
  "Driver marks loaded while offline.",
  "Action queues with an idempotency key.",
  "Network returns; queue auto-flushes.",
  "Action syncs successfully.",
  "Customer portal timeline updates with the new status.",
  "Notification delivery dashboard shows customer update sent.",
  "CoPilot rules-based assistant summarizes loads needing attention.",
  "Billing usage meter updates driver + load counts.",
  "V1.1 security review still shows passing checks.",
];

function Page() {
  return (
    <V11Page
      icon={<ListChecks className="size-6 text-fuchsia-300" />}
      title="V1.1 Demo Flow"
      blurb="Single end-to-end scenario that exercises every V1.1 surface: imports, billing, ETA, offline sync, portal, notifications, CoPilot, and security."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-1.5 text-sm">
          {STEPS.map((s, i) => (
            <li key={i} className="flex gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <span className="font-mono text-xs text-fuchsia-300">{String(i + 1).padStart(2, "0")}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </Card>
    </V11Page>
  );
}
