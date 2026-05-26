import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export interface LiquidGlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const LiquidGlassButton = React.forwardRef<
  HTMLButtonElement,
  LiquidGlassButtonProps
>(({ className, children, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      className={cn("glass-button", className)}
      {...props}
    >
      <span className="glass-filter" aria-hidden="true" />
      <span className="glass-overlay" aria-hidden="true" />
      <span className="glass-specular" aria-hidden="true" />
      <span className="glass-content">{children}</span>
    </Comp>
  );
});

LiquidGlassButton.displayName = "LiquidGlassButton";
