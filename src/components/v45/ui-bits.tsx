import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ReactNode } from "react";

export function KpiGrid({ items, cols = 4 }: { items: { label: string; value: ReactNode; sub?: string }[]; cols?: number }) {
  return (
    <div className={`grid gap-3 md:grid-cols-${cols}`}>
      {items.map(k => (
        <Card key={k.label} className="border-white/10 bg-white/[0.02] p-3">
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{k.label}</div>
          <div className="mt-1 text-xl font-semibold">{k.value}</div>
          {k.sub && <div className="mt-0.5 text-[10px] text-muted-foreground">{k.sub}</div>}
        </Card>
      ))}
    </div>
  );
}

export function ScoreCard({ label, value, tone = "violet" }: { label: string; value: number; tone?: "violet" | "emerald" | "amber" | "rose" | "sky" }) {
  const toneMap: Record<string, string> = {
    violet: "border-violet-400/40 text-violet-200",
    emerald: "border-emerald-400/40 text-emerald-200",
    amber: "border-amber-400/40 text-amber-200",
    rose: "border-rose-400/40 text-rose-200",
    sky: "border-sky-400/40 text-sky-200",
  };
  return (
    <Card className={`border ${toneMap[tone]} bg-white/[0.02] p-4`}>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-3xl font-semibold">{value}%</div>
      <Progress value={value} className="mt-2 h-1.5" />
    </Card>
  );
}

export function StatusPill({ status }: { status: string }) {
  const lower = status.toLowerCase();
  const cls =
    /(complete|pass|ready|approved|preferred|healthy|resolved|ga|signed)/.test(lower) ? "border-emerald-400/40 text-emerald-200" :
    /(in_prog|in progress|in_review|integrating|under review|tested|implemented|drafting|diligence)/.test(lower) ? "border-sky-400/40 text-sky-200" :
    /(pending|planned|waiting|designed|exploration|at_risk|medium)/.test(lower) ? "border-amber-400/40 text-amber-200" :
    /(escalated|fail|blocked|needs|watchlist|high|denied|rejected)/.test(lower) ? "border-rose-400/40 text-rose-200" :
    "border-white/20 text-muted-foreground";
  return <Badge variant="outline" className={cls}>{status}</Badge>;
}

export function SimpleTable<T extends Record<string, any>>({ rows, columns }: {
  rows: T[];
  columns: { key: keyof T; label: string; render?: (row: T) => ReactNode }[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full text-xs">
        <thead className="bg-white/[0.03] text-muted-foreground">
          <tr>{columns.map(c => <th key={String(c.key)} className="px-3 py-2 text-left font-medium">{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-white/5">
              {columns.map(c => <td key={String(c.key)} className="px-3 py-2">{c.render ? c.render(r) : String(r[c.key])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
