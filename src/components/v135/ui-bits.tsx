import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
export { KpiGrid, ScoreCard, StatusPill, SimpleTable } from "@/components/v45/ui-bits";

export function TrendBars({ title, points, accent = "bg-fuchsia-400/60", labelColor = "text-fuchsia-200" }: {
  title: string;
  points: { label: string; value: number; sub?: string }[];
  accent?: string;
  labelColor?: string;
}) {
  const max = Math.max(...points.map((p) => p.value), 1);
  return (
    <Card className="border-white/10 bg-white/[0.02] p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-3 flex h-32 items-end gap-3">
        {points.map((p) => (
          <div key={p.label} className="flex flex-1 flex-col items-center gap-1">
            <div className={`text-[10px] ${labelColor}`}>{p.value}</div>
            <div className={`w-full rounded-t ${accent}`} style={{ height: `${(p.value / max) * 100}%` }} />
            <div className="text-[10px] text-muted-foreground">{p.label}</div>
            {p.sub && <div className="text-[10px] text-emerald-300">{p.sub}</div>}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ExecHeadline({ tag, headline, bullets }: { tag: string; headline: string; bullets?: string[] }) {
  return (
    <Card className="border-fuchsia-400/20 bg-fuchsia-400/5 p-4">
      <div className="text-xs uppercase tracking-wide text-fuchsia-200/80">{tag}</div>
      <p className="mt-1 text-sm">{headline}</p>
      {bullets && bullets.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-foreground/80">
          {bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
      )}
    </Card>
  );
}

export function Section({ title, children, right }: { title: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Card className="border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        {right}
      </div>
      <div className="mt-2">{children}</div>
    </Card>
  );
}
