import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { V11_SCOPE } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/scope")({
  head: () => ({ meta: [{ title: "V1.1 Scope · Anderoute" }] }),
  component: Page,
});

function Page() {
  const inScope = V11_SCOPE.filter((s) => s.status === "in_v11");
  const deferred = V11_SCOPE.filter((s) => s.status === "deferred");
  return (
    <V11Page
      icon={<Layers className="size-6 text-fuchsia-300" />}
      title="V1.1 Scope Board"
      blurb="Sharp scope decisions: what ships in V1.1, what is deferred. Each item carries a value/effort score to prevent silent scope creep."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">In V1.1 ({inScope.length})</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {inScope.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div>
                <div>{s.title}</div>
                <div className="text-xs text-muted-foreground">{s.area} · value {s.value}/5 · effort {s.effort}/5</div>
              </div>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">In V1.1</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Deferred ({deferred.length})</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {deferred.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div>
                <div>{s.title}</div>
                <div className="text-xs text-muted-foreground">{s.area} · {s.note}</div>
              </div>
              <Badge variant="outline" className="border-amber-500/30 text-amber-300">Deferred</Badge>
            </div>
          ))}
        </div>
      </Card>
    </V11Page>
  );
}
