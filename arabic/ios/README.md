# Arabic Structure Lab — iPhone Native Layer

The Arabic analysis engine and reading UI remain web-based. The native iPhone layer provides capabilities that Safari/PWA cannot expose deeply enough.

## Implemented foundation

- WKWebView host for the Arabic Structure Lab UI
- JavaScript → Swift bridge
- Core Haptics engine
- Arabic AVSpeechSynthesizer
- tactile pulses synchronized through AVSpeechSynthesizerDelegate
- reserved native-feature bridge for camera, microphone, share sheet, background audio and Lock Screen integration

## Design rule

The analysis stays deep internally. The visible experience stays quiet: Arabic text → sound → touch → meaning → optional analysis.

Vowel marks are controlled only by the learner's button. The app never removes them automatically.

## Next native capabilities

1. Camera / Live Text import into Arabic Structure Lab
2. Microphone recording and A/B playback against the model pronunciation — no score
3. Share Extension: Safari/news app → Arabic Structure Lab
4. Background audio and Now Playing controls for listening mode
5. AirPods-friendly repeat / sentence / chunk navigation
6. Lock Screen / Live Activity only when it genuinely helps listening continuity
7. On-device lesson cache so the reading screen works without a network connection

## Haptic principle

Haptics are linguistic timing cues, not notifications. Keep them quiet. Do not vibrate every Arabic character. Prefer spoken-unit/chunk boundaries, with optional deeper modes later for suffix pronouns and i'rab endings.
