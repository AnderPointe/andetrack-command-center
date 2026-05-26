import { Edit3, Search } from "lucide-react";
import { toast } from "sonner";
import { MessengerChatList } from "./MessengerChatList";
import { MessengerFilterChip, MessengerIconChip } from "./primitives";
import {
  categoryFilters,
  typeFilters,
  type CategoryFilter,
  type Contact,
  type TypeFilter,
} from "./types";

export function MessengerSidebar({
  query,
  onQueryChange,
  typeFilter,
  onTypeFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  pinned,
  others,
  activeId,
  onSelect,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  typeFilter: TypeFilter;
  onTypeFilterChange: (v: TypeFilter) => void;
  categoryFilter: CategoryFilter;
  onCategoryFilterChange: (v: CategoryFilter) => void;
  pinned: Contact[];
  others: Contact[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="flex w-[380px] shrink-0 flex-col rounded-2xl border border-white/[0.08] bg-[#101326]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h2 className="text-lg font-semibold">All Chat</h2>
        <div className="flex items-center gap-2">
          <MessengerIconChip onClick={() => toast.info("Compose new message")}>
            <Edit3 className="size-4" />
          </MessengerIconChip>
          <MessengerIconChip>
            <Search className="size-4" />
          </MessengerIconChip>
        </div>
      </div>
      <div className="px-5 pb-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0D1020] px-3 py-2">
          <Search className="size-4 text-[#8B90A7]" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search contacts…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#8B90A7]"
          />
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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

      <div className="flex gap-1.5 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categoryFilters.map((f) => (
          <MessengerFilterChip
            key={f.id}
            active={categoryFilter === f.id}
            onClick={() => onCategoryFilterChange(f.id)}
            variant="category"
          >
            {f.label}
          </MessengerFilterChip>
        ))}
      </div>

      <MessengerChatList
        pinned={pinned}
        others={others}
        activeId={activeId}
        onSelect={onSelect}
      />
    </aside>
  );
}
