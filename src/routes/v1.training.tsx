import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TRAINING_GUIDES } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/training")({
  head: () => ({ meta: [{ title: "Training Library · Anderoute" }] }),
  component: Page,
});

function Page() {
  const roles = ["admin", "dispatcher", "driver", "customer"] as const;
  return (
    <V1Page
      icon={<GraduationCap className="size-6 text-indigo-300" />}
      title="V1 Training Library"
      blurb="Refreshed role-based quick-starts informed by pilot training feedback."
    >
      {roles.map((role) => {
        const items = TRAINING_GUIDES.filter((g) => g.role === role);
        if (!items.length) return null;
        return (
          <Card key={role} className="border-white/10 bg-white/[0.02] p-4">
            <h2 className="text-sm font-semibold capitalize">{role} guides</h2>
            <div className="mt-3 space-y-2">
              {items.map((g) => (
                <div key={g.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
                  <span>{g.title}</span>
                  <Badge variant="outline" className="border-white/15 text-muted-foreground">{g.minutes} min</Badge>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </V1Page>
  );
}
