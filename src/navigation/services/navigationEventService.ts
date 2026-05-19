/**
 * Phase 3 — Thin wrapper around navigationService for event persistence.
 * Kept separate so future Phase 4 push/notification fan-out lives here.
 */
import { sendNavigationEventToDispatch } from "./navigationService";
import type { NavigationEvent } from "../types/navigation";

export async function recordNavigationEvent(evt: NavigationEvent) {
  await sendNavigationEventToDispatch(evt);
}
