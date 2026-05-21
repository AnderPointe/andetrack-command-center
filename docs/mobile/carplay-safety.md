# CarPlay — Driver Safety Review (Phase 19)

| Rule | Status | Notes |
| --- | --- | --- |
| No keyboard input while moving | enforced | Voice only |
| Lists capped at 6 items (Apple HIG) | enforced | Template builder enforces |
| Notifications: single primary action | enforced | `CPAlertTemplate` |
| Emergency action on every template | planned | Wired via shared intent registry |
| Driver-safe response policy applies | planned | Same `VOICE_SAFETY_POLICY` as Android Auto |

Siri intents (ETA, dispatch report, POD) require SiriKit precondition
checks before any irreversible action (POD restricted to parked-only).
