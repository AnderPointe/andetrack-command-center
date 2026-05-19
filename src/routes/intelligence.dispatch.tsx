import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { IntelligenceNav } from "@/components/intelligence/IntelligenceNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BotMessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useAIRecommendations, useAIApprovalQueue } from "@/intelligence/hooks/useIntelligence";

export const Route = createFileRoute("/intelligence/dispatch")({
  head: () => ({ meta: [{ title: "Autonomous Dispatch Assistant — Anderoute" }] }),
  component: AutoDispatch,
});

const SUGGESTIONS = [
  "Find best driver for AR-2054",
  "Draft customer update for Apex Supply",
  "Summarize at-risk loads",
  "Identify idle drivers",
  "Draft shift handoff",
];

function AutoDispatch() {
  const { recommendations } = useAIRecommendations();
  const { queue } = useAIApprovalQueue();
  const [input, setInput] = useState("");
  const [thread, setThread] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    {
      role: "assistant",
      text: "I'm Anderoute CoPilot's dispatch assistant. I propose actions — you approve them. Try a suggestion below.",
    },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const reply = buildReply(text, recommendations.length, queue.length);
    setThread((t) => [...t, { role: "user", text }, { role: "assistant", text: reply }]);
    setInput("");
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <BotMessageSquare className="size-5 text-indigo-300" />
            <h1 className="text-xl font-semibold">Autonomous Dispatch Assistant</h1>
            <Badge variant="outline" className="border-indigo-500/40 text-indigo-200">Approval required for high-impact</Badge>
          </div>
          <IntelligenceNav />
        </header>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
              {thread.map((m, i) => (
                <div key={i} className={`rounded-lg p-3 text-sm ${m.role === "assistant" ? "bg-indigo-500/10 text-foreground" : "bg-white/[0.04] text-foreground/90"}`}>
                  <div className="mb-1 text-[10px] uppercase tracking-wide text-muted-foreground">{m.role}</div>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted-foreground hover:border-white/25 hover:text-foreground">
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="mt-3 flex gap-2"
            >
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask the assistant…" />
              <Button type="submit" size="sm"><Send className="size-4" /></Button>
            </form>
          </Card>

          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-medium">Pending approvals</h3>
            <p className="text-xs text-muted-foreground">High-impact AI proposals waiting for human approval.</p>
            <div className="mt-3 space-y-2">
              {queue.length === 0 && <div className="text-xs text-muted-foreground">No approvals pending.</div>}
              {queue.map((r) => (
                <div key={r.id} className="rounded border border-white/10 bg-black/20 p-3 text-xs">
                  <div className="font-medium text-foreground">{r.title}</div>
                  <div className="text-muted-foreground">{r.approval_required} · {r.confidence_pct}% confidence</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function buildReply(prompt: string, recCount: number, queueCount: number) {
  const p = prompt.toLowerCase();
  if (p.includes("driver") && p.includes("ar-")) return `I'd suggest the closest matching driver with vehicle/CDL match. Confidence: medium. Sending recommendation to the approval queue (${queueCount + 1} pending) — requires dispatcher approval.`;
  if (p.includes("customer") || p.includes("update")) return "Drafted: \"Your shipment is being actively monitored — updated ETA shortly.\" This requires dispatcher approval before sending.";
  if (p.includes("at-risk") || p.includes("summary")) return `${recCount} active recommendations. 1 critical (CDL on AR-2054), 1 high (delay on AR-2048), 1 moderate (vehicle mismatch on AR-2051).`;
  if (p.includes("idle")) return "2 drivers idle > 45m (Diego Ramirez, James Okafor). No matching loads in 30-mile radius right now.";
  if (p.includes("handoff")) return "Generated a shift handoff with 3 priority actions. Review it on the Shift Handoff tab.";
  return "I can help with driver matching, customer updates, at-risk loads, idle drivers, or shift handoff. All high-impact actions require approval.";
}
