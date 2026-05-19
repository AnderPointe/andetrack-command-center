import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Bell,
  Filter,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopBar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="h-16 shrink-0 border-b border-border bg-surface/80 backdrop-blur sticky top-0 z-30">
      <div className="flex h-full items-center gap-3 px-4 md:px-6">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            placeholder="Search drivers, loads, shipments, vehicles…"
            className="w-full h-10 pl-10 pr-20 rounded-md bg-secondary/60 border border-border text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5 bg-background">
            ⌘ K
          </kbd>
        </div>

        <Button variant="outline" size="sm" className="hidden lg:inline-flex gap-2">
          <Filter className="size-4" /> Quick Filters
        </Button>

        <Button size="sm" className="gap-2 bg-orange text-orange-foreground hover:bg-orange/90">
          <Plus className="size-4" /> New Load
        </Button>

        <button
          onClick={() => setDark((d) => !d)}
          className="size-10 rounded-md grid place-items-center hover:bg-secondary text-foreground/80"
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>

        <button className="size-10 rounded-md grid place-items-center hover:bg-secondary relative">
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-orange" />
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
