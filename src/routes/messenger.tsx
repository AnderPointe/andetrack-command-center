import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { toast } from "sonner";
import {
  Search,
  Edit3,
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Smile,
  Mic,
  Send,
  FileText,
  Download,
  Pin,
  MessageSquare,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/messenger")({
  head: () => ({
    meta: [
      { title: "Messenger — Anderoute" },
      {
        name: "description",
        content:
          "Chats between couriers, dispatchers, brokers, drivers, and customers.",
      },
    ],
  }),
  component: MessengerPage,
});

type Role =
  | "Carrier"
  | "Driver"
  | "Broker"
  | "Dispatcher"
  | "Customer"
  | "Warehouse";

type Category =
  | "pinned"
  | "active_loads"
  | "dispatch"
  | "invoices"
  | "completed";

type Contact = {
  id: string;
  name: string;
  role: Role;
  preview: string;
  time: string;
  unread: number;
  pinned?: boolean;
  typing?: boolean;
  company?: string;
  avatar: string;
  category: Category;
};

type Message =
  | {
      id: string;
      kind: "text";
      from: "me" | "them";
      time: string;
      text: string;
      quote?: { name: string; text: string };
    }
  | {
      id: string;
      kind: "file";
      from: "me" | "them";
      time: string;
      filename: string;
      filetype: string;
    };

const seedContacts: Contact[] = [
  {
    id: "harrold",
    name: "Harrold Tafoya",
    role: "Carrier",
    preview: "Typing…",
    time: "05:11 PM",
    unread: 0,
    pinned: true,
    typing: true,
    company: "PSP Cargo Group",
    avatar: "https://i.pravatar.cc/80?img=12",
    category: "pinned",
  },
  {
    id: "mate",
    name: "Mate Bruney",
    role: "Carrier",
    preview: "Thank you. Glad to feel this …",
    time: "04:17 PM",
    unread: 4,
    avatar: "https://i.pravatar.cc/80?img=13",
    category: "active_loads",
  },
  {
    id: "shannon",
    name: "Shannon Kile",
    role: "Driver",
    preview: "Yes, thank you…",
    time: "16:01 PM",
    unread: 2,
    avatar: "https://i.pravatar.cc/80?img=47",
    category: "active_loads",
  },
  {
    id: "kynie",
    name: "Kynie Mccotter",
    role: "Carrier",
    preview: "Have you had a chance to check it out?",
    time: "03:29 PM",
    unread: 3,
    avatar: "https://i.pravatar.cc/80?img=14",
    category: "dispatch",
  },
  {
    id: "savina",
    name: "Savina Navarrate",
    role: "Carrier",
    preview: "I'm already at the warehouse and…",
    time: "02:11 PM",
    unread: 1,
    avatar: "https://i.pravatar.cc/80?img=45",
    category: "dispatch",
  },
  {
    id: "marcel",
    name: "Marcel Pasculli",
    role: "Driver",
    preview: "Could you send me an updated invoice?",
    time: "Yesterday",
    unread: 0,
    avatar: "https://i.pravatar.cc/80?img=15",
    category: "invoices",
  },
  {
    id: "gilbertine",
    name: "Gilbertine Rivet",
    role: "Driver",
    preview: "Yes, I am. I will let you know…",
    time: "Yesterday",
    unread: 0,
    avatar: "https://i.pravatar.cc/80?img=33",
    category: "dispatch",
  },
  {
    id: "nisa",
    name: "Nisa Cordial",
    role: "Driver",
    preview: "Yes, thank you…",
    time: "Yesterday",
    unread: 0,
    avatar: "https://i.pravatar.cc/80?img=44",
    category: "completed",
  },
  {
    id: "rafi",
    name: "Rafi Rohamat",
    role: "Carrier",
    preview: "I'm already at the warehouse and…",
    time: "Dec 20, 2024",
    unread: 0,
    avatar: "https://i.pravatar.cc/80?img=16",
    category: "completed",
  },
  {
    id: "wenston",
    name: "Wenston Covil",
    role: "Driver",
    preview: "Can I fill up here? Location",
    time: "Dec 18, 2024",
    unread: 0,
    avatar: "https://i.pravatar.cc/80?img=17",
    category: "completed",
  },
  {
    id: "warehouse-atl",
    name: "ATL Hub Receiving",
    role: "Warehouse",
    company: "Anderoute Atlanta Hub",
    preview: "Dock 4 open at 14:00.",
    time: "Yesterday",
    unread: 0,
    avatar: "https://i.pravatar.cc/80?img=58",
    category: "dispatch",
  },
  {
    id: "broker-jane",
    name: "Jane Whitlow",
    role: "Broker",
    company: "Whitlow Logistics",
    preview: "Confirmed rate on lane.",
    time: "Yesterday",
    unread: 0,
    avatar: "https://i.pravatar.cc/80?img=49",
    category: "active_loads",
  },
];

