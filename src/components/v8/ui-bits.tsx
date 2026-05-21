export { KpiGrid, ScoreCard, StatusPill, SimpleTable } from "@/components/v45/ui-bits";
export { ExecBanner, type ExecHeadline } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";

export type OverlayItem = { area: string; role: string; focus: string; decision: string };

export function OverlayCard({ item }: { item: OverlayItem }) {
  return (
    <Card className="border-white/10 bg-white/[0.02] p-3 text-sm">
      <div className="flex items-center justify-between">
        <div className="font-medium text-violet-200">{item.area}</div>
        <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-violet-200">
          {item.role}
        </span>
      </div>
      <div className="mt-1 text-muted-foreground">{item.focus}</div>
      <div className="mt-2 text-xs">
        <span className="text-amber-300">Next:</span> <span>{item.decision}</span>
      </div>
    </Card>
  );
}

export function OverlayStrip({ items, title = "Executive overlays" }: { items: OverlayItem[]; title?: string }) {
  if (!items?.length) return null;
  return (
    <Card className="border-white/10 bg-white/[0.02] p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-2 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => <OverlayCard key={it.area} item={it} />)}
      </div>
    </Card>
  );
}
