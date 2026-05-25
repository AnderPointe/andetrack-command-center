import { type ReactNode } from "react";

interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "aside";
  glow?: boolean;
}

/**
 * Liquid Glass surface — frosted, blurred, with inner highlight and soft glow.
 * Adapts to light/dark via the `.dark` class on <html>.
 */
export default function LiquidGlassCard({
  children,
  className = "",
  as: Tag = "div",
  glow = false,
}: LiquidGlassCardProps) {
  return (
    <Tag
      className={[
        "relative overflow-hidden rounded-[2rem]",
        "border border-white/40 dark:border-white/10",
        "bg-[var(--lg-glass)] backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_10px_40px_-12px_rgba(15,23,42,0.18)] dark:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.65)]",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px",
        "before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent",
        "dark:before:via-white/20",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[2rem]",
        "after:bg-gradient-to-br after:from-white/30 after:via-transparent after:to-transparent",
        "dark:after:from-white/[0.04]",
        "transition-shadow duration-300",
        glow
          ? "hover:shadow-[0_20px_60px_-12px_rgba(20,184,166,0.35)] dark:hover:shadow-[0_20px_60px_-12px_rgba(20,184,166,0.45)]"
          : "",
        className,
      ].join(" ")}
    >
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