const seedMessages: Record<string, Message[]> = {
  harrold: [
    {
      id: "m1",
      kind: "text",
      from: "me",
      time: "09:44 PM",
      text: "Sounds perfect. I will drop a message to Nick regarding changes.",
    },
    {
      id: "m2",
      kind: "text",
      from: "me",
      time: "09:45 PM",
      text: "I'm afraid, yes, he will 🙂",
      quote: { name: "Mate Bruney", text: "Wa he insist on this date?" },
    },
    {
      id: "m3",
      kind: "text",
      from: "them",
      time: "09:44 PM",
      text:
        "Nick, payday is coming. Can you copy the invoice for our bookkeeping department?",
    },
    {
      id: "m4",
      kind: "text",
      from: "me",
      time: "10:50 PM",
      text:
        "I'm attaching the invoice for the last shipment. Please check it out and assure of correctness.",
    },
    {
      id: "m5",
      kind: "file",
      from: "me",
      time: "10:51 PM",
      filename: "Invoice Ceva Bahn 21032023",
      filetype: "PDF",
    },
    {
      id: "m6",
      kind: "text",
      from: "them",
      time: "09:44 PM",
      text: "Thank you! Glad to feel this difference",
    },
  ],
};

const roleStyles: Record<Role, string> = {
  Carrier: "bg-[#6D35E8]/20 text-[#B79CFF] border border-[#6D35E8]/40",
  Driver: "bg-[#22C55E]/15 text-[#5EE6A0] border border-[#22C55E]/35",
  Broker: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  Dispatcher: "bg-sky-500/15 text-sky-300 border border-sky-500/30",
  Customer: "bg-pink-500/15 text-pink-300 border border-pink-500/30",
  Warehouse: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30",
};

type TypeFilter = "all" | "Driver" | "Courier" | "Carrier" | "Broker" | "Customer" | "Warehouse";
type CategoryFilter = "all" | Category;

const typeFilters: { id: TypeFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Driver", label: "Drivers" },
  { id: "Courier", label: "Couriers" },
  { id: "Carrier", label: "Carriers" },
  { id: "Broker", label: "Brokers" },
  { id: "Customer", label: "Customers" },
  { id: "Warehouse", label: "Warehouses" },
];

const categoryFilters: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pinned", label: "Pinned" },
  { id: "active_loads", label: "Active Loads" },
  { id: "dispatch", label: "Dispatch" },
  { id: "invoices", label: "Invoices" },
  { id: "completed", label: "Completed" },
];

function MessengerPage() {
  return (
    <AppShell>
      <Messenger />
    </AppShell>
  );
}

type Attachment = { name: string; type: string; size?: number };

