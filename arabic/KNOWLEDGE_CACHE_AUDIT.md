# Arabic Structure Lab — Knowledge Cache Audit v0.1

## Goal

Reduce repeated AI lexical analysis when the user imports new self-written Arabic dialogues, while preserving sentence-specific contextual analysis and keeping the learner runtime AI-free.

## Current architecture found

### Existing strengths

- `course-lexicon-pack.js` already contains curated lexical facts for recurring course vocabulary.
- `course-lexicon-bridge.js` already merges curated course facts into the deeper word panel.
- `custom-corpus.js` already keeps user-generated AI material separate from built-in curriculum.
- `ai-corpus-normalizer.js` already repairs word/chunk offsets before validation and also migrates saved AI corpus entries.
- `library-compat.js` already preserves compatibility between old saved material and AI Corpus.
- TTS is browser/native `speechSynthesis`; no generated audio file storage is required.

### Main gap

AI Corpus stores complete analyzed documents in `localStorage` but does not maintain a reusable lexical memory across documents. Therefore a new dialogue can ask the AI to reconstruct lexical facts already analyzed in earlier material.

### Secondary integration gap

The repository contains multiple Arabic enhancement scripts, while the current `index.html` still contains its own compact inline implementation. The enhancement files should be integrated deliberately rather than assumed to be active simply because they exist in the repository or service-worker freshness list.

## Implemented on `feat/arabic-knowledge-cache-v0.1`

### `knowledge-base.js`

Adds an AI-free browser lexical cache:

- storage key: `asl.knowledge.v1`
- schema: `Arabic Structure Lab Knowledge v0.1`
- Arabic normalization strips harakat and punctuation for lookup only
- preserves lemma, vocalized lemma, root, part of speech, stable pattern facts, word family
- stores observed senses with provenance rather than treating one contextual meaning as universally true
- intentionally does **not** cache sentence-specific iʿrāb/case/syntax as reusable truth
- maps surface/vocalized/lemma forms to a stable lexical entry
- automatically ingests already-saved `asl.ai.corpus.v1` documents when the module loads
- exports `lookup()`, `ingestDocument()`, `promptContext()`, `stats()`, `export()`, `clear()`

### `custom-corpus.js`

Updated so that:

1. saved AI documents are ingested into the Knowledge Base;
2. before copying a new AI-analysis prompt, words already known from previous corpus entries are injected as `KNOWN LEXICAL FACTS`;
3. the prompt explicitly tells the analyzer to reuse lexical hints but re-check contextual meaning, syntax, case/iʿrāb, clitic boundaries, and sense choice;
4. runtime remains AI-free: AI is still only used externally at build/import time.

### `knowledge-base-smoke.html`

Browser smoke test covering:

- module API availability
- document ingestion
- surface lookup
- vocalized/lemma normalization
- prompt-context reuse
- statistics

## Acceptance checks

| Claim | Evidence / verifier | Status |
|---|---|---|
| Existing published `main` remains unchanged | feature branch only | PASS |
| Existing AI Corpus data format remains readable | same `asl.ai.corpus.v1` storage retained | PASS |
| Previously analyzed lexical facts can be reused | `ARABIC_KB.promptContext()` | PASS by implementation; browser smoke test provided |
| Sentence-specific grammar is not blindly cached | Knowledge record excludes iʿrāb/case/syntax as stable fields | PASS |
| Existing saved AI documents can seed the cache | `ingestExistingAICorpus()` | PASS |
| No runtime AI dependency is introduced | pure browser JS/localStorage | PASS |
| Audio-file storage is not introduced | no audio changes; native TTS remains | PASS |
| Cross-device sync is solved | not part of v0.1; current storage is browser-local | NOT YET IMPLEMENTED |
| Main `index.html` integration is verified in production | branch does not modify `main` | UNVERIFIED / intentionally not deployed |

## Next architecture step after v0.1 is validated

Keep source-of-truth responsibilities separate:

- **Built-in course lexicon**: curated static course facts
- **User Knowledge Base**: learned/reused lexical facts from self-written material
- **Sentence analysis**: contextual syntax, iʿrāb, chunks, mental scene, communicative intent
- **Progress**: learner state
- **Sync**: separate future layer (CloudKit/other sync), never a single shared SQLite file edited concurrently by devices

The safe next merge should only happen after opening `knowledge-base-smoke.html` on the feature branch or local checkout and receiving `PASS`.
