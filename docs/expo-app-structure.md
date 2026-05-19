# Anderoute EliteNav — Expo / React Native App Structure

This document maps the current web modules to a production Expo (React Native)
project. **No native code is added to this repo** — the web app remains the
source of truth for business logic, while this document is the porting plan.

## 1. Target stack

- **Expo SDK 51+** with **EAS Build** (managed workflow, custom dev client)
- **React Native 0.74+**, **React 18**
- **expo-router v3** (file-based routing, mirrors TanStack file routes)
- **react-native-reanimated 3** + **react-native-gesture-handler**
- **TanStack Query** for data fetching (shared with web)
- **Supabase JS** with `@supabase/supabase-js` + `AsyncStorage` adapter
- **expo-notifications** for push (Expo → APNs/FCM)
- **expo-location** with background location task
- **expo-secure-store** for tokens (Keychain / Keystore)
- **expo-speech** + **react-native-voice** for CoPilot voice I/O
- **react-native-maps** or **@rnmapbox/maps** for navigation surface

## 2. Recommended project layout

```text
anderoute-mobile/
├── app/                            # expo-router routes (mirror src/routes)
│   ├── _layout.tsx                 # Root layout (providers, theme)
│   ├── (auth)/login.tsx
│   ├── (driver)/
│   │   ├── _layout.tsx             # Tab nav: Drive | Loads | Inbox | Settings
│   │   ├── drive.tsx               # ← src/routes/driver.elite-nav.tsx
│   │   ├── copilot.tsx             # ← src/routes/driver.copilot-lab.tsx
│   │   ├── notifications.tsx       # ← src/routes/driver.notifications-lab.tsx
│   │   ├── loads/[id].tsx
│   │   └── pod/[loadId].tsx
│   └── settings/production.tsx     # ← src/routes/settings.production.tsx
├── src/
│   ├── navigation/                 # ← copied from web (CoPilot, voice, offline)
│   ├── notifications/              # ← copied from web (router, preferences)
│   ├── ai/                         # ← copied from web (provider abstraction)
│   ├── invehicle/                  # ← copied from web (adapter registry)
│   ├── runtime/                    # secure storage + consent (native versions)
│   ├── integrations/supabase/      # SDK clients (RN-flavored)
│   └── native/                     # native-only adapters
│       ├── ExpoPushAdapter.ts
│       ├── ExpoLocationAdapter.ts
│       ├── ExpoSecureStoreAdapter.ts
│       ├── ExpoVoiceAdapter.ts
│       ├── CarPlayBridge.ts        # iOS only (custom dev client)
│       └── AndroidAutoBridge.ts    # Android only (custom dev client)
├── assets/
├── app.config.ts                   # Expo config (permissions, entitlements)
├── eas.json                        # EAS build profiles (dev, preview, production)
└── package.json
```

## 3. Module porting matrix

| Web module                                | Mobile target                                     | Native deps                                   |
| ----------------------------------------- | ------------------------------------------------- | --------------------------------------------- |
| `src/navigation/voice/WebSpeechVoiceProvider` | `src/native/ExpoVoiceAdapter`                 | `expo-speech`, `@react-native-voice/voice`    |
| `src/navigation/voice/offlineQueue`       | unchanged (localStorage → AsyncStorage adapter)   | `@react-native-async-storage/async-storage`   |
| `src/notifications/providers/MockPushProvider` | `src/native/ExpoPushAdapter`                  | `expo-notifications`, `expo-device`           |
| `src/notifications/providers/ExpoPushProvider` | promoted to real impl                         | same                                          |
| `src/runtime/secureStorage` (web)         | `src/native/ExpoSecureStoreAdapter`               | `expo-secure-store`                           |
| `src/invehicle/adapters/WebSimAdapter`    | replaced by `CarPlayBridge` / `AndroidAutoBridge` | custom dev client + entitlement              |
| `src/ai/providers/*`                      | unchanged (fetch-based, isomorphic)               | none                                          |
| `src/navigation/components/*` (UI)        | rebuild with React Native primitives              | `react-native-reanimated`, native maps        |

## 4. app.config.ts essentials

```ts
export default {
  expo: {
    name: "Anderoute EliteNav",
    slug: "anderoute-elitenav",
    scheme: "anderoute",
    ios: {
      bundleIdentifier: "com.anderoute.elitenav",
      infoPlist: {
        NSLocationAlwaysAndWhenInUseUsageDescription:
          "Anderoute tracks your route to give dispatch live ETAs.",
        NSLocationWhenInUseUsageDescription:
          "Used for turn-by-turn navigation.",
        NSMicrophoneUsageDescription:
          "Used by the CoPilot voice assistant.",
        NSSpeechRecognitionUsageDescription:
          "Used to transcribe driver voice commands.",
        UIBackgroundModes: ["location", "audio", "fetch", "remote-notification"],
      },
      entitlements: {
        // CarPlay navigation entitlement requires Apple approval.
        "com.apple.developer.carplay-maps": true,
      },
    },
    android: {
      package: "com.anderoute.elitenav",
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION",
        "FOREGROUND_SERVICE",
        "FOREGROUND_SERVICE_LOCATION",
        "POST_NOTIFICATIONS",
        "RECORD_AUDIO",
      ],
    },
    plugins: [
      "expo-router",
      "expo-notifications",
      ["expo-location", { isAndroidBackgroundLocationEnabled: true }],
      "expo-secure-store",
    ],
  },
};
```

## 5. EAS profiles

```json
{
  "build": {
    "development": { "developmentClient": true, "distribution": "internal" },
    "preview":     { "distribution": "internal", "channel": "preview" },
    "production":  { "channel": "production", "autoIncrement": true }
  },
  "submit": {
    "production": {
      "ios": { "appleId": "...", "ascAppId": "...", "appleTeamId": "..." },
      "android": { "serviceAccountKeyPath": "./play-service-account.json" }
    }
  }
}
```

## 6. Porting order (recommended)

1. Bootstrap Expo project + expo-router + Supabase client (AsyncStorage).
2. Auth flow (email + Google OAuth via `expo-auth-session`).
3. Copy `src/ai/`, `src/notifications/services/`, `src/navigation/voice/` as-is.
4. Implement `ExpoPushAdapter`, register `notificationRouter` deeplinks.
5. Implement `ExpoLocationAdapter` with background task; wire to `driver_live_state`.
6. Rebuild EliteNav driver UI in React Native (port one screen at a time).
7. Add `ExpoVoiceAdapter`; reuse `intentRegistry` + `voiceCommandHandler`.
8. Custom dev client → CarPlay scene + Android Auto `CarAppService`.
9. Submit to TestFlight + Internal Testing; iterate on permissions copy.
10. Production submission (App Store + Play Store).

## 7. Shared code strategy

Keep `src/ai/`, `src/notifications/services/`, `src/navigation/voice/offlineQueue.ts`,
`src/notifications/services/notificationRouter.ts`, and CoPilot intent / tool
registries **isomorphic** (no DOM, no `window`, no `localStorage` direct use).
The web app already routes all storage through `src/runtime/secureStorage.ts`,
which is the single seam to swap between `localStorage` (web) and
`expo-secure-store` / `AsyncStorage` (native).

## 8. Out of scope for this doc

- Native Swift / Kotlin code (covered in `carplay-plan.md` and `android-auto-plan.md`).
- Push credential setup (covered in `mobile-release-checklist.md`).
- AI provider keys and Edge Function boundaries (covered in `ai-api-plan.md`
  and `security-model.md`).