function Messenger() {
  const [contacts, setContacts] = useState<Contact[]>(seedContacts);
  const [activeId, setActiveId] = useState<string>("harrold");
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [messagesByContact, setMessagesByContact] =
    useState<Record<string, Message[]>>(seedMessages);
  const [draft, setDraft] = useState("");
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = contacts.find((c) => c.id === activeId)!;
  const messages = messagesByContact[activeId] ?? [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contacts.filter((c) => {
      if (typeFilter !== "all" && c.role !== typeFilter) return false;
      if (categoryFilter !== "all" && c.category !== categoryFilter) return false;
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
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, activeId]);

  function selectContact(id: string) {
    setActiveId(id);
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    );
  }

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAttachment({ name: file.name, type: file.type || "FILE", size: file.size });
    toast.success(`Attached ${file.name}`);
    e.target.value = "";
  }

  function sendMessage() {
    const text = draft.trim();
    if (!text && !attachment) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
          ? { ...c, preview: text || attachment?.name || c.preview, time: "Now" }
          : c,
      ),
    );
    setDraft("");
    setAttachment(null);
    toast.success("Message sent");
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#080A16] text-[#F8FAFC]">
      {/* Ambient purple glow */}
      <div className="pointer-events-none absolute -top-32 left-1/3 h-[420px] w-[420px] rounded-full bg-[#6D35E8]/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[#6D35E8]/10 blur-[120px]" />

      {/* Page header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Messages</h1>
          <p className="text-sm text-[#8B90A7]">
            Chats between couriers, dispatchers, brokers, drivers, and customers
          </p>
        </div>
      </div>

      <div className="flex h-[calc(100%-72px)] gap-4 px-4 pb-4">
        {/* Chat list */}
        <aside className="flex w-[380px] shrink-0 flex-col rounded-2xl border border-white/[0.08] bg-[#101326]/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <div>
              <h2 className="text-lg font-semibold">All Chat</h2>
            </div>
            <div className="flex items-center gap-2">
              <IconChip onClick={() => toast.info("Compose new message")}>
                <Edit3 className="size-4" />
              </IconChip>
              <IconChip>
                <Search className="size-4" />
              </IconChip>
            </div>
          </div>
          <div className="px-5 pb-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0D1020] px-3 py-2">
              <Search className="size-4 text-[#8B90A7]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search contacts…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#8B90A7]"
              />
            </div>
          </div>

          {/* Type filter chips */}
          <div className="flex gap-1.5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {typeFilters.map((f) => (
              <FilterChip
                key={f.id}
                active={typeFilter === f.id}
                onClick={() => setTypeFilter(f.id)}
              >
                {f.label}
              </FilterChip>
            ))}
          </div>

          {/* Category filter chips */}
          <div className="flex gap-1.5 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categoryFilters.map((f) => (
              <FilterChip
                key={f.id}
                active={categoryFilter === f.id}
                onClick={() => setCategoryFilter(f.id)}
                variant="category"
              >
                {f.label}
              </FilterChip>
            ))}
          </div>


          <div className="flex-1 overflow-y-auto px-3 pb-3">
            {pinned.length > 0 && (
              <SectionLabel icon={<Pin className="size-3.5" />}>
                Pinned Message
              </SectionLabel>
            )}
            {pinned.map((c) => (
              <ContactRow
                key={c.id}
                c={c}
                active={c.id === activeId}
                onClick={() => selectContact(c.id)}
              />
            ))}

            {others.length > 0 && (
              <SectionLabel icon={<MessageSquare className="size-3.5" />}>
                All Message
              </SectionLabel>
            )}
            {others.map((c) => (
              <ContactRow
                key={c.id}
                c={c}
                active={c.id === activeId}
                onClick={() => selectContact(c.id)}
              />
            ))}
          </div>
        </aside>

        {/* Conversation */}
        <section className="flex min-w-0 flex-1 flex-col rounded-2xl border border-white/[0.08] bg-[#101326]/70 backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
            <div className="flex items-center gap-3">
              <Avatar src={active.avatar} name={active.name} />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-semibold">{active.name}</h3>
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                      roleStyles[active.role],
                    )}
                  >
                    {active.role}
                  </span>
                </div>
                <p className="text-xs text-[#8B90A7]">
                  {active.company ?? "—"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <IconChip onClick={() => toast.success(`Calling ${active.name}…`)}>
                <Phone className="size-4" />
              </IconChip>
              <IconChip
                onClick={() => toast.success(`Starting video with ${active.name}…`)}
              >
                <Video className="size-4" />
              </IconChip>
              <IconChip>
                <MoreHorizontal className="size-4" />
              </IconChip>
            </div>
          </div>

          {/* Messages */}
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
              <MessageBubble key={m.id} m={m} />
            ))}
          </div>

          {/* Composer */}
          <div className="border-t border-white/[0.06] p-3 space-y-2">
            {attachment && (
              <div className="flex items-center gap-3 rounded-xl border border-[#6D35E8]/30 bg-[#6D35E8]/10 px-3 py-2">
                <div className="grid size-9 place-items-center rounded-lg bg-[#6D35E8]/25 text-[#B79CFF]">
                  <FileText className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-white">{attachment.name}</div>
                  <div className="text-[11px] text-[#8B90A7]">
                    {attachment.type}
                    {attachment.size ? ` · ${Math.round(attachment.size / 1024)} KB` : ""}
                  </div>
                </div>
                <button
                  onClick={() => setAttachment(null)}
                  className="text-xs text-[#8B90A7] hover:text-white"
                >
                  Remove
                </button>
              </div>
            )}
            <div className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#0D1020] px-3 py-2">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={onPickFile}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="grid size-9 place-items-center rounded-lg text-[#8B90A7] hover:bg-white/5 hover:text-white"
              >
                <Paperclip className="size-4" />
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Write a message…"
                className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-[#8B90A7]"
              />
              <button
                onClick={() => toast.info("Emoji picker coming soon")}
                className="grid size-9 place-items-center rounded-lg text-[#8B90A7] hover:bg-white/5 hover:text-white"
              >
                <Smile className="size-4" />
              </button>
              <button
                onClick={() => toast.info("Recording voice note…")}
                className="grid size-9 place-items-center rounded-lg text-[#8B90A7] hover:bg-white/5 hover:text-white"
              >
                <Mic className="size-4" />
              </button>
              <button
                onClick={sendMessage}
                className="grid size-9 place-items-center rounded-lg bg-[#6D35E8] text-white shadow-[0_8px_30px_-8px_rgba(109,53,232,0.7)] hover:bg-[#7c47ee]"
              >
                <Send className="size-4" />
              </button>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}

