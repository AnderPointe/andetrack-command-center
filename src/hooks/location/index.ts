/**
 * Phase 2 — Location hook barrel.
 *
 * Two clearly separated entry points so it's obvious which one talks to a
 * real device and which one drives the dev/demo stream:
 *
 *   import { useMockDriverLocationStream } from "@/hooks/location";   // demo
 *   import { useRealDeviceLocation }       from "@/hooks/location";   // device
 *
 * Phase 3 will add `useNavSdkLocation` here (Mapbox / Google Nav SDK) using
 * the SAME `LocationSample` shape so consumers don't change.
 */

// Mock GPS — drives a fake driver along a polyline. NEVER hits a sensor.
export { useDriverLocationStream as useMockDriverLocationStream } from "../useDriverLocationStream";
export {
  startMockLocationStream,
  stopMockLocationStream,
  stopAllMockStreams,
  DEMO_ROUTE_DALLAS_HOUSTON,
  type MockStreamConfig,
  type MockStreamSample,
} from "@/data/mockGpsStream";

// Real device GPS — Web Geolocation today, Expo Location on RN tomorrow.
export {
  useMobileLocationTracking as useRealDeviceLocation,
  type LocationSample,
} from "../useMobileLocationTracking";

// Live state subscription (Supabase Realtime) — consumed by dispatcher map.
export { useDriverLiveState } from "../useDriverLiveState";
export { useGpsStaleClock } from "../useGpsStaleClock";
