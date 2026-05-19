import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: LucideIcon;
  accent?: "teal" | "orange" | "success" | "warning" | "destructive" | "info";
}

export function StatCard({
  label,
  value,
  delta,
  trend = "flat",
  icon: Icon,
  accent = "teal",
}: StatCardProps) {
  const accentColor = `var(--${accent === "destructive" ? "destructive" : accent})`;
  return (
    <div className="group relative rounded-xl border border-border bg-card p-4 overflow-hidden hover:shadow-md transition-shadow">
      <div
        className="absolute -top-12 -right-12 size-32 rounded-full opacity-10 blur-2xl"
        style={{ backgroundColor: accentColor }}
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
            {label}
          </div>
          <div className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
            {value}
          </div>
        </div>
        {Icon && (
          <div
            className="size-9 rounded-lg grid place-items-center"
            style={{
              backgroundColor: `color-mix(in oklab, ${accentColor} 15%, transparent)`,
              color: accentColor,
            }}
          >
            <Icon className="size-4" />
          </div>
        )}
      </div>
      {delta && (
        <div
          className={cn(
            "mt-3 text-xs flex items-center gap-1.5",
            trend === "up" && "text-success",
            trend === "down" && "text-destructive",
            trend === "flat" && "text-muted-foreground",
          )}
        >
          <span className="font-medium">{delta}</span>
          <span className="text-muted-foreground">vs yesterday</span>
        </div>
      )}
    </div>
  );
}
