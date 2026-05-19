import { useCallback, useEffect, useState } from "react";
import {
  type NotificationPreferences,
  DEFAULT_PREFS,
  loadPreferences,
  savePreferences,
} from "../services/notificationPreferences";

export function useNotificationPreferences() {
  const [prefs, setPrefs] = useState<NotificationPreferences>(DEFAULT_PREFS);

  useEffect(() => { setPrefs(loadPreferences()); }, []);

  const update = useCallback((patch: Partial<NotificationPreferences>) => {
    setPrefs((p) => {
      const next: NotificationPreferences = {
        enabled:    { ...p.enabled,    ...(patch.enabled    ?? {}) },
        quietHours: { ...p.quietHours, ...(patch.quietHours ?? {}) },
      };
      savePreferences(next);
      return next;
    });
  }, []);

  return { prefs, update };
}
