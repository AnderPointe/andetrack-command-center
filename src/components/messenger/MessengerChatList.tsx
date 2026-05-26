import { MessageSquare, Pin } from "lucide-react";
import { MessengerContactRow } from "./MessengerContactRow";
import { MessengerSectionLabel } from "./primitives";
import type { Contact } from "./types";

export function MessengerChatList({
  pinned,
  others,
  activeId,
  onSelect,
}: {
  pinned: Contact[];
  others: Contact[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto px-3 pb-3">
      {pinned.length > 0 && (
        <MessengerSectionLabel icon={<Pin className="size-3.5" />}>
          Pinned Message
        </MessengerSectionLabel>
      )}
      {pinned.map((c) => (
        <MessengerContactRow
          key={c.id}
          c={c}
          active={c.id === activeId}
          onClick={() => onSelect(c.id)}
        />
      ))}

      {others.length > 0 && (
        <MessengerSectionLabel icon={<MessageSquare className="size-3.5" />}>
          All Message
        </MessengerSectionLabel>
      )}
      {others.map((c) => (
        <MessengerContactRow
          key={c.id}
          c={c}
          active={c.id === activeId}
          onClick={() => onSelect(c.id)}
        />
      ))}
    </div>
  );
}
