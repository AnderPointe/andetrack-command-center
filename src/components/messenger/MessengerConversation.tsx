import { useEffect, useRef } from "react";
import { MessengerBubble } from "./MessengerBubble";
import { MessengerChatHeader } from "./MessengerChatHeader";
import { MessengerInputBar } from "./MessengerInputBar";
import type { Attachment, Contact, Message } from "./types";

export function MessengerConversation({
  active,
  messages,
  draft,
  onDraftChange,
  attachment,
  onAttachmentChange,
  onSend,
}: {
  active: Contact;
  messages: Message[];
  draft: string;
  onDraftChange: (v: string) => void;
  attachment: Attachment | null;
  onAttachmentChange: (a: Attachment | null) => void;
  onSend: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, active.id]);

  return (
    <section className="flex min-w-0 flex-1 flex-col rounded-2xl border border-white/[0.08] bg-[#101326]/70 backdrop-blur-xl">
      <MessengerChatHeader active={active} />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-5 space-y-4"
      >
        <div className="flex justify-center">
          <span className="rounded-full border border-white/[0.08] bg-[#0D1020] px-3 py-1 text-[11px] text-[#8B90A7]">
            Today, Dec 25
          </span>
        </div>

        {messages.map((m) => (
          <MessengerBubble key={m.id} m={m} />
        ))}
      </div>

      <MessengerInputBar
        draft={draft}
        onDraftChange={onDraftChange}
        attachment={attachment}
        onAttachmentChange={onAttachmentChange}
        onSend={onSend}
      />
    </section>
  );
}
