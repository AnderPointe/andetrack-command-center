export type Role =
  | "Carrier"
  | "Driver"
  | "Broker"
  | "Dispatcher"
  | "Customer"
  | "Warehouse"
  | "Courier";

export type Category =
  | "pinned"
  | "active_loads"
  | "dispatch"
  | "invoices"
  | "completed"
  | "support"
  | "archived";

export type ConversationKind = "dm" | "channel" | "load";

export type Priority = "normal" | "important" | "urgent" | "emergency";

export type Reaction = { emoji: string; count: number; mine?: boolean };

export type LinkedLoad = {
  id: string; // e.g. LD-1048
  origin: string;
  destination: string;
  status: string; // In Transit, At Pickup, etc.
  eta?: string;
};

export type Contact = {
  id: string;
  kind: ConversationKind;
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
  online?: boolean;
  priority?: Priority;
  linkedLoad?: LinkedLoad;
  channelTopic?: string;
};

export type BaseMsg = {
  id: string;
  from: "me" | "them";
  time: string;
  authorName?: string;
  reactions?: Reaction[];
  threadCount?: number;
  priority?: Priority;
  pinned?: boolean;
  edited?: boolean;
};

export type Message =
  | (BaseMsg & {
      kind: "text";
      text: string;
      quote?: { name: string; text: string };
      mentions?: string[];
    })
  | (BaseMsg & {
      kind: "file";
      filename: string;
      filetype: string;
      sizeKb?: number;
    })
  | (BaseMsg & {
      kind: "voice";
      durationSec: number;
      waveform?: number[];
    })
  | (BaseMsg & {
      kind: "location";
      label: string;
      city: string;
      coords: string;
    })
  | (BaseMsg & {
      kind: "load_status";
      loadId: string;
      status: string;
      eta?: string;
      note?: string;
    })
  | (BaseMsg & {
      kind: "system";
      text: string;
      icon?: "alert" | "info" | "check";
    });

export type Attachment = { name: string; type: string; size?: number };

export type TypeFilter =
  | "all"
  | "unread"
  | "Driver"
  | "Courier"
  | "Carrier"
  | "Broker"
  | "Customer"
  | "Warehouse";

export type CategoryFilter = "all" | Category;

export const roleStyles: Record<Role, string> = {
  Carrier: "bg-[#6D35E8]/20 text-[#B79CFF] border border-[#6D35E8]/40",
  Driver: "bg-[#22C55E]/15 text-[#5EE6A0] border border-[#22C55E]/35",
  Broker: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  Dispatcher: "bg-sky-500/15 text-sky-300 border border-sky-500/30",
  Customer: "bg-pink-500/15 text-pink-300 border border-pink-500/30",
  Warehouse: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30",
  Courier: "bg-[#F97316]/15 text-orange-300 border border-[#F97316]/35",
};

export const priorityStyles: Record<Priority, string> = {
  normal: "bg-white/5 text-[#8B90A7] border border-white/10",
  important: "bg-sky-500/15 text-sky-300 border border-sky-500/30",
  urgent: "bg-[#F97316]/15 text-orange-300 border border-[#F97316]/35",
  emergency: "bg-[#EF4444]/15 text-red-300 border border-[#EF4444]/40",
};

export const typeFilters: { id: TypeFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "Driver", label: "Drivers" },
  { id: "Courier", label: "Couriers" },
  { id: "Carrier", label: "Carriers" },
  { id: "Broker", label: "Brokers" },
  { id: "Customer", label: "Customers" },
  { id: "Warehouse", label: "Warehouses" },
];

export const categoryFilters: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pinned", label: "Pinned" },
  { id: "active_loads", label: "Active Loads" },
  { id: "dispatch", label: "Dispatch" },
  { id: "invoices", label: "Invoices" },
  { id: "support", label: "Support" },
  { id: "completed", label: "Completed" },
  { id: "archived", label: "Archived" },
];
