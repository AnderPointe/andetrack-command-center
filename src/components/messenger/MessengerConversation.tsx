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
    <section className="flex min-w-0 flex-1 flex-col rounded-3xl border border-border/60 bg-card/70 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]">
      <MessengerChatHeader active={active} onOpenCallLog={onOpenCallLog} />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-5 space-y-4"
      >
        <div className="flex justify-center">
          <span className="rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-[11px] text-muted-foreground">
            Today
          </span>
        </div>

        {messages.map((m) => (
          <MessengerBubble key={m.id} m={m} />
        ))}

        {messages.length === 0 && (
          <div className="grid place-items-center py-20 text-center text-muted-foreground">
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
