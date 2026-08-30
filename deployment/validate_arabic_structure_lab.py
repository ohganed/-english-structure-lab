#!/usr/bin/env python3
from __future__ import annotations

import json,re,subprocess,sys
from pathlib import Path
ROOT=Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve()
def fail(m): print(f'[FAIL] {m}'); raise SystemExit(1)
def ok(m): print(f'[PASS] {m}')
def read(p):
    f=ROOT/p
    if not f.exists(): fail(f'missing required file: {p}')
    return f.read_text(encoding='utf-8',errors='replace')
required=['arabic/index.html','arabic/course-mode.js','arabic/custom-corpus.js','arabic/audio-service.js','arabic/word-audio.js','arabic/sentence-pager.js','arabic/progressive-word.js','arabic/deep-analysis-audited.js','arabic/deep-audit-pack2.js','arabic/deep-audit-fixes.js','arabic/deep-audit-nominals.js','arabic/deep-audit-nominal-aliases.js','arabic/word-declension.js','arabic/verb-conjugation-full.js','arabic/course-word-depth.js','arabic/language-mode.js','arabic/service-worker.js','arabic/a1-batch1.js','arabic/a1-batch2.js','arabic/a1-batch3.js','arabic/a1-expansion.js','.github/workflows/pages.yml']
for f in required: read(f)
ok('critical Arabic runtime files exist')
node=r'''const fs=require('fs'),vm=require('vm');global.window=global;for(const f of ['arabic/a1-batch1.js','arabic/a1-batch2.js','arabic/a1-batch3.js','arabic/a1-expansion.js'])vm.runInThisContext(fs.readFileSync(f,'utf8'),{filename:f});const all=[window.ARABIC_A1_BATCH1,window.ARABIC_A1_BATCH2,window.ARABIC_A1_BATCH3,window.ARABIC_A1_EXPANSION].flatMap(x=>x&&x.experiences||[]);console.log(JSON.stringify({count:all.length,last:all.length?all[all.length-1][0]:null}));'''
r=subprocess.run(['node','-e',node],cwd=ROOT,text=True,capture_output=True)
if r.returncode!=0: fail('could not evaluate A1 runtime: '+r.stderr.strip())
try: a1=json.loads([x for x in r.stdout.splitlines() if x.strip()][-1])
except Exception as e: fail(f'could not parse A1 runtime: {e}; stdout={r.stdout!r}')
if a1.get('count')!=750 or a1.get('last')!='a1e750' or "['a1e001'" not in read('arabic/a1-batch1.js'): fail(f'A1 course invalid: {a1}')
ok('A1 built-in course is present from a1e001 through generated a1e750 (750 experiences)')
pages=read('.github/workflows/pages.yml')
if '<script src="./deep-analysis-engine.js"' in pages or re.search(r'\barabic/deep-analysis-engine\.js\b',pages): fail('legacy Deep Analysis engine is still in production')
idx=[x.strip() for x in pages.splitlines() if 'sed -i' in x and '_site/arabic/index.html' in x]
if len(idx)!=1: fail('Arabic production index injection must be unique')
order=re.findall(r'<script src="\./([^"]+)"></script>',idx[0]); req=['custom-corpus.js','audio-service.js','word-audio.js','sentence-pager.js','library-compat.js','progressive-word.js','deep-analysis-audited.js','deep-audit-pack2.js','deep-audit-fixes.js','deep-audit-nominals.js','deep-audit-nominal-aliases.js','word-declension.js','verb-conjugation-full.js','course-mode.js','course-word-depth.js','language-mode.js']
if len(order)!=len(set(order)) or any(x not in order for x in req) or [order.index(x) for x in req]!=sorted(order.index(x) for x in req): fail('production script order invalid')
ok('production script order is deterministic and dependency-safe')
audio=read('arabic/audio-service.js'); wa=read('arabic/word-audio.js')
if not all(x in audio for x in ('ARABIC_AUDIO_SERVICE','SpeechSynthesisUtterance','chooseVoice')) or 'ARABIC_AUDIO_SERVICE' not in wa or 'SpeechSynthesisUtterance' in wa: fail('central AudioService contract invalid')
ok('word taps use centralized AudioService')
course=read('arabic/course-mode.js')
for x in ('courseSentenceWord','sentenceHtml','data-course-word','Arabic · tap any word','A1 Course','ARABIC_COURSE_OPEN',"openCourse('A1')"):
    if x not in course: fail(f'Course/A1 entry missing: {x}')
if 'ARABIC_AUDIO_SERVICE' not in course or 'SpeechSynthesisUtterance' in course: fail('Course audio bypasses AudioService')
ok('A1 direct entry and sentence-word interaction are present')
prog=read('arabic/progressive-word.js'); custom=read('arabic/custom-corpus.js'); pager=read('arabic/sentence-pager.js')
if 'ARABIC_AUDIO_SERVICE' not in prog or 'SpeechSynthesisUtterance' in prog: fail('progressive replay bypasses AudioService')
if re.search(r'\brender\s*=\s*function',custom): fail('custom-corpus overrides global render')
if 'arabicFallbackHtml' not in pager or 'data-speak-ar' not in pager: fail('AI Corpus token fallback missing')
ok('AI Corpus interaction contracts are present')
panel=read('arabic/course-word-depth.js')
for x in ('Pronunciation','Meaning','Dictionary Form · Stem · Root','Grammar','Conjugation Table','Case Table','Current Form','nominalCurrentCell','ARABIC_WORD_PANEL_OPEN'):
    if x not in panel: fail(f'word panel missing: {x}')
if 'count=Math.min' in panel: fail('word panel still needs repeated taps')
ok('one-tap full word analysis and current-form highlighting are present')
decl=read('arabic/word-declension.js')
for x in ('مَكْتَبَة','Sound Masculine Plural','Sound Feminine Plural','Broken Plural','Nominative','Accusative','Genitive'):
    if x not in decl: fail(f'declension contract missing: {x}')
ok('noun/adjective case tables cover audited singular and plural paradigms')
verb=read('arabic/verb-conjugation-full.js')
for p in ('أَنَا','نَحْنُ','أَنْتَ','أَنْتِ','أَنْتُمَا','أَنْتُمْ','أَنْتُنَّ','هُوَ','هِيَ','هُمْ','هُنَّ'):
    if p not in verb: fail(f'full conjugation pronoun missing: {p}')
ok('full verb-conjugation pronoun set is present')
sw=read('arabic/service-worker.js')
for x in ('audio-service\\.js','word-audio\\.js','sentence-pager\\.js','word-declension\\.js','verb-conjugation-full\\.js','course-word-depth\\.js'):
    if x not in sw: fail(f'service worker fresh-critical list missing: {x}')
if not re.search(r'arabic-structure-lab-v\d+\.\d+\.\d+',sw): fail('service worker cache version missing')
ok('service worker protects critical Arabic runtime scripts')
print('RESULT: PASS — Arabic Structure Lab stabilization invariants hold')
