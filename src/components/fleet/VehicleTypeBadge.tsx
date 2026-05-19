import type { VehicleType } from "@/types";
import { Truck } from "lucide-react";

export function VehicleTypeBadge({ type }: { type: VehicleType }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/60 px-2 py-0.5 text-[11px] font-medium text-foreground/80">
      <Truck className="size-3" />
      {type}
    </span>
  );
}
