import { Search, HelpCircle, Bell, MessageCircle, Plus, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Props {
  search: string;
  onSearch: (v: string) => void;
  onAddLoad?: () => void;
  onAddDriver?: () => void;
  onAddPin?: () => void;
}

export function DispatchTopBar({ search, onSearch, onAddLoad, onAddDriver, onAddPin }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <header className="flex h-full items-center gap-4 border-b border-slate-200 bg-white px-5">
      <div className="flex items-center gap-2">
        <span className="text-base font-semibold tracking-tight text-slate-900">
          Dispatch Board
        </span>
        <span className="rounded-md bg-teal-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal-700">
          Live
        </span>
      </div>

      <form
        className="relative mx-auto w-full max-w-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search drivers, loads, customers, cities, POIs…"
          className="h-9 w-full rounded-full border border-transparent bg-slate-100 pl-10 pr-4 text-sm placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:outline-none"
        />
      </form>

      <div className="flex items-center gap-1">
        <button className="grid size-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100">
          <HelpCircle className="size-4" />
        </button>
        <button className="relative grid size-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100">
          <MessageCircle className="size-4" />
          <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
            5
          </span>
        </button>
        <button className="relative grid size-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100">
          <Bell className="size-4" />
          <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
            12
          </span>
        </button>
        <div className="mx-2 size-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 ring-2 ring-white shadow" />

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 items-center gap-1.5 rounded-full bg-teal-500 px-3.5 text-sm font-medium text-white shadow-sm hover:bg-teal-600"
          >
            <Plus className="size-4" /> Add
            <ChevronDown className="size-3.5 opacity-80" />
          </button>
          {open && (
            <div className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              {[
                { label: "Add Load", onClick: onAddLoad },
                { label: "Add Driver", onClick: onAddDriver },
                { label: "Add Map Pin", onClick: onAddPin },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setOpen(false);
                    item.onClick?.();
                  }}
                  className="block w-full px-3.5 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
