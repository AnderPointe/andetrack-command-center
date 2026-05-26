import * as React from "react";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface LiquidGlassNavProps
  extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
}

export const LiquidGlassNav = React.forwardRef<
  HTMLElement,
  LiquidGlassNavProps
>(({ className, items, ...props }, ref) => (
  <nav ref={ref} className={cn("glass-nav", className)} {...props}>
    <span className="glass-filter" aria-hidden="true" />
    <span className="glass-overlay" aria-hidden="true" />
    <span className="glass-specular" aria-hidden="true" />
    <div className="glass-content">
      <ul className="glass-nav-list">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={cn(
                "glass-nav-link",
                item.active && "active"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </nav>
));

LiquidGlassNav.displayName = "LiquidGlassNav";
