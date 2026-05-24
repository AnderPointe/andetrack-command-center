import { ChevronLeft, ChevronRight, Calendar, Columns, List, Map as MapIcon } from "lucide-react";
import type { ViewMode } from "@/types/dispatch";

interface Props {
  date: Date;
  onDateChange: (d: Date) => void;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
}

const LEGEND = [
  { label: "Unassigned", color: "#94a3b8" },
  { label: "Assigned", color: "#3b82f6" },
  { label: "Confirmed", color: "#10b981" },
  { label: "In Progress", color: "#f97316" },
  { label: "Completed", color: "#a855f7" },
];

const VIEWS: { k: ViewMode; label: string; icon: typeof Columns }[] = [
  { k: "timeline", label: "Timeline", icon: Columns },
  { k: "week", label: "Week", icon: Calendar },
  { k: "list", label: "List", icon: List },
  { k: "map", label: "Map", icon: MapIcon },
];

export function DispatchViewControls({ date, onDateChange, view, onViewChange }: Props) {
  const shift = (n: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    onDateChange(d);
  };
  const isToday = new Date().toDateString() === date.toDateString();
  const label = `${isToday ? "Today, " : ""}${date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })}`;

  return (
    <div className="flex h-full items-center gap-4 border-b border-slate-200 bg-white px-5">
      <div className="flex items-center gap-1">
        <button
          onClick={() => shift(-1)}
          className="grid size-8 place-items-center rounded-md text-slate-500 hover:bg-slate-100"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          onClick={() => onDateChange(new Date())}
          className="flex h-8 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-medium text-slate-700 hover:border-slate-300"
        >
          <Calendar className="size-3.5 text-slate-400" />
          {label}
        </button>
        <button
          onClick={() => shift(1)}
          className="grid size-8 place-items-center rounded-md text-slate-500 hover:bg-slate-100"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="mx-auto hidden items-center gap-4 md:flex">
        {LEGEND.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="size-2 rounded-full" style={{ background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-0.5 rounded-lg border border-slate-200 bg-slate-50 p-0.5">
        {VIEWS.map(({ k, label, icon: Icon }) => (
          <button
            key={k}
            onClick={() => onViewChange(k)}
            className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs transition ${
              view === k
                ? "bg-white font-medium text-teal-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Icon className="size-3.5" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
