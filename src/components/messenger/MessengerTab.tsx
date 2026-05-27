import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { MessengerCallLogModal } from "./MessengerCallLogModal";
import { MessengerCommandPalette } from "./MessengerCommandPalette";
import { MessengerContextPanel } from "./MessengerContextPanel";
import { MessengerConversation } from "./MessengerConversation";
import { MessengerSidebar } from "./MessengerSidebar";
import { MessengerTopStatusBar } from "./MessengerTopStatusBar";
import { seedContacts, seedMessages } from "./data";
import type {
  Attachment,
  Contact,
  Message,
  Priority,
  TypeFilter,
} from "./types";

export function MessengerTab() {
  const [contacts, setContacts] = useState<Contact[]>(seedContacts);
  const [activeId, setActiveId] = useState<string>("marcus");
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [messagesByContact, setMessagesByContact] =
    useState<Record<string, Message[]>>(seedMessages);
  const [draft, setDraft] = useState("");
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [priority, setPriority] = useState<Priority>("normal");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [callLogOpen, setCallLogOpen] = useState(false);

  const active = contacts.find((c) => c.id === activeId) ?? contacts[0];
  const messages = messagesByContact[active.id] ?? [];

  // Ctrl/Cmd + K opens command palette
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contacts.filter((c) => {
      switch (typeFilter) {
        case "all":
          break;
        case "unread":
          if (c.unread === 0) return false;
          break;
        case "urgent":
          if (c.priority !== "urgent" && c.priority !== "emergency") return false;
          break;
        case "emergency":
          if (c.priority !== "emergency") return false;
          break;
        case "active_loads":
          if (c.category !== "active_loads") return false;
          break;
        case "delayed_loads":
          if (c.etaRisk !== "delayed" && c.etaRisk !== "high") return false;
          break;
        case "invoices":
          if (c.category !== "invoices") return false;
          break;
        case "archived":
          if (c.category !== "archived") return false;
          break;
        default:
          if (c.role !== typeFilter) return false;
      }
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.preview.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        (c.company?.toLowerCase().includes(q) ?? false) ||
        (c.linkedLoad?.id.toLowerCase().includes(q) ?? false)
      );
    });
  }, [contacts, query, typeFilter]);

  const unreadTotal = contacts.reduce((sum, c) => sum + c.unread, 0);
  const onlineCount = contacts.filter((c) => c.online).length;

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
        priority,
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
        sizeKb: attachment.size ? Math.round(attachment.size / 1024) : undefined,
      });
    }
    setMessagesByContact((prev) => ({
      ...prev,
      [active.id]: [...(prev[active.id] ?? []), ...newMessages],
    }));
    setContacts((prev) =>
      prev.map((c) =>
        c.id === active.id
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
    setPriority("normal");
    toast.success(
      priority === "emergency"
        ? "Emergency message broadcast"
        : "Message sent",
    );
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute -top-32 left-1/3 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-teal/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-[280px] w-[280px] rounded-full bg-orange/10 blur-[120px]" />

      <MessengerTopStatusBar
        unreadTotal={unreadTotal}
        online={onlineCount}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <div className="flex h-[calc(100%-92px)] gap-3 px-4 pb-4">
        <MessengerSidebar
          query={query}
          onQueryChange={setQuery}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          contacts={filtered}
          activeId={active.id}
          onSelect={selectContact}
        />

        <MessengerConversation
          active={active}
          messages={messages}
          draft={draft}
          onDraftChange={setDraft}
          attachment={attachment}
          onAttachmentChange={setAttachment}
          priority={priority}
          onPriorityChange={setPriority}
          onSend={sendMessage}
          onOpenCallLog={() => setCallLogOpen(true)}
        />

        <MessengerContextPanel active={active} />
      </div>

      <MessengerCommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        contacts={contacts}
        onSelect={selectContact}
      />
      <MessengerCallLogModal
        open={callLogOpen}
        onClose={() => setCallLogOpen(false)}
        contact={active}
      />
    </div>
  );
}
