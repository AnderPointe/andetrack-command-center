import { Activity, Search, Sparkles } from "lucide-react";

export function MessengerTopStatusBar({
  unreadTotal,
  online,
  onOpenPalette,
}: {
  unreadTotal: number;
  online: number;
  onOpenPalette: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-6 pt-5 pb-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Anderoute Messenger
        </h1>
        <p className="text-sm text-muted-foreground">
          Premium logistics command-center messaging — dispatch, drivers, brokers, warehouses, customers.
        </p>
      </div>
      <div className="hidden items-center gap-2 md:flex">
        <button
          onClick={onOpenPalette}
          className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-muted-foreground backdrop-blur-md hover:text-foreground"
        >
          <Search className="size-3" />
          Search
          <span className="rounded border border-white/10 bg-white/5 px-1 text-[10px]">⌘K</span>
        </button>
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-muted-foreground backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-success animate-pulse" />
          {online} online
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-muted-foreground backdrop-blur-md">
          <span className="text-primary"><Activity className="size-3" /></span>
          {unreadTotal} unread
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#6D35E8]/40 bg-[#6D35E8]/15 px-3 py-1.5 text-[11px] text-primary backdrop-blur-md">
          <Sparkles className="size-3" />
          AI auto-summary on
        </div>
      </div>
    </div>
  );
}
