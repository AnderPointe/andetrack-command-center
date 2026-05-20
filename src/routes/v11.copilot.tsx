import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COPILOT_RULES } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/copilot")({
  head: () => ({ meta: [{ title: "V1.1 CoPilot Rules · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <V11Page
      icon={<Sparkles className="size-6 text-fuchsia-300" />}
      title="CoPilot V1.1 — Rules-Based Assistant"
      blurb="Improved deterministic answers for dispatchers. No real AI yet — labels clearly state rules-based. Real LLM lands in V1.5."
    >
      <Card className="border-amber-500/30 bg-amber-500/[0.04] p-3 text-sm text-amber-100/90">
        <Badge variant="outline" className="border-amber-500/40 text-amber-300">Rules-based</Badge>{" "}
        Powered by deterministic rules and live operational context — not a language model.
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Supported questions</h2>
        <div className="mt-3 space-y-2 text-sm">
          {COPILOT_RULES.map((r) => (
            <div key={r.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="font-medium">{r.question}</div>
              <div className="mt-1 text-muted-foreground">{r.answer}</div>
              <div className="mt-1.5 flex gap-1.5">
                {r.tags.map((t) => (
                  <Badge key={t} variant="outline" className="border-white/15 text-xs text-muted-foreground">{t}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </V11Page>
  );
}
