/**
 * Phase 2 — Mobile location tracking hook (web-safe placeholder).
 *
 * On web: uses the Geolocation API when available, otherwise gracefully
 * reports `unknown` permission. Designed so the React Native / Expo client
 * can swap in `expo-location` without changing the public shape:
 *
 *   const { permission, request, location, start, stop, trackingMode } =
 *     useMobileLocationTracking({ activeLoad, onDuty });
 *
 * SECURITY / PRIVACY:
 *   - Never start watching unless `consent === true` AND
 *     (`onDuty` OR `activeLoad`).
 *   - Permission denied state is exposed to the UI so the driver can fix it.
 *   - Off-duty drivers downgrade to `reduced_frequency`; no high-accuracy.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import type { LocationPermissionStatus, TrackingMode } from "@/types/location";

export interface LocationSample {
  latitude: number;
  longitude: number;
  heading: number | null;
  speed_mph: number | null;
  accuracy_meters: number | null;
  altitude: number | null;
  recorded_at: string;
}

interface Options {
  consent: boolean;
  onDuty: boolean;
  activeLoad: boolean;
  /** called for every sample (use to push to Supabase + live_state). */
  onSample?: (s: LocationSample) => void;
}

export function useMobileLocationTracking(opts: Options) {
  const [permission, setPermission] =
    useState<LocationPermissionStatus>("unknown");
  const [trackingMode, setTrackingMode] = useState<TrackingMode>("off");
  const [location, setLocation] = useState<LocationSample | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const onSampleRef = useRef(opts.onSample);
  onSampleRef.current = opts.onSample;

  const canTrack = opts.consent && (opts.onDuty || opts.activeLoad);

  const request = useCallback(async (): Promise<LocationPermissionStatus> => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setPermission("unknown");
      return "unknown";
    }
    try {
      const perms = (navigator as any).permissions;
      if (perms?.query) {
        const res = await perms.query({ name: "geolocation" as PermissionName });
        const mapped =
          res.state === "granted"
            ? "granted"
            : res.state === "denied"
            ? "denied"
            : "prompt";
        setPermission(mapped);
        return mapped;
      }
    } catch {
      /* fall through */
    }
    return new Promise<LocationPermissionStatus>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        () => {
          setPermission("granted");
          resolve("granted");
        },
        (err) => {
          const denied = err.code === err.PERMISSION_DENIED ? "denied" : "prompt";
          setPermission(denied);
          resolve(denied);
        },
        { timeout: 8000 },
      );
    });
  }, []);

  const start = useCallback(() => {
    if (!canTrack || typeof navigator === "undefined" || !navigator.geolocation) {
      setTrackingMode("off");
      return;
    }
    if (watchIdRef.current !== null) return;
    const mode: TrackingMode = opts.activeLoad
      ? "active_load"
      : opts.onDuty
      ? "foreground"
      : "reduced_frequency";
    setTrackingMode(mode);
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const s: LocationSample = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          heading: pos.coords.heading ?? null,
          speed_mph:
            pos.coords.speed != null ? +(pos.coords.speed * 2.23694).toFixed(1) : null,
          accuracy_meters: pos.coords.accuracy ?? null,
          altitude: pos.coords.altitude ?? null,
          recorded_at: new Date().toISOString(),
        };
        setLocation(s);
        onSampleRef.current?.(s);
      },
      () => setPermission("denied"),
      {
        enableHighAccuracy: mode === "active_load",
        maximumAge: mode === "active_load" ? 1000 : 10000,
        timeout: 15000,
      },
    );
  }, [canTrack, opts.activeLoad, opts.onDuty]);

  const stop = useCallback(() => {
    if (watchIdRef.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    watchIdRef.current = null;
    setTrackingMode("off");
  }, []);

  // Auto stop when consent revoked or driver goes off duty without a load.
  useEffect(() => {
    if (!canTrack) stop();
  }, [canTrack, stop]);

  useEffect(() => () => stop(), [stop]);

  return { permission, trackingMode, location, request, start, stop, canTrack };
}
