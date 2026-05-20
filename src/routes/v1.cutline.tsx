import { createFileRoute } from "@tanstack/react-router";
import { Scissors } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { V1_FEATURES, PRIORITY_LABEL, PRIORITY_TONE, type V1Priority } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/cutline")({
  head: () => ({ meta: [{ title: "V1 Cutline · Anderoute" }] }),
  component: Page,
});

const ORDER: V1Priority[] = ["must", "should", "nice", "post_v1", "enterprise_later"];

function Page() {
  return (
    <V1Page
      icon={<Scissors className="size-6 text-indigo-300" />}
      title="V1 Cutline"
      blurb="What ships in Anderoute V1 vs what is intentionally deferred to V1.5, V2, and Enterprise."
    >
      {ORDER.map((p) => {
        const items = V1_FEATURES.filter((f) => f.priority === p);
        return (
          <Card key={p} className="border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">{PRIORITY_LABEL[p]}</h2>
              <Badge variant="outline" className={PRIORITY_TONE[p]}>{items.length}</Badge>
            </div>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {items.map((f) => (
                <div key={f.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
                  <div>
                    <div>{f.name}</div>
                    <div className="text-[11px] text-muted-foreground">{f.area}</div>
                  </div>
                  <Badge variant="outline" className="border-white/15 text-muted-foreground">{f.status.replace("_", " ")}</Badge>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </V1Page>
  );
}
