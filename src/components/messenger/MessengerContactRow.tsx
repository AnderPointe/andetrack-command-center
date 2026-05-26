import { cn } from "@/lib/utils";
import { MessengerAvatar } from "./primitives";
import { roleStyles, type Contact } from "./types";

export function MessengerContactRow({
  c,
  active,
  onClick,
}: {
  c: Contact;
  active: boolean;
  onClick: () => void;
}) {
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
      <MessengerAvatar src={c.avatar} name={c.name} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-semibold">{c.name}</span>
          <span
            className={cn(
              "shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
              roleStyles[c.role],
            )}
          >
            {c.role}
          </span>
        </div>
        <p
          className={cn(
            "mt-0.5 truncate text-xs",
            c.typing ? "text-[#B79CFF]" : "text-[#8B90A7]",
          )}
        >
          {c.preview}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-[10px] text-[#8B90A7]">{c.time}</span>
        {c.unread > 0 && (
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#EF4444] px-1.5 text-[10px] font-semibold text-white">
            {c.unread}
          </span>
        )}
      </div>
    </button>
  );
}
