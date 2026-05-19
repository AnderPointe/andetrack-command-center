/**
 * Phase 6 — RBAC permission registry.
 * Roles are stored in public.user_roles (app_role enum).
 * Permissions are derived in code from roles; UI uses PermissionGate.
 */
export type AppRole =
  | "platform_owner" | "platform_support"
  | "owner" | "company_owner" | "admin" | "company_admin"
  | "billing_admin" | "dispatcher_manager" | "dispatcher"
  | "driver" | "mechanic"
  | "customer_admin" | "customer_user"
  | "viewer";

export type Permission =
  | "company.manage" | "users.manage"
  | "billing.manage" | "billing.view"
  | "dispatch.manage" | "dispatch.view"
  | "loads.create" | "loads.assign" | "loads.cancel" | "loads.view"
  | "drivers.manage" | "drivers.view"
  | "vehicles.manage" | "vehicles.view"
  | "customers.manage" | "customers.view"
  | "customer_portal.view"
  | "shipments.create" | "shipments.view"
  | "reports.view"
  | "alerts.manage" | "alerts.view"
  | "copilot.use" | "copilot.admin"
  | "settings.manage" | "audit_logs.view"
  | "platform.manage";

const OWNER_SET: Permission[] = [
  "company.manage","users.manage","billing.manage","billing.view",
  "dispatch.manage","dispatch.view","loads.create","loads.assign","loads.cancel","loads.view",
  "drivers.manage","drivers.view","vehicles.manage","vehicles.view",
  "customers.manage","customers.view","shipments.create","shipments.view",
  "reports.view","alerts.manage","alerts.view","copilot.use","copilot.admin",
  "settings.manage","audit_logs.view",
];

export const ROLE_PERMISSIONS: Record<AppRole, Permission[]> = {
  platform_owner: [...OWNER_SET, "platform.manage"],
  platform_support: ["dispatch.view","loads.view","drivers.view","vehicles.view","customers.view","shipments.view","reports.view","alerts.view","audit_logs.view"],
  owner: OWNER_SET,
  company_owner: OWNER_SET,
  admin: OWNER_SET,
  company_admin: OWNER_SET,
  billing_admin: ["billing.manage","billing.view","reports.view","audit_logs.view"],
  dispatcher_manager: ["dispatch.manage","dispatch.view","loads.create","loads.assign","loads.cancel","loads.view","drivers.view","vehicles.view","customers.view","shipments.view","alerts.manage","alerts.view","copilot.use","reports.view"],
  dispatcher: ["dispatch.view","loads.view","loads.assign","loads.create","drivers.view","vehicles.view","customers.view","shipments.view","alerts.view","copilot.use"],
  driver: ["loads.view","copilot.use"],
  mechanic: ["vehicles.view","vehicles.manage","alerts.view"],
  customer_admin: ["customer_portal.view","shipments.create","shipments.view","customers.view","billing.view"],
  customer_user: ["customer_portal.view","shipments.create","shipments.view"],
  viewer: ["dispatch.view","loads.view","drivers.view","vehicles.view","customers.view","shipments.view","reports.view","alerts.view"],
};

export function permissionsForRoles(roles: AppRole[]): Set<Permission> {
  const set = new Set<Permission>();
  for (const r of roles) (ROLE_PERMISSIONS[r] ?? []).forEach((p) => set.add(p));
  return set;
}

export function hasPermission(roles: AppRole[], perm: Permission): boolean {
  return permissionsForRoles(roles).has(perm);
}
