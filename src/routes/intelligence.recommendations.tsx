import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { IntelligenceNav } from "@/components/intelligence/IntelligenceNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, XCircle, Info } from "lucide-react";
import { useAIRecommendations } from "@/intelligence/hooks/useIntelligence";
import { useState } from "react";

export const Route = createFileRoute("/intelligence/recommendations")({
  head: () => ({ meta: [{ title: "AI Recommendations — Anderoute Intelligence" }] }),
  component: RecommendationsPage,
});

function RecommendationsPage() {
  const { recommendations } = useAIRecommendations();
  const [expanded, setExpanded] = useState<string | null>(recommendations[0]?.id ?? null);
  const [decisions, setDecisions] = useState<Record<string, "approved" | "rejected">>({});

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <Sparkles className="size-5 text-violet-300" />
            <h1 className="text-xl font-semibold">AI Recommendation Center</h1>
            <Badge variant="outline" className="border-violet-500/40 text-violet-200">Human-in-the-loop</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Every recommendation explains itself. High-impact actions require approval. All decisions
            are audited.
          </p>
          <IntelligenceNav />
        </header>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-2">
            {recommendations.map((r) => {
              const decided = decisions[r.id];
              const active = expanded === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setExpanded(r.id)}
                  className={`block w-full rounded-lg border p-3 text-left transition-colors ${
                    active ? "border-violet-500/40 bg-violet-500/5" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{r.title}</span>
                    <Badge variant="outline" className="border-white/15 text-[10px]">{r.confidence_pct}%</Badge>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.summary}</p>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span>Approval: <span className="text-foreground">{r.approval_required}</span></span>
                    <span>·</span>
                    <span>Risk -{r.risk_reduced_pct}%</span>
                    {decided && (
                      <Badge variant="outline" className={decided === "approved" ? "border-emerald-500/30 text-emerald-300" : "border-rose-500/30 text-rose-300"}>
                        {decided}
                      </Badge>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div>
            {(() => {
              const r = recommendations.find((x) => x.id === expanded);
              if (!r) return <Card className="border-white/10 bg-white/[0.02] p-6 text-sm text-muted-foreground">Select a recommendation.</Card>;
              const e = r.explanation;
              return (
                <Card className="border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">{r.title}</h2>
                      <p className="text-xs text-muted-foreground">Linked load: {r.impacted_load_id ?? "—"}</p>
                    </div>
                    <Badge variant="outline" className="border-violet-500/40 text-violet-200">{r.confidence_pct}% confidence</Badge>
                  </div>

                  <dl className="mt-4 space-y-3 text-sm">
                    <ExplainRow label="What I noticed" value={e.what_i_noticed} />
                    <ExplainRow label="Why it matters" value={e.why_it_matters} />
                    <ExplainRow label="Data used" value={e.data_used.join(", ")} />
                    <ExplainRow label="Confidence" value={e.confidence_label} />
                    <ExplainRow label="Recommended action" value={e.recommended_action} />
                    <ExplainRow label="Risk if ignored" value={e.risk_if_ignored} tone="warn" />
                    <ExplainRow label="Approval required" value={e.human_approval_needed} />
                  </dl>

                  <div className="mt-4 rounded-md border border-white/10 bg-black/20 p-3 text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Info className="size-3" /> One-click preview
                    </div>
                    <div className="mt-1 text-foreground">{r.one_click_action_label}</div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setDecisions((d) => ({ ...d, [r.id]: "approved" }))}
                      className="bg-emerald-600 hover:bg-emerald-500"
                    >
                      <CheckCircle2 className="mr-1 size-3.5" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDecisions((d) => ({ ...d, [r.id]: "rejected" }))}
                      className="border-rose-500/30 text-rose-300 hover:bg-rose-500/10"
                    >
                      <XCircle className="mr-1 size-3.5" /> Reject
                    </Button>
                  </div>
                </Card>
              );
            })()}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ExplainRow({ label, value, tone }: { label: string; value: string; tone?: "warn" }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className={`text-sm ${tone === "warn" ? "text-amber-200" : "text-foreground"}`}>{value}</dd>
    </div>
  );
}
