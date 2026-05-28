import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  Plus,
  Bell,
  Filter,
  ChevronDown,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumToggle } from "@/components/ui/premium-toggle";
import { alerts } from "@/data/mock";


export function TopBar() {
  const [dark, setDark] = useState(false);
  const toggleWrapRef = useRef<HTMLDivElement>(null);
  const openAlerts = alerts.filter((a) => !a.resolved).length;

  useEffect(() => {
    if (typeof document === "undefined") return;
    const stored = localStorage.getItem("ar-theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial = stored ? stored === "dark" : !!prefersDark;
    setDark(initial);
    // Apply initial without animation
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const applyTheme = useCallback((next: boolean) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    localStorage.setItem("ar-theme", next ? "dark" : "light");

    // Compute origin from the toggle's position
    const rect = toggleWrapRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : window.innerWidth - 80;
    const cy = rect ? rect.top + rect.height / 2 : 32;
    const maxR = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy),
    );
    root.style.setProperty("--theme-x", `${cx}px`);
    root.style.setProperty("--theme-y", `${cy}px`);
    root.style.setProperty("--theme-r", `${maxR}px`);

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const swap = () => root.classList.toggle("dark", next);

    // Prefer the View Transitions API for a circular reveal
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    if (doc.startViewTransition && !prefersReduced) {
      root.classList.add("theme-view-transition");
      const transition = doc.startViewTransition(() => swap());
      transition.finished.finally(() => {
        root.classList.remove("theme-view-transition");
      });
      return;
    }

    // Fallback: cross-fade all colors via .theme-transitioning
    root.classList.add("theme-transitioning");
    swap();
    window.setTimeout(() => root.classList.remove("theme-transitioning"), 420);
  }, []);

  const handleToggle = useCallback(
    (next: boolean) => {
      setDark(next);
      applyTheme(next);
    },
    [applyTheme],
  );


  return (
    <header className="h-16 shrink-0 border-b border-border bg-surface/85 backdrop-blur-xl sticky top-0 z-30">
      <div className="flex h-full items-center gap-3 px-4 md:px-6">
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/25 text-success text-[11px] font-medium">
          <Radio className="size-3" />
          Live
        </div>

        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            placeholder="Search drivers, loads, shipments, vehicles…"
            className="w-full h-10 pl-10 pr-20 rounded-lg bg-secondary/50 border border-border text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring focus:bg-card transition"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5 bg-background">
            ⌘ K
          </kbd>
        </div>

        <Button variant="outline" size="sm" className="hidden lg:inline-flex gap-2 h-9">
          <Filter className="size-4" /> Filters
        </Button>

        <Button size="sm" className="gap-2 h-9 bg-orange text-orange-foreground hover:bg-orange/90 shadow-[var(--shadow-sm)]">
          <Plus className="size-4" /> Tender Load
        </Button>

        <div className="h-6 w-px bg-border mx-1 hidden md:block" />

        <div ref={toggleWrapRef} className="inline-flex items-center">
          <PremiumToggle
            checked={dark}
            onChange={handleToggle}
            aria-label="Toggle dark mode"
          />
        </div>




        <button className="size-9 rounded-md grid place-items-center hover:bg-secondary relative transition" aria-label="Alerts">
          <Bell className="size-4" />
          {openAlerts > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-orange text-orange-foreground text-[9px] font-bold grid place-items-center tabular-nums">
              {openAlerts}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="size-9 rounded-full bg-gradient-to-br from-teal to-orange grid place-items-center text-sm font-semibold text-white">
            LH
          </div>
          <div className="hidden md:flex flex-col leading-tight">
            <span className="text-sm font-medium">L. Howard</span>
            <span className="text-[11px] text-muted-foreground">
              Senior Dispatcher
            </span>
          </div>
          <ChevronDown className="size-4 text-muted-foreground hidden md:block" />
        </div>
      </div>
    </header>
  );
}
