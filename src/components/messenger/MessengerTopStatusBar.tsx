import { Activity, Sparkles } from "lucide-react";

export function MessengerTopStatusBar({
  unreadTotal,
  online,
}: {
  unreadTotal: number;
  online: number;
}) {
  return (
    <div className="flex items-center justify-between px-6 pt-5 pb-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Anderoute Messenger
        </h1>
        <p className="text-sm text-[#8B90A7]">
          Premium logistics command-center messaging — dispatch, drivers, brokers, warehouses, customers.
        </p>
      </div>
      <div className="hidden items-center gap-2 md:flex">
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-[#8B90A7] backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          {online} online
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-[#8B90A7] backdrop-blur-md">
          <Activity className="size-3 text-[#B79CFF]" />
          {unreadTotal} unread
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#6D35E8]/40 bg-[#6D35E8]/15 px-3 py-1.5 text-[11px] text-[#D4C4FF] backdrop-blur-md">
          <Sparkles className="size-3" />
          AI auto-summary on
        </div>
      </div>
    </div>
  );
}
