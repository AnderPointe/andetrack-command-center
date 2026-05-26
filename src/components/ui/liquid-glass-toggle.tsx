import * as React from "react";
import { cn } from "@/lib/utils";

export interface LiquidGlassToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const LiquidGlassToggle = React.forwardRef<
  HTMLInputElement,
  LiquidGlassToggleProps
>(({ className, label, checked, onChange, ...props }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <label className={cn("glass-toggle", className)}>
      <input
        ref={ref}
        type="checkbox"
        className="toggle-input"
        checked={checked}
        onChange={handleChange}
        {...props}
      />
      <div className="toggle-track">
        {/* Glass layers */}
        <span className="glass-filter" aria-hidden="true" />
        <span className="glass-overlay" aria-hidden="true" />
        <span className="glass-specular" aria-hidden="true" />
        {/* Thumb */}
        <div className="toggle-thumb">
          <span className="glass-filter" aria-hidden="true" />
          <span className="glass-overlay" aria-hidden="true" />
          <span className="glass-specular" aria-hidden="true" />
        </div>
      </div>
      {label && <span className="toggle-label">{label}</span>}
    </label>
  );
});

LiquidGlassToggle.displayName = "LiquidGlassToggle";

/* Toggle Group */
export interface LiquidGlassToggleGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LiquidGlassToggleGroup = React.forwardRef<
  HTMLDivElement,
  LiquidGlassToggleGroupProps
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("glass-toggle-group", className)} {...props}>
    {children}
  </div>
));

LiquidGlassToggleGroup.displayName = "LiquidGlassToggleGroup";
