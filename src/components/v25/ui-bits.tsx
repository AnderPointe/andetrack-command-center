import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type V25Overlay = {
  id: string;
  area: string;
  role: string;
  focus: string;
  next: string;
};

export function OverlayCard({ o }: { o: V25Overlay }) {
  return (
    <Card className="border-white/10 bg-white/[0.02] p-3 text-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="font-medium">{o.area}</div>
        <Badge variant="outline" className="border-emerald-500/30 text-emerald-300 text-[10px]">
          {o.role}
        </Badge>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{o.focus}</div>
      <div className="mt-2 text-xs">
        <span className="text-emerald-300">Next: </span>
        <span className="text-muted-foreground">{o.next}</span>
      </div>
    </Card>
  );
}

export function OverlayStrip({
  title,
  items,
}: {
  title: string;
  items: readonly V25Overlay[];
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold">{title}</h2>
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        {items.map((o) => (
          <OverlayCard key={o.id} o={o} />
        ))}
      </div>
    </section>
  );
}
