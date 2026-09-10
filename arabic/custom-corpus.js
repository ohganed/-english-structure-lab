(function(){
const AIK='asl.ai.corpus.v1';
const extra=`

⸻

AI ANALYZED CORPUS — REQUIRED per-sentence Mental Scene / Emoji requirements

This text will be saved in a separate user-created corpus, not mixed with the built-in course materials.

EVERY sentence MUST have its own learningScene. Do not omit this field for any sentence.

For EACH sentence, add:

"learningScene": {
  "mentalScene": "",
  "emotionOrBodyState": {
    "en": "",
    "ja": ""
  },
  "communicativeIntent": {
    "en": "",
    "ja": ""
  }
}

mentalScene MUST be a short emoji scene for THAT SENTENCE ONLY.
Its purpose is to help the learner:
1. predict the meaning before opening a translation,
2. reconstruct the situation later from memory,
3. connect Arabic directly with a mental scene rather than translating word-by-word.

Use 2–5 meaningful emoji beats whenever possible.
Use → when there is movement, time, cause, change, or consequence.
Represent the situation, action, relationship, emotion, body state, direction, or consequence.
Do NOT encode every Arabic word as an emoji dictionary.
Do NOT reveal the entire translation so precisely that no inference is needed.
Leave a small amount of semantic uncertainty so the learner still has to interpret the Arabic.

Good:
"🚶‍♂️ → ☕"
"👛❓ → 😧 → 🏠"
"🌧️ → 🚌⌛ → 😟"
"📱 → 👀 → 🙂"

Bad:
"☕ = coffee"
"👨 = man, 📖 = book"

If the source contains several sentences, each sentence MUST receive a DIFFERENT scene matched to its own meaning. Never reuse one scene for a whole paragraph unless the sentences truly describe the same unchanged state.

Sentence segmentation is important: one sentence object should normally correspond to one real sentence. Do not put several complete sentences inside one sentence.text field.

The explanation language priority is:
1. English
2. Japanese
Arabic remains the object language and should remain visually primary.

Keep all existing Word Anatomy, Meaning Chunks, Sentence Architecture, morphology, syntax, إعراب, confidence, and cross-reference requirements.
`;
function parseJson(){let q=document.querySelector('#jsonInput')?.value.trim()||'';q=q.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');q=q.slice(q.indexOf('{'),q.lastIndexOf('}')+1);return JSON.parse(q)}
function normalizeScenes(d){for(const s of d.sentences||[]){if(!s.learningScene)s.learningScene={mentalScene:'🧠 → 🗣️',emotionOrBodyState:{en:'context',ja:'状況'},communicativeIntent:{en:'understand the sentence in context',ja:'文脈の中で理解する'}};if(!s.learningScene.mentalScene)s.learningScene.mentalScene='🧠 → 🗣️'}return d}
function sourceOf(x){return x?.sourceSnapshot?.originalArabic||x?.d?.originalText||x?.data?.originalText||''}
function saveAI(d,originalArabic='',generatedJson=''){let a=[];try{a=JSON.parse(localStorage.getItem(AIK)||'[]')}catch{}const key=d.originalText||d.title||String(Date.now()),createdAt=new Date().toISOString();const sourceSnapshot={originalArabic:originalArabic||d.originalText||'',generatedJson:generatedJson||'',capturedAt:createdAt};a=[{key,title:d.title||'AI analyzed text',createdAt,sourceSnapshot,d},...a.filter(x=>x.key!==key)].slice(0,200);localStorage.setItem(AIK,JSON.stringify(a));try{window.ARABIC_KB?.ingestDocument?.(d)}catch(e){console.warn('Arabic KB ingest skipped',e)}}
function showSource(x){const src=sourceOf(x),raw=x?.sourceSnapshot?.generatedJson||'';document.querySelector('#sourceArabicText').textContent=src||'No original source was saved for this older item.';document.querySelector('#sourceJsonText').textContent=raw||'Raw generated JSON was not saved for this older item.';open('sourceSnapshot')}
function listAI(){let a=[];try{a=JSON.parse(localStorage.getItem(AIK)||'[]')}catch{}const box=document.querySelector('#aiCorpusBox');if(!box)return;box.innerHTML=a.length?a.map((x,i)=>{const first=x.d?.sentences?.[0];const scene=first?.learningScene?.mentalScene||'🧠';const hasSource=!!sourceOf(x);return `<div class="panel" style="margin-bottom:10px"><button class="chunk" style="margin:0" data-ai-lib="${i}"><div style="font-size:25px;margin-bottom:6px">${esc(scene)}</div><b>${esc(x.title)}</b><div class="muted">${esc(first?.overallMeaning?.en||'')}<br>${esc(first?.overallMeaning?.ja||'')}</div></button><div class="row" style="margin-top:8px"><button class="btn" data-ai-source="${i}">${hasSource?'Original Arabic':'Source info'}</button></div></div>`}).join(''):'No AI analyzed texts yet.<br><span class="muted">AIで分析した文章はここに保存されます。</span>';document.querySelectorAll('[data-ai-lib]').forEach(b=>b.onclick=()=>{L=a[+b.dataset.aiLib].d;si=0;render();close('aiCorpus')});document.querySelectorAll('[data-ai-source]').forEach(b=>b.onclick=()=>showSource(a[+b.dataset.aiSource]))}
const top=document.querySelector('.top');if(top){const b=document.createElement('button');b.className='btn';b.id='aiCorpusOpen';b.textContent='AI Corpus';top.insertBefore(b,document.querySelector('#add'));b.onclick=()=>{listAI();open('aiCorpus')}}
const modal=document.createElement('div');modal.className='modal';modal.id='aiCorpus';modal.innerHTML='<div class="inside"><div class="head"><div><h2 style="margin-bottom:2px">AI Corpus</h2><div class="muted">AI analyzed texts · built-in教材とは別保存</div></div><button class="btn" id="aiCorpusClose">×</button></div><div id="aiCorpusBox"></div></div>';document.body.appendChild(modal);document.querySelector('#aiCorpusClose').onclick=()=>close('aiCorpus');
const sourceModal=document.createElement('div');sourceModal.className='modal';sourceModal.id='sourceSnapshot';sourceModal.innerHTML='<div class="inside"><div class="head"><div><h2 style="margin-bottom:2px">Original source</h2><div class="muted">最初に生成・入力したアラビア語を解析結果とは別に保存</div></div><button class="btn" id="sourceSnapshotClose">×</button></div><div class="panel"><div class="label">Original Arabic</div><pre id="sourceArabicText" style="white-space:pre-wrap;direction:rtl;text-align:right;font:24px/1.8 Geeza Pro,serif"></pre></div><details class="panel"><summary>Raw generated JSON</summary><pre id="sourceJsonText" style="white-space:pre-wrap;overflow:auto;font-size:12px"></pre></details></div>';document.body.appendChild(sourceModal);document.querySelector('#sourceSnapshotClose').onclick=()=>close('sourceSnapshot');
const importHead=document.querySelector('#import .head h2');if(importHead)importHead.innerHTML='AIで教材を追加 <span class="muted">→ AI Corpus</span>';
const arabicPanel=document.querySelector('#arabicInput')?.closest('.panel');if(arabicPanel){const note=document.createElement('div');note.className='muted';note.style.marginTop='9px';note.innerHTML='AI prompt requires a <b>different Mental Scene for every sentence</b>.<br>各文ごとに、意味を推測・想起するための絵文字シーンを必須生成します。<br><b>Original Arabic is preserved separately from analysis.</b>';arabicPanel.appendChild(note)}
const copy=document.querySelector('#copy');if(copy){copy.textContent='Copy AI analysis prompt + per-sentence emoji';copy.addEventListener('click',async ev=>{ev.preventDefault();ev.stopImmediatePropagation();const text=document.querySelector('#arabicInput')?.value.trim()||'';const known=window.ARABIC_KB?.promptContext?.(text)||'';const base=P.replace('\n⸻\n\nINPUT',extra+known+'\n\n⸻\n\nINPUT').replace('{{ARABIC_TEXT}}',text);await navigator.clipboard.writeText(base);toast(known?'AI prompt copied · known words reused':'AI prompt copied');},true)}
const load=document.querySelector('#load');if(load){load.textContent='Save to AI Corpus & open';load.addEventListener('click',ev=>{ev.preventDefault();ev.stopImmediatePropagation();try{const originalArabic=document.querySelector('#arabicInput')?.value||'';const generatedJson=document.querySelector('#jsonInput')?.value||'';let d=normalizeScenes(parseJson());validate(d);L=d;si=0;saveAI(d,originalArabic,generatedJson);render();close('import');toast('Saved · Original + Analysis + Knowledge Base')}catch(e){const st=document.querySelector('#status');if(st)st.textContent=e.message}},true)}
})();
