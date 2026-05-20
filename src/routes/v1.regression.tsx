import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { REGRESSION_TESTS } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/regression")({
  head: () => ({ meta: [{ title: "V1 Regression · Anderoute" }] }),
  component: Page,
});

const TONE: Record<string, string> = {
  pass:    "border-emerald-500/30 text-emerald-300",
  fail:    "border-rose-500/30 text-rose-300",
  pending: "border-amber-500/30 text-amber-300",
};

function Page() {
  const pass = REGRESSION_TESTS.filter((t) => t.status === "pass").length;
  return (
    <V1Page
      icon={<FlaskConical className="size-6 text-indigo-300" />}
      title="V1 Regression Plan"
      blurb={`Core workflows must pass before V1 GA. Currently ${pass}/${REGRESSION_TESTS.length} green.`}
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="space-y-2">
          {REGRESSION_TESTS.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                <span>{t.workflow}</span>
              </div>
              <Badge variant="outline" className={TONE[t.status]}>{t.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </V1Page>
  );
}
