import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { MessengerAttachmentCard } from "./MessengerAttachmentCard";
import type { Message } from "./types";

export function MessengerBubble({ m }: { m: Message }) {
  const mine = m.from === "me";
  return (
    <div className={cn("flex w-full", mine ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "flex max-w-[78%] flex-col",
          mine ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "mb-1 flex items-center gap-1.5 text-[10px] text-[#8B90A7]",
            mine ? "flex-row-reverse" : "",
          )}
        >
          <span>{m.time}</span>
          {mine && <CheckCheck className="size-3 text-[#B79CFF]" />}
          {mine && <span>You</span>}
        </div>

        {m.kind === "text" ? (
          <div
            className={cn(
              "rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-lg",
              mine
                ? "bg-[#6D35E8] text-white shadow-[0_10px_30px_-12px_rgba(109,53,232,0.7)]"
                : "border border-white/[0.08] bg-[#1A1E33] text-[#E6E8F2]",
            )}
          >
            {m.quote && (
              <div className="mb-2 border-l-2 border-white/40 pl-2 text-[12px] opacity-90">
                <div className="font-semibold">{m.quote.name}</div>
                <div className="opacity-90">{m.quote.text}</div>
              </div>
            )}
            {m.text}
          </div>
        ) : (
          <MessengerAttachmentCard filename={m.filename} filetype={m.filetype} />
        )}
      </div>
    </div>
  );
}
