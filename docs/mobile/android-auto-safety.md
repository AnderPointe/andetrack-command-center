# Android Auto — Driver Safety Review (Phase 19)

Enforced safety rules for the V3 Android Auto module.

| Rule | Status | Notes |
| --- | --- | --- |
| No scrolling lists while in motion | enforced | Pane templates only |
| Max 6 items per pane (Google HIG) | enforced | Hard cap in template builder |
| Voice-first reply for dispatch messages | planned | Phase 19 ships preview pill only |
| Emergency action on every template | planned | Wired via `RoutingInfoSnapshot.emergency` |
| No free-form keyboard input | enforced | Voice intents only |
| Maneuver bar mirrors phone CoPilot voice | planned | Shared intent registry |

## Driver-safe response policy

Driving mode caps responses at 18 words; parked mode allows full Q&A.
See `VOICE_SAFETY_POLICY` in `src/v3/data/mockPhase19.ts`.
