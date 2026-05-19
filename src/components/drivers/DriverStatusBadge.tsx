import { statusMeta } from "@/data/mock";
import type { DriverStatus } from "@/types";
import { cn } from "@/lib/utils";

export function DriverStatusBadge({
  status,
  className,
  size = "sm",
}: {
  status: DriverStatus;
  className?: string;
  size?: "xs" | "sm" | "md";
}) {
  const meta = statusMeta[status];
  const color = `var(--${meta.token})`;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium border",
        size === "xs" && "text-[10px] px-1.5 py-0.5",
        size === "sm" && "text-xs px-2 py-0.5",
        size === "md" && "text-sm px-2.5 py-1",
        className,
      )}
      style={{
        color,
        borderColor: `color-mix(in oklab, ${color} 35%, transparent)`,
        backgroundColor: `color-mix(in oklab, ${color} 12%, transparent)`,
      }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {meta.label}
    </span>
  );
}
