import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RISK_ROWS, RISK_FACTORS } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/risk")({
  head: () => ({ meta: [{ title: "Predictive Risk · Anderoute" }] }),
  component: Page,
});

const tone: Record<string, string> = {
  low: "border-white/15 text-muted-foreground",
  moderate: "border-sky-500/30 text-sky-300",
  high: "border-amber-500/30 text-amber-300",
  critical: "border-rose-500/30 text-rose-300",
};

const trendIcon: Record<string, string> = { up: "▲", flat: "▬", down: "▼" };

function Page() {
  return (
    <V2Page
      icon={<AlertTriangle className="size-6 text-violet-300" />}
      title="Predictive Risk Scoring"
      blurb="13 risk kinds across loads, drivers, customers, integrations, billing, EDI, and webhooks. Each risk shows its score, trend, explanation, and a recommended action — never auto-executed."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Critical risk queue</h2>
        <div className="mt-3 space-y-2 text-sm">
          {RISK_ROWS.slice().sort((a, b) => b.score - a.score).map((r) => (
            <div key={r.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="font-medium">{r.subject} · <span className="text-xs uppercase tracking-wide text-muted-foreground">{r.kind.replace(/_/g, " ")}</span></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{trendIcon[r.trend]} trend</span>
                  <Badge variant="outline" className={tone[r.level]}>{r.level} · {r.score}</Badge>
                </div>
              </div>
              <Progress value={r.score} className="mt-2 h-1" />
              <div className="mt-2 text-xs text-muted-foreground">{r.explanation}</div>
              {RISK_FACTORS[r.id] && (
                <div className="mt-2 space-y-1 rounded-md border border-white/10 bg-black/30 p-2">
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Factor breakdown</div>
                  {RISK_FACTORS[r.id].map((f) => (
                    <div key={f.label} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{f.label} <span className="text-foreground/60">— {f.signal}</span></span>
                      <span className="font-mono text-violet-300">{f.weight}%</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-2 text-xs text-violet-200">Recommended: {r.recommended}</div>
            </div>
          ))}
        </div>
      </Card>
    </V2Page>
  );
}
