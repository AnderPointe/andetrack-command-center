/**
 * Phase 5 — Push registration hook.
 *
 * Tracks permission, acquires a device token from the active provider, and
 * upserts it into driver_push_tokens. Safe for SSR (no-op until effects run).
 */
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getPushProvider, DEFAULT_PUSH_PROVIDER } from "../providers/registry";
import type { PermissionStatus, PushProviderId, PushTokenRegistration } from "../types";

interface Options {
  driverId: string;
  companyId: string;
  providerId?: PushProviderId;
  /** When false, the hook will not auto-request permission on mount. */
  autoRegister?: boolean;
}

export function usePushRegistration(opts: Options) {
  const providerId = opts.providerId ?? DEFAULT_PUSH_PROVIDER;
  const provider = getPushProvider(providerId);
  const [permission, setPermission] = useState<PermissionStatus>(() => provider.getPermission());
  const [registration, setRegistration] = useState<PushTokenRegistration | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const register = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const perm = await provider.requestPermission();
      setPermission(perm);
      if (perm !== "granted") return null;

      const reg = await provider.getDeviceToken();
      if (!reg) return null;
      setRegistration(reg);

      // Upsert into driver_push_tokens. RLS lets the driver insert their own row.
      const { error: insErr } = await supabase
        .from("driver_push_tokens")
        .upsert(
          {
            driver_id: opts.driverId,
            company_id: opts.companyId,
            provider: reg.provider,
            token: reg.token,
            device_id: reg.device_id ?? null,
            device_model: reg.device_model ?? null,
            platform: reg.platform,
            app_version: reg.app_version ?? null,
            locale: reg.locale ?? null,
            last_seen_at: new Date().toISOString(),
            revoked_at: null,
          },
          { onConflict: "provider,token" },
        );
      if (insErr) setError(insErr.message);
      return reg;
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setBusy(false);
    }
  }, [opts.driverId, opts.companyId, provider]);

  useEffect(() => {
    if (opts.autoRegister) void register();
  }, [opts.autoRegister, register]);

  return { permission, registration, register, busy, error, providerId };
}
