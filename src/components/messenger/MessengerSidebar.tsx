import { Edit3, Search } from "lucide-react";
import { toast } from "sonner";
import { MessengerChatList } from "./MessengerChatList";
import { MessengerFilterChip, MessengerIconChip } from "./primitives";
import { typeFilters, type Contact, type TypeFilter } from "./types";

export function MessengerSidebar({
  query,
  onQueryChange,
  typeFilter,
  onTypeFilterChange,
  contacts,
  activeId,
  onSelect,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  typeFilter: TypeFilter;
  onTypeFilterChange: (v: TypeFilter) => void;
  contacts: Contact[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="flex w-[320px] shrink-0 flex-col rounded-3xl border border-white/[0.08] bg-[#101326]/70 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Inbox</h2>
          <p className="text-[11px] text-muted-foreground">Anderoute Messenger</p>
        </div>
        <div className="flex items-center gap-2">
          <MessengerIconChip
            title="New message"
            onClick={() => toast.info("Compose new message")}
          >
            <Edit3 className="size-4" />
          </MessengerIconChip>
        </div>
      </div>

      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-muted-foreground">
          <Search className="size-4" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search people, channels, loads…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {typeFilters.map((f) => (
          <MessengerFilterChip
            key={f.id}
            active={typeFilter === f.id}
            onClick={() => onTypeFilterChange(f.id)}
          >
            {f.label}
          </MessengerFilterChip>
        ))}
      </div>

      <MessengerChatList
        contacts={contacts}
        activeId={activeId}
        onSelect={onSelect}
      />
    </aside>
  );
}
