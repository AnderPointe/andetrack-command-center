import { useCallback, useEffect, useState } from "react";
import { type DriverConsent, DEFAULT_CONSENT, loadConsent, saveConsent } from "./driverConsent";

export function useDriverConsent() {
  const [consent, setConsent] = useState<DriverConsent>(DEFAULT_CONSENT);

  useEffect(() => { setConsent(loadConsent()); }, []);

  const update = useCallback((patch: Partial<DriverConsent>) => {
    setConsent((c) => {
      const next: DriverConsent = {
        ...c,
        ...patch,
        raw_audio_persist: false,
        acceptedAt: patch.acceptedAt ?? c.acceptedAt ?? (Object.values(patch).some(Boolean) ? new Date().toISOString() : c.acceptedAt),
      };
      saveConsent(next);
      return next;
    });
  }, []);

  return { consent, update };
}
