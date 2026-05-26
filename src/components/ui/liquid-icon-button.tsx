import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export interface LiquidIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
  asChild?: boolean;
  glowColor?: "teal" | "orange" | "default" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  variant?: "frosted" | "ghost" | "outline";
}

export const LiquidIconButton = React.forwardRef<
  HTMLButtonElement,
  LiquidIconButtonProps
>(
  (
    {
      className,
      icon,
      label,
      asChild = false,
      glowColor = "teal",
      size = "md",
      variant = "frosted",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const glowVar =
      {
        teal: "var(--teal)",
        orange: "var(--orange)",
        default: "var(--primary)",
        destructive: "var(--destructive)",
      }[glowColor] || "var(--teal)";

    const sizeClasses = {
      sm: "h-8 gap-1.5 px-2.5 text-xs",
      md: "h-9 gap-2 px-3.5 text-sm",
      lg: "h-10 gap-2 px-4 text-sm",
      icon: "h-9 w-9 justify-center",
    }[size];

    const variantClasses = {
      frosted:
        "bg-white/[0.06] border border-white/[0.08] backdrop-blur-md " +
        "text-foreground hover:text-foreground " +
        "hover:border-white/20 hover:bg-white/[0.12] " +
        "active:scale-[0.97]",
      ghost:
        "bg-transparent border border-transparent " +
        "text-muted-foreground hover:text-foreground " +
        "hover:bg-white/[0.06] hover:border-white/[0.06] " +
        "active:scale-[0.97]",
      outline:
        "bg-transparent border border-border " +
        "text-muted-foreground hover:text-foreground " +
        "hover:border-white/20 hover:bg-white/[0.06] " +
        "active:scale-[0.97]",
    }[variant];

    return (
      <Comp
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-lg font-medium cursor-pointer",
          "transition-all duration-300 ease-out",
          "overflow-hidden group",
          sizeClasses,
          variantClasses,
          className,
        )}
        style={
          {
            "--glow": glowVar,
          } as React.CSSProperties
        }
        {...props}
      >
        {/* Glow backdrop */}
        <span
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, var(--glow), transparent 70%)`,
            filter: "blur(14px)",
            transform: "scale(1.4)",
          }}
        />

        {/* Top sheen */}
        <span
          className="absolute inset-x-0 top-0 h-[1px] opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, var(--glow), transparent)`,
          }}
        />

        {/* Icon */}
        <span className="relative z-10 flex items-center justify-center shrink-0">
          {icon}
        </span>

        {/* Label */}
        {label && (
          <span className="relative z-10">{label}</span>
        )}
      </Comp>
    );
  },
);

LiquidIconButton.displayName = "LiquidIconButton";
