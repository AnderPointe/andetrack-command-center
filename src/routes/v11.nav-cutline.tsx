import { createFileRoute } from "@tanstack/react-router";
import { Scissors } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NAV_V11_CUTLINE, NAV_RISKS } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/nav-cutline")({
  head: () => ({ meta: [{ title: "Navigation V1.1 Cutline · Anderoute" }] }),
  component: Page,
});

const sevTone: Record<string, string> = {
  high:   "border-rose-500/30 text-rose-300",
  medium: "border-amber-500/30 text-amber-300",
  low:    "border-sky-500/30 text-sky-300",
};

function Page() {
  return (
    <V11Page
      icon={<Scissors className="size-6 text-fuchsia-300" />}
      title="Real Navigation Cutline"
      blurb="Clear line between what real navigation means in V1.1 and what is deferred. Prevents partial native rollout from blocking the release."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">In V1.1</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {NAV_V11_CUTLINE.inV11.map((x) => (
              <li key={x} className="flex items-center gap-2"><span className="text-emerald-300">✓</span> {x}</li>
            ))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">Deferred (V1.5+)</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {NAV_V11_CUTLINE.deferred.map((x) => (
              <li key={x} className="flex items-center gap-2 text-muted-foreground"><span className="text-amber-300">·</span> {x}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Risk register</h2>
        <div className="mt-3 space-y-2">
          {NAV_RISKS.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div>
                <div>{r.label}</div>
                <div className="text-xs text-muted-foreground">Mitigation: {r.mitigation}</div>
              </div>
              <Badge variant="outline" className={sevTone[r.severity]}>{r.severity}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </V11Page>
  );
}
