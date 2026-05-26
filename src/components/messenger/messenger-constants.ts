export const MESSAGE_TEMPLATES: { label: string; body: string }[] = [
  { label: "Pickup confirmed", body: "Your pickup has been confirmed." },
  { label: "Request location", body: "Please send your current location." },
  { label: "Upload POD", body: "Please upload the POD when delivery is complete." },
  { label: "Customer notified", body: "Customer has been notified of the delay." },
  { label: "Confirm dock", body: "Please confirm your dock assignment." },
  { label: "Route updated", body: "Your route has been updated. Please review." },
];

export const SUGGESTED_REPLIES = [
  "Send ETA Update",
  "Request Location",
  "Confirm Pickup",
  "Ask for POD",
  "Notify Customer",
  "Escalate Delay",
];

export const DRIVER_QUICK_REPLIES = [
  "Arrived",
  "Loaded",
  "En Route",
  "Delayed",
  "Need Help",
  "POD Uploaded",
  "Delivered",
];

export const SNOOZE_OPTIONS: { label: string; minutes: number }[] = [
  { label: "15 minutes", minutes: 15 },
  { label: "1 hour", minutes: 60 },
  { label: "Until tomorrow", minutes: 60 * 18 },
  { label: "Until delivery window", minutes: 60 * 4 },
];

export const NOTIFICATION_LEVELS = [
  "All Messages",
  "Mentions Only",
  "Urgent Only",
  "Emergency Only",
  "Muted",
] as const;
export type NotificationLevel = (typeof NOTIFICATION_LEVELS)[number];
