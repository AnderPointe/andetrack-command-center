import { useEffect, useRef } from "react";
import { MessengerBubble } from "./MessengerBubble";
import { MessengerChatHeader } from "./MessengerChatHeader";
import { MessengerInputBar } from "./MessengerInputBar";
import type { Attachment, Contact, Message, Priority } from "./types";

export function MessengerConversation({
  active,
  messages,
  draft,
  onDraftChange,
  attachment,
  onAttachmentChange,
  priority,
  onPriorityChange,
  onSend,
  onOpenCallLog,
}: {
  active: Contact;
  messages: Message[];
  draft: string;
  onDraftChange: (v: string) => void;
  attachment: Attachment | null;
  onAttachmentChange: (a: Attachment | null) => void;
  priority: Priority;
  onPriorityChange: (p: Priority) => void;
  onSend: () => void;
  onOpenCallLog: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, active.id]);

  return (
    <section className="flex min-w-0 flex-1 flex-col rounded-3xl border border-white/[0.08] bg-[#101326]/70 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]">
      <MessengerChatHeader active={active} onOpenCallLog={onOpenCallLog} />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-5 space-y-4"
      >
        <div className="flex justify-center">
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] text-[#8B90A7]">
            Today
          </span>
        </div>

        {messages.map((m) => (
          <MessengerBubble key={m.id} m={m} />
        ))}

        {messages.length === 0 && (
          <div className="grid place-items-center py-20 text-center text-[#8B90A7]">
            <p className="text-sm">No messages yet.</p>
            <p className="text-xs">Say hello to {active.name}.</p>
          </div>
        )}
      </div>

      <MessengerInputBar
        active={active}
        draft={draft}
        onDraftChange={onDraftChange}
        attachment={attachment}
        onAttachmentChange={onAttachmentChange}
        priority={priority}
        onPriorityChange={onPriorityChange}
        onSend={onSend}
      />
    </section>
  );
}
