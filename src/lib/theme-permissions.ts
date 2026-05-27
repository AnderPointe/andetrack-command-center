export const THEME_PERMISSIONS = {
  OWNER: "Can create, edit, publish, and delete themes",
  ADMIN: "Can edit and publish company themes",
  MANAGER: "Can preview themes only",
  DISPATCHER: "Can use assigned theme only",
  DRIVER: "Can use assigned theme only",
  CUSTOMER: "Can use customer portal theme only",
} as const;

export type ThemeRole = keyof typeof THEME_PERMISSIONS;

export const THEME_ROLE_CAPABILITIES: Record<
  ThemeRole,
  {
    canCreate: boolean;
    canEdit: boolean;
    canPublish: boolean;
    canDelete: boolean;
    canPreview: boolean;
    canUseAssigned: boolean;
  }
> = {
  OWNER:      { canCreate: true,  canEdit: true,  canPublish: true,  canDelete: true,  canPreview: true, canUseAssigned: true },
  ADMIN:      { canCreate: false, canEdit: true,  canPublish: true,  canDelete: false, canPreview: true, canUseAssigned: true },
  MANAGER:    { canCreate: false, canEdit: false, canPublish: false, canDelete: false, canPreview: true, canUseAssigned: true },
  DISPATCHER: { canCreate: false, canEdit: false, canPublish: false, canDelete: false, canPreview: false, canUseAssigned: true },
  DRIVER:     { canCreate: false, canEdit: false, canPublish: false, canDelete: false, canPreview: false, canUseAssigned: true },
  CUSTOMER:   { canCreate: false, canEdit: false, canPublish: false, canDelete: false, canPreview: false, canUseAssigned: true },
};
