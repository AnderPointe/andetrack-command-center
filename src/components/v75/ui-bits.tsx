import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

export { KpiGrid, ScoreCard, StatusPill, SimpleTable } from "@/components/v45/ui-bits";

export type ExecHeadline = {
  status: "green" | "amber" | "red";
  headline: string;
  detail: string;
  signals: { label: string; value: string | number; tone?: "good" | "warn" | "bad" }[];
  next_decision: { who: string; what: string; due?: string };
};

const toneRing: Record<string, string> = {
  green: "border-emerald-400/40 bg-emerald-500/5",
  amber: "border-amber-400/40 bg-amber-500/5",
  red:   "border-rose-400/40 bg-rose-500/5",
};
const sigTone: Record<string, string> = {
  good: "text-emerald-300",
  warn: "text-amber-300",
  bad:  "text-rose-300",
};

export function ExecBanner({ h }: { h: ExecHeadline }) {
  return (
    <Card className={`p-4 ${toneRing[h.status]}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-amber-300" />
            <Badge variant="outline" className="border-white/15 text-[10px] uppercase tracking-wide text-muted-foreground">Executive headline</Badge>
            <Badge variant="outline" className="border-white/15 text-[10px] uppercase text-muted-foreground">Status: {h.status}</Badge>
          </div>
          <div className="mt-1.5 text-sm font-semibold">{h.headline}</div>
          <p className="mt-0.5 text-xs text-muted-foreground">{h.detail}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-xs">
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Next decision</div>
          <div className="font-medium">{h.next_decision.who}</div>
          <div className="text-muted-foreground">{h.next_decision.what}</div>
          {h.next_decision.due && <div className="mt-0.5 text-[10px] text-muted-foreground">Due {h.next_decision.due}</div>}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
        {h.signals.map((s, i) => (
          <div key={i} className="rounded-md border border-white/10 bg-black/20 p-2">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</div>
            <div className={`text-sm font-semibold ${sigTone[s.tone ?? "good"] ?? ""}`}>{s.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
