/**
 * Phase 5 — Push provider registry. Single shared instance per provider id.
 */
import type { PushNotificationProvider, PushProviderId } from "../types";
import { MockPushProvider } from "./MockPushProvider";
import { WebPushProvider } from "./WebPushProvider";
import { ExpoPushProvider } from "./ExpoPushProvider";
import { FcmPushProvider } from "./FcmPushProvider";
import { ApnsPushProvider } from "./ApnsPushProvider";

let current: PushNotificationProvider | null = null;
let currentId: PushProviderId | null = null;

export function getPushProvider(id: PushProviderId = "mock"): PushNotificationProvider {
  if (current && currentId === id) return current;
  switch (id) {
    case "webpush": current = new WebPushProvider(); break;
    case "expo":    current = new ExpoPushProvider(); break;
    case "fcm":     current = new FcmPushProvider();  break;
    case "apns":    current = new ApnsPushProvider(); break;
    case "mock":
    default:        current = new MockPushProvider(); break;
  }
  currentId = id;
  return current;
}

export function resetPushProvider() {
  current = null;
  currentId = null;
}

export const DEFAULT_PUSH_PROVIDER: PushProviderId = "mock";
