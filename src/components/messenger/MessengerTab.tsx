import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { MessengerConversation } from "./MessengerConversation";
import { MessengerSidebar } from "./MessengerSidebar";
import { MessengerTopStatusBar } from "./MessengerTopStatusBar";
import { seedContacts, seedMessages } from "./data";
import type {
  Attachment,
  CategoryFilter,
  Contact,
  Message,
  TypeFilter,
} from "./types";

export function MessengerTab() {
  const [contacts, setContacts] = useState<Contact[]>(seedContacts);
  const [activeId, setActiveId] = useState<string>("harrold");
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [messagesByContact, setMessagesByContact] =
    useState<Record<string, Message[]>>(seedMessages);
  const [draft, setDraft] = useState("");
  const [attachment, setAttachment] = useState<Attachment | null>(null);

  const active = contacts.find((c) => c.id === activeId)!;
  const messages = messagesByContact[activeId] ?? [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contacts.filter((c) => {
      if (typeFilter !== "all" && c.role !== typeFilter) return false;
      if (categoryFilter !== "all" && c.category !== categoryFilter)
        return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.preview.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        (c.company?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [contacts, query, typeFilter, categoryFilter]);

  const pinned = filtered.filter((c) => c.pinned);
  const others = filtered.filter((c) => !c.pinned);

  useEffect(() => {
    // selecting a contact clears its unread badge (handled in selectContact)
  }, []);

  function selectContact(id: string) {
    setActiveId(id);
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    );
  }

  function sendMessage() {
    const text = draft.trim();
    if (!text && !attachment) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newMessages: Message[] = [];
    if (text) {
      newMessages.push({
        id: `m-${Date.now()}`,
        kind: "text",
        from: "me",
        time,
        text,
      });
    }
    if (attachment) {
      newMessages.push({
        id: `m-${Date.now()}-f`,
        kind: "file",
        from: "me",
        time,
        filename: attachment.name,
        filetype: attachment.type.split("/").pop()?.toUpperCase() || "FILE",
      });
    }
    setMessagesByContact((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), ...newMessages],
    }));
    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              preview: text || attachment?.name || c.preview,
              time: "Now",
            }
          : c,
      ),
    );
    setDraft("");
    setAttachment(null);
    toast.success("Message sent");
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#080A16] text-[#F8FAFC]">
      <div className="pointer-events-none absolute -top-32 left-1/3 h-[420px] w-[420px] rounded-full bg-[#6D35E8]/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[#6D35E8]/10 blur-[120px]" />

      <MessengerTopStatusBar />

      <div className="flex h-[calc(100%-72px)] gap-4 px-4 pb-4">
        <MessengerSidebar
          query={query}
          onQueryChange={setQuery}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          pinned={pinned}
          others={others}
          activeId={activeId}
          onSelect={selectContact}
        />

        <MessengerConversation
          active={active}
          messages={messages}
          draft={draft}
          onDraftChange={setDraft}
          attachment={attachment}
          onAttachmentChange={setAttachment}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
}
