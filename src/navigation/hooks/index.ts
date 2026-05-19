/**
 * Phase 3 — Hook barrel.
 */
export {
  useNavigationSession,
  useNavigationEvents,
  useRouteProgressRealtime,
  useTurnByTurnInstruction,
  useNavigationETA,
  useOffRouteDetection,
  useVoiceInstructionEvents,
  useNavigationLocation,
} from "./useNavigationSession";
export { useTruckRouteValidation } from "./useTruckRouteValidation";
export { useDrivingSafetyMode, type DrivingSafetyMode, type DrivingSafetyState } from "./useDrivingSafetyMode";
export { useCoPilotNavigationStream } from "./useCoPilotNavigationStream";
export { useNavigationStateMachine } from "./useNavigationStateMachine";
export { useVoiceCoPilot, type VoiceCoPilotEntry } from "./useVoiceCoPilot";
export { useRouteIntelligence } from "./useRouteIntelligence";
export { useDispatchVoiceMessages, type DispatchVoiceMessage } from "./useDispatchVoiceMessages";
export { useOfflineVoiceQueue } from "./useOfflineVoiceQueue";