function SectionLabel({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 px-3 pt-3 pb-1.5 text-[11px] uppercase tracking-[0.14em] text-[#8B90A7]">
      {icon}
      {children}
    </div>
  );
}

function Avatar({ src, name }: { src: string; name: string }) {
  return (
    <div className="relative size-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
      <img src={src} alt={name} className="h-full w-full object-cover" />
    </div>
  );
}

function ContactRow({
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
      <Avatar src={c.avatar} name={c.name} />
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

function MessageBubble({ m }: { m: Message }) {
  const mine = m.from === "me";
  return (
    <div className={cn("flex w-full", mine ? "justify-end" : "justify-start")}>
      <div className={cn("flex max-w-[78%] flex-col", mine ? "items-end" : "items-start")}>
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
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#1A1E33] px-3 py-2.5">
            <div className="grid size-10 place-items-center rounded-xl bg-[#6D35E8]/20 text-[#B79CFF]">
              <FileText className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-white">
                {m.filename}
              </div>
              <div className="text-[11px] text-[#8B90A7]">{m.filetype}</div>
            </div>
            <button
              onClick={() => toast.success("Downloading…")}
              className="grid size-9 place-items-center rounded-lg bg-[#6D35E8]/15 text-[#B79CFF] hover:bg-[#6D35E8]/25"
            >
              <Download className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function IconChip({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="grid size-9 place-items-center rounded-xl border border-white/[0.08] bg-[#0D1020] text-[#B79CFF] transition-all hover:border-[#6D35E8]/40 hover:bg-[#6D35E8]/15"
    >
      {children}
    </button>
  );
}
