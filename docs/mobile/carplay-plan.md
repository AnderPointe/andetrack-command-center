# CarPlay — V3 Planning (Phase 19)

Expands `docs/carplay-plan.md` with Phase 19 readiness surfaces.

## Module shape (recap)
- iOS app extension inside the Expo app
- `CPTemplateApplicationScene` in `Info.plist`
- `CPMapTemplate` + `CPNavigationSession`
- Dispatch messages via `CPAlertTemplate` (parked) or maneuver pill (driving)

## Phase 19 deliverables
- Planning dashboard at `/v3/carplay`
- Entitlement status surface (`future_approval_required`)
- Readiness checklist (`CARPLAY_CHECKLIST`)

## Hard gates
1. Apple CarPlay framework request approved (entitlement granted)
2. App Store privacy nutrition labels updated
3. App Review demo video showing driver-safe interactions
4. Native iOS extension implemented + tested on physical CarPlay rig

Until each gate passes, no production build may ship with the CarPlay
entitlement enabled.
