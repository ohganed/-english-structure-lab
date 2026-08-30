#!/usr/bin/env python3
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()

def fail(message: str) -> None:
    print(f"[FAIL] {message}")
    raise SystemExit(1)

def ok(message: str) -> None:
    print(f"[PASS] {message}")

def read(path: str) -> str:
    p = ROOT / path
    if not p.exists(): fail(f"missing required file: {path}")
    return p.read_text(encoding="utf-8", errors="replace")

required_files=["arabic/index.html","arabic/course-mode.js","arabic/custom-corpus.js","arabic/audio-service.js","arabic/word-audio.js","arabic/sentence-pager.js","arabic/progressive-word.js","arabic/deep-analysis-audited.js","arabic/deep-audit-pack2.js","arabic/deep-audit-fixes.js","arabic/deep-audit-nominals.js","arabic/deep-audit-nominal-aliases.js","arabic/word-declension.js","arabic/verb-conjugation-full.js","arabic/course-word-depth.js","arabic/language-mode.js","arabic/service-worker.js","arabic/a1-batch1.js","arabic/a1-batch2.js","arabic/a1-batch3.js","arabic/a1-expansion.js",".github/workflows/pages.yml"]
for f in required_files: read(f)
ok("critical Arabic runtime files exist")

# A1 must remain a first-class built-in course with all 750 experiences.
a1_text="\n".join(read(f) for f in ("arabic/a1-batch1.js","arabic/a1-batch2.js","arabic/a1-batch3.js","arabic/a1-expansion.js"))
a1_ids=re.findall(r"\['a1e(\d{3})'",a1_text)
if len(a1_ids)!=750: fail(f"A1 built-in course count changed: expected 750, found {len(a1_ids)}")
if a1_ids[0] != "001" or a1_ids[-1] != "750": fail("A1 built-in course range must remain a1e001–a1e750")
ok("A1 built-in course contains 750 experiences")

pages=read(".github/workflows/pages.yml")
if "<script src=\"./deep-analysis-engine.js\"" in pages: fail("legacy deep-analysis-engine.js is still injected into production")
if re.search(r"\barabic/deep-analysis-engine\.js\b",pages): fail("legacy deep-analysis-engine.js is still copied into the production artifact")
ok("legacy Deep Analysis engine is excluded from production")

index_lines=[line.strip() for line in pages.splitlines() if "sed -i" in line and "_site/arabic/index.html" in line]
if len(index_lines)!=1: fail(f"expected exactly one Arabic index injection line, found {len(index_lines)}")
script_order=re.findall(r'<script src="\./([^"]+)"></script>',index_lines[0])
if not script_order: fail("could not parse Arabic production script order")
if len(script_order)!=len(set(script_order)): fail("duplicate production script detected in Arabic index injection")
required_order=["custom-corpus.js","audio-service.js","word-audio.js","sentence-pager.js","library-compat.js","progressive-word.js","deep-analysis-audited.js","deep-audit-pack2.js","deep-audit-fixes.js","deep-audit-nominals.js","deep-audit-nominal-aliases.js","word-declension.js","verb-conjugation-full.js","course-mode.js","course-word-depth.js","language-mode.js"]
missing=[s for s in required_order if s not in script_order]
if missing: fail("missing required production scripts: "+", ".join(missing))
positions=[script_order.index(s) for s in required_order]
if positions!=sorted(positions): fail("Arabic production script order violates the audited dependency order")
ok("production script order is deterministic and dependency-safe")

audio=read("arabic/audio-service.js")
for marker in ("ARABIC_AUDIO_SERVICE","SpeechSynthesisUtterance","chooseVoice"):
    if marker not in audio: fail(f"AudioService contract missing: {marker}")
ok("AudioService is the centralized browser-TTS boundary")

word_audio=read("arabic/word-audio.js")
if "data-speak-ar" not in word_audio or "ARABIC_AUDIO_SERVICE" not in word_audio: fail("word-audio is not routed through AudioService")
if "SpeechSynthesisUtterance" in word_audio or "speechSynthesis.speak" in word_audio: fail("word-audio bypasses AudioService")
ok("word taps use the centralized AudioService")

course=read("arabic/course-mode.js")
for marker in ("courseSentenceWord","sentenceHtml","data-course-word","Arabic · tap any word","A1 Course","ARABIC_COURSE_OPEN","openCourse('A1')"):
    if marker not in course: fail(f"Course interaction/A1 entry missing: {marker}")
if "ARABIC_AUDIO_SERVICE" not in course: fail("Course audio is not routed through AudioService")
if "SpeechSynthesisUtterance" in course or "speechSynthesis.speak" in course: fail("Course bypasses AudioService")
if "querySelectorAll('[data-course-word]').forEach(b=>b.onclick" in course: fail("Course still owns a duplicate per-word audio click handler")
ok("A1 direct entry and sentence-word interaction are present")

progressive=read("arabic/progressive-word.js")
if "ARABIC_AUDIO_SERVICE" not in progressive: fail("progressive word replay is not routed through AudioService")
if "SpeechSynthesisUtterance" in progressive or "speechSynthesis.speak" in progressive: fail("progressive word bypasses AudioService")
ok("progressive word replay uses AudioService")

custom=read("arabic/custom-corpus.js")
if re.search(r"\brender\s*=\s*function",custom): fail("custom-corpus still overrides global render")
ok("AI Corpus no longer owns a redundant global render wrapper")

pager=read("arabic/sentence-pager.js")
if "arabicFallbackHtml" not in pager or "data-speak-ar" not in pager: fail("AI Corpus fallback tokenization contract is missing")
ok("AI Corpus has fallback tokenization for tappable Arabic words")

word_depth=read("arabic/course-word-depth.js")
for marker in ("Pronunciation","Meaning","Dictionary Form · Stem · Root","Grammar","Conjugation Table","Case Table","Current Form","nominalCurrentCell","ARABIC_WORD_PANEL_OPEN"):
    if marker not in word_depth: fail(f"full word-panel contract missing marker: {marker}")
if "count=Math.min" in word_depth: fail("word panel still requires repeated taps to reach inflection data")
ok("one-tap full word analysis and current-form highlighting are present")

declension=read("arabic/word-declension.js")
for marker in ("مَكْتَبَة","Sound Masculine Plural","Sound Feminine Plural","Broken Plural","Nominative","Accusative","Genitive"):
    if marker not in declension: fail(f"nominal declension contract missing: {marker}")
ok("noun/adjective case tables cover audited singular and plural paradigms")

verb=read("arabic/verb-conjugation-full.js")
for pronoun in ("أَنَا","نَحْنُ","أَنْتَ","أَنْتِ","أَنْتُمَا","أَنْتُمْ","أَنْتُنَّ","هُوَ","هِيَ","هُمْ","هُنَّ"):
    if pronoun not in verb: fail(f"full conjugation pronoun set missing: {pronoun}")
ok("full verb-conjugation pronoun set is present")

sw=read("arabic/service-worker.js")
for critical in ("audio-service\\.js","word-audio\\.js","sentence-pager\\.js","word-declension\\.js","verb-conjugation-full\\.js","course-word-depth\\.js"):
    if critical not in sw: fail(f"service worker fresh-critical list missing: {critical}")
if not re.search(r"arabic-structure-lab-v\d+\.\d+\.\d+",sw): fail("service worker cache version is not explicit")
ok("service worker protects critical Arabic runtime scripts from stale-cache regressions")

print("RESULT: PASS — Arabic Structure Lab stabilization invariants hold")
