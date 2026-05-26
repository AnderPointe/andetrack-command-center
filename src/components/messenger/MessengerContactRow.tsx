import { Pin, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { MessengerAvatar } from "./primitives";
import { priorityStyles, roleStyles, type Contact } from "./types";

export function MessengerContactRow({
  c,
  active,
  onClick,
}: {
  c: Contact;
  active: boolean;
  onClick: () => void;
}) {
  const isChannel = c.kind === "channel";
  const isLoad = c.kind === "load";
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-start gap-3 rounded-xl px-2.5 py-2.5 text-left transition-all",
        active
          ? "border border-[#6D35E8]/40 bg-[#6D35E8]/15 shadow-[inset_0_0_0_1px_rgba(109,53,232,0.25),0_8px_28px_-12px_rgba(109,53,232,0.5)]"
          : "border border-transparent hover:bg-white/[0.04]",
      )}
    >
      <MessengerAvatar
        src={c.avatar}
        name={c.name}
        kind={c.kind}
        online={c.kind === "dm" ? c.online ?? false : undefined}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          {isChannel && <span className="text-[#8B90A7]">#</span>}
          <span className="truncate text-[13px] font-semibold text-white">
            {isChannel ? c.name : c.name}
          </span>
          {c.pinned && <Pin className="size-3 text-[#B79CFF]" />}
          {!isChannel && !isLoad && (
            <span
              className={cn(
                "shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
                roleStyles[c.role],
              )}
            >
              {c.role}
            </span>
          )}
          {c.priority && c.priority !== "normal" && (
            <span
              className={cn(
                "shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
                priorityStyles[c.priority],
              )}
            >
              {c.priority}
            </span>
          )}
        </div>
        <p
          className={cn(
            "mt-0.5 truncate text-[11.5px]",
            c.typing ? "text-[#B79CFF]" : "text-[#8B90A7]",
          )}
        >
          {c.typing ? "typing…" : c.preview}
        </p>
        {c.linkedLoad && (
          <div className="mt-1 inline-flex items-center gap-1 rounded-md border border-[#F97316]/30 bg-[#F97316]/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-orange-300">
            <Truck className="size-2.5" />
            {c.linkedLoad.id}
          </div>
        )}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-[10px] text-[#8B90A7]">{c.time}</span>
        {c.unread > 0 && (
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#EF4444] px-1.5 text-[10px] font-semibold text-white shadow-[0_0_10px_-2px_rgba(239,68,68,0.7)]">
            {c.unread}
          </span>
        )}
      </div>
    </button>
  );
}
