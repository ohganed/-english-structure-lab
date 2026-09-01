# French Structure Lab — PROJECT CARD

## Goal
Build a calm, situation-first French learning app that moves from lived sentence to deeper structure on demand.

## Core loop
Situation → hear → sentence → Word Anatomy → Meaning Chunks → Sentence Architecture → Sound Architecture → Social Meaning → natural re-encounter.

## v0.1 scope
- One A1 world: `Une matinée à Paris`
- 20 connected sentences
- Natural and slow French TTS
- Word tap reveals lemma, POS, form, gender/number where available
- Meaning Chunks
- Sentence Architecture
- Sound Architecture panel
- Social Meaning panel
- Previous/next navigation
- Current sentence and encounter history persisted in localStorage
- PWA/offline shell

## Non-goals for v0.1
- No AI runtime
- No giant multilingual shared core
- No A2–C2 expansion
- No quiz engine
- No full conjugation-table-first UI
- No knowledge graph

## Reuse
- Russian Structure Lab: material-engine pattern
- Arabic Structure Lab: word/chunk/architecture and TTS patterns
- Chinese Structure Lab: durable learning-history and progressive-disclosure principles
- English Structure Lab: hosting/PWA/storage environment

## Completion gate
PASS only when browser/device verification confirms: 20-sentence navigation, TTS, word lemma inspection, chunks, structure panels, and persistence after reload.

## Current status
IMPLEMENTED — NOT VERIFIED
