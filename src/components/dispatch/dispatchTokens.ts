import type { DriverStatus } from "@/types/map";

export const DRIVER_STATUS_COLOR: Record<DriverStatus, string> = {
  available: "#10b981",
  assigned: "#3b82f6",
  loaded: "#f97316",
  break: "#a855f7",
  alert: "#ef4444",
  offline: "#94a3b8",
};

export const DRIVER_STATUS_LABEL: Record<DriverStatus, string> = {
  available: "Available",
  assigned: "Assigned",
  loaded: "Loaded",
  break: "Break",
  alert: "Alert",
  offline: "Offline",
};

export const ALL_DRIVER_STATUSES: DriverStatus[] = [
  "available",
  "assigned",
  "loaded",
  "break",
  "alert",
  "offline",
];

export const STALE_AFTER_SECONDS = 120;
