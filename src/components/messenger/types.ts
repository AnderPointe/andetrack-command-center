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

export type EtaRisk = "low" | "medium" | "high" | "delayed";

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
  etaRisk?: EtaRisk;
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

export type InboxFilter =
  | "all"
  | "unread"
  | "urgent"
  | "Driver"
  | "Courier"
  | "Carrier"
  | "Customer"
  | "Warehouse"
  | "active_loads"
  | "delayed_loads"
  | "invoices"
  | "emergency"
  | "archived";

// Back-compat alias (older code may import TypeFilter)
export type TypeFilter = InboxFilter;

export const roleStyles: Record<Role, string> = {
  Carrier: "bg-primary/15 text-primary border border-primary/35",
  Driver: "bg-success/15 text-success border border-success/35",
  Broker: "bg-warning/15 text-warning border border-warning/35",
  Dispatcher: "bg-info/15 text-info border border-info/35",
  Customer: "bg-accent text-accent-foreground border border-border",
  Warehouse: "bg-teal/15 text-teal border border-teal/35",
  Courier: "bg-orange/15 text-orange border border-orange/35",
};

export const priorityStyles: Record<Priority, string> = {
  normal: "bg-muted text-muted-foreground border border-border",
  important: "bg-info/15 text-info border border-info/35",
  urgent: "bg-orange/15 text-orange border border-orange/35",
  emergency: "bg-destructive/15 text-destructive border border-destructive/40",
};

export const etaRiskStyles: Record<EtaRisk, { label: string; cls: string }> = {
  low: { label: "ETA Low", cls: "bg-success/15 text-success border border-success/30" },
  medium: { label: "ETA Med", cls: "bg-warning/15 text-warning border border-warning/35" },
  high: { label: "ETA High", cls: "bg-orange/15 text-orange border border-orange/35" },
  delayed: { label: "Delayed", cls: "bg-destructive/15 text-destructive border border-destructive/40" },
};

export const inboxFilters: { id: InboxFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "urgent", label: "Urgent" },
  { id: "Driver", label: "Drivers" },
  { id: "Courier", label: "Couriers" },
  { id: "Carrier", label: "Carriers" },
  { id: "Customer", label: "Customers" },
  { id: "Warehouse", label: "Warehouses" },
  { id: "active_loads", label: "Active Loads" },
  { id: "delayed_loads", label: "Delayed Loads" },
  { id: "invoices", label: "Invoices" },
  { id: "emergency", label: "Emergency" },
  { id: "archived", label: "Archived" },
];

// Back-compat for sidebar import
export const typeFilters = inboxFilters;
