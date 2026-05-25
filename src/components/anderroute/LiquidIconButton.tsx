import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface LiquidIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label?: string;
  variant?: "default" | "teal" | "orange";
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14",
};

const variantMap = {
  default:
    "text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-300",
  teal:
    "text-teal-600 dark:text-teal-300 hover:shadow-[0_0_24px_rgba(20,184,166,0.55)]",
  orange:
    "text-orange-500 dark:text-orange-300 hover:shadow-[0_0_24px_rgba(249,115,22,0.55)]",
};

/**
 * Liquid icon button — frosted glass pill with subtle highlight and hover glow.
 */
export default function LiquidIconButton({
  children,
  label,
  variant = "default",
  size = "md",
  className = "",
  ...rest
}: LiquidIconButtonProps) {
  return (
    <button
      aria-label={label}
      title={label}
      {...rest}
      className={[
        "group relative grid place-items-center rounded-2xl",
        sizeMap[size],
        "border border-white/50 dark:border-white/10",
        "bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl backdrop-saturate-150",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        "transition-all duration-200",
        "hover:-translate-y-0.5 hover:bg-white/80 dark:hover:bg-white/[0.08]",
        "active:translate-y-0 active:scale-95",
        variantMap[variant],
        className,
      ].join(" ")}
    >
      <span className="pointer-events-none absolute inset-x-2 top-1 h-1/3 rounded-t-2xl bg-gradient-to-b from-white/70 to-transparent opacity-80 dark:from-white/15" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
