import { Archive, Hash, LifeBuoy, MessageSquare, Pin, Truck } from "lucide-react";
import { MessengerContactRow } from "./MessengerContactRow";
import { MessengerSectionLabel } from "./primitives";
import type { Contact } from "./types";

export function MessengerChatList({
  contacts,
  activeId,
  onSelect,
}: {
  contacts: Contact[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const pinned = contacts.filter((c) => c.pinned);
  const channels = contacts.filter((c) => !c.pinned && c.kind === "channel");
  const loads = contacts.filter((c) => !c.pinned && c.kind === "load");
  const dms = contacts.filter(
    (c) => !c.pinned && c.kind === "dm" && c.category !== "support" && c.category !== "archived",
  );
  const support = contacts.filter((c) => !c.pinned && c.category === "support");
  const archived = contacts.filter((c) => !c.pinned && c.category === "archived");

  const sections: { id: string; label: string; icon: React.ReactNode; items: Contact[] }[] = [
    { id: "pinned", label: "Pinned", icon: <Pin className="size-3" />, items: pinned },
    { id: "channels", label: "Dispatch Channels", icon: <Hash className="size-3" />, items: channels },
    { id: "loads", label: "Active Loads", icon: <Truck className="size-3" />, items: loads },
    { id: "dms", label: "Direct Messages", icon: <MessageSquare className="size-3" />, items: dms },
    { id: "support", label: "Support Inbox", icon: <LifeBuoy className="size-3" />, items: support },
    { id: "archived", label: "Archived", icon: <Archive className="size-3" />, items: archived },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-2 pb-3">
      {sections.map((s) =>
        s.items.length > 0 ? (
          <div key={s.id}>
            <MessengerSectionLabel icon={s.icon}>{s.label}</MessengerSectionLabel>
            {s.items.map((c) => (
              <MessengerContactRow
                key={c.id}
                c={c}
                active={c.id === activeId}
                onClick={() => onSelect(c.id)}
              />
            ))}
          </div>
        ) : null,
      )}
    </div>
  );
}
