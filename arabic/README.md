# Arabic Structure Lab

A quiet reading environment for Arabic learners. The interface follows one learning path:

**Word Anatomy → Meaning Chunks → Sentence Architecture**

## What works in v0.1.0

- RTL Arabic reading surface
- Optional fully vocalized display
- Arabic TTS through the browser speech engine
- Tap a word to open Word Anatomy
- Lemma + root first, deeper morphology/إعراب only on demand
- Root → Word Family interaction
- Word ↔ chunk highlighting
- Meaning Chunks view with Arabic-order meaning and natural Japanese
- Sentence Architecture tree; structure nodes can focus the corresponding words
- JSON validation including `start/end` span checking
- Built-in Arabic Structure Lab v1.2 generation prompt
- Manual ChatGPT workflow: Arabic text → copy prompt → paste generated JSON
- Local library via `localStorage`
- PWA manifest + service worker for home-screen/offline use
- Built-in sample sentence for immediate testing

## Run locally

Serve this directory with any static server. For example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub Pages

The repository is static-site ready. If the repository is public, enable **Settings → Pages → Deploy from a branch → main / root**.

## Design principle

The Arabic text remains the visual center. Analysis should appear only when the learner asks for it. The app avoids quiz-like judgement and does not lead with parsing tables.
