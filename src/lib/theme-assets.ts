export const THEME_ASSET_TYPES = {
  LOGO_LIGHT: "logo_light",
  LOGO_DARK: "logo_dark",
  FAVICON: "favicon",
  SIDEBAR_ICON: "sidebar_icon",
  LOGIN_BACKGROUND: "login_background",
  MAP_MARKER: "map_marker",
  DRIVER_MARKER: "driver_marker",
} as const;

export type ThemeAssetType = typeof THEME_ASSET_TYPES[keyof typeof THEME_ASSET_TYPES];
