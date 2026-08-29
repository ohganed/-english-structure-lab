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
    if not p.exists():
        fail(f"missing required file: {path}")
    return p.read_text(encoding="utf-8", errors="replace")


required_files = [
    "arabic/index.html",
    "arabic/course-mode.js",
    "arabic/custom-corpus.js",
    "arabic/word-audio.js",
    "arabic/sentence-pager.js",
    "arabic/progressive-word.js",
    "arabic/deep-analysis-audited.js",
    "arabic/deep-audit-pack2.js",
    "arabic/deep-audit-fixes.js",
    "arabic/deep-audit-nominals.js",
    "arabic/deep-audit-nominal-aliases.js",
    "arabic/word-declension.js",
    "arabic/verb-conjugation-full.js",
    "arabic/course-word-depth.js",
    "arabic/language-mode.js",
    "arabic/service-worker.js",
    ".github/workflows/pages.yml",
]
for f in required_files:
    read(f)
ok("critical Arabic runtime files exist")

pages = read(".github/workflows/pages.yml")

# Single source of truth for Deep Analysis: audited engine only.
if re.search(r"<script\s+src=\\?\"\./deep-analysis-engine\.js", pages):
    fail("legacy deep-analysis-engine.js is still injected into production")
if re.search(r"\barabic/deep-analysis-engine\.js\b", pages):
    fail("legacy deep-analysis-engine.js is still copied into the production artifact")
ok("legacy Deep Analysis engine is excluded from production")

# Extract the script order from the production index injection in pages.yml.
m = re.search(
    r"sed -i 's#</body>#(?P<body>.*?)</body>#' _site/arabic/index\.html",
    pages,
    re.S,
)
if not m:
    fail("could not locate Arabic production script injection in pages.yml")
script_order = re.findall(r'<script src=\\?"\./([^"\\]+)\\?">', m.group("body"))
if not script_order:
    fail("could not parse Arabic production script order")
if len(script_order) != len(set(script_order)):
    fail("duplicate production script detected in Arabic index injection")

required_order = [
    "custom-corpus.js",
    "word-audio.js",
    "sentence-pager.js",
    "library-compat.js",
    "progressive-word.js",
    "deep-analysis-audited.js",
    "deep-audit-pack2.js",
    "deep-audit-fixes.js",
    "deep-audit-nominals.js",
    "deep-audit-nominal-aliases.js",
    "word-declension.js",
    "verb-conjugation-full.js",
    "course-mode.js",
    "course-word-depth.js",
    "language-mode.js",
]
missing = [s for s in required_order if s not in script_order]
if missing:
    fail("missing required production scripts: " + ", ".join(missing))
positions = [script_order.index(s) for s in required_order]
if positions != sorted(positions):
    fail("Arabic production script order violates the audited dependency order")
ok("production script order is deterministic and dependency-safe")

# Runtime interaction invariants introduced by the stabilization work.
word_audio = read("arabic/word-audio.js")
if "data-speak-ar" not in word_audio or "ARABIC_SPEAK_WORD" not in word_audio:
    fail("central Arabic word-audio fallback contract is missing")
ok("central word-audio fallback contract is present")

pager = read("arabic/sentence-pager.js")
if "arabicFallbackHtml" not in pager or "data-speak-ar" not in pager:
    fail("AI Corpus fallback tokenization contract is missing")
ok("AI Corpus has fallback tokenization for tappable Arabic words")

word_depth = read("arabic/course-word-depth.js")
for marker in ("3 Forms", "Full Conjugation Table", "Current Form"):
    if marker not in word_depth:
        fail(f"course word-depth interaction contract missing marker: {marker}")
ok("course progressive word-depth contract is present")

verb = read("arabic/verb-conjugation-full.js")
for pronoun in ("أَنَا", "نَحْنُ", "أَنْتَ", "أَنْتِ", "أَنْتُمَا", "أَنْتُمْ", "أَنْتُنَّ", "هُوَ", "هِيَ", "هُمْ", "هُنَّ"):
    if pronoun not in verb:
        fail(f"full conjugation pronoun set missing: {pronoun}")
ok("full verb-conjugation pronoun set is present")

sw = read("arabic/service-worker.js")
for critical in ("word-audio\\.js", "sentence-pager\\.js", "word-declension\\.js", "verb-conjugation-full\\.js", "course-word-depth\\.js"):
    if critical not in sw:
        fail(f"service worker fresh-critical list missing: {critical}")
if not re.search(r"arabic-structure-lab-v\d+\.\d+\.\d+", sw):
    fail("service worker cache version is not explicit")
ok("service worker protects critical Arabic runtime scripts from stale-cache regressions")

print("RESULT: PASS — Arabic Structure Lab stabilization invariants hold")
