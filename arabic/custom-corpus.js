(function(){
const AIK='asl.ai.corpus.v1';
const extra=`

⸻

AI ANALYZED CORPUS — Mental Scene / Emoji requirements

This text will be saved in a separate user-created corpus, not mixed with the built-in course materials.

For EACH sentence, add a field named "learningScene" with this structure:

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

mentalScene MUST contain a short emoji timeline that makes the situation easy to simulate mentally.
Use emojis to represent an EVENT, CHANGE, RELATIONSHIP, EMOTION, BODY STATE, TIME FLOW, or CONSEQUENCE.
Do NOT use emojis as simple vocabulary flashcards.

Good examples:
"🌅 → 🚶 → ☕ → 😮"
"🚌💨 → ⏰ → 😟"
"👛🙂 → 👛❓ → 😧 → 🔍"

Bad example:
"☕ = coffee"

The mentalScene should normally contain 2–6 meaningful beats separated by → when a temporal sequence exists.
Do not force emojis when they would distort the sentence; use a minimal scene instead.

The explanation language priority is:
1. English
2. Japanese
Arabic remains the object language and should remain visually primary.

Keep all existing Word Anatomy, Meaning Chunks, Sentence Architecture, morphology, syntax, إعراب, confidence, and cross-reference requirements.
`;
function parseJson(){let q=document.querySelector('#jsonInput')?.value.trim()||'';q=q.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');q=q.slice(q.indexOf('{'),q.lastIndexOf('}')+1);return JSON.parse(q)}
function normalizeScenes(d){for(const s of d.sentences||[]){if(!s.learningScene)s.learningScene={mentalScene:'🧠 → 🗣️',emotionOrBodyState:{en:'context',ja:'状況'},communicativeIntent:{en:'understand the sentence in context',ja:'文脈の中で理解する'}};if(!s.learningScene.mentalScene)s.learningScene.mentalScene='🧠 → 🗣️'}return d}
function saveAI(d){let a=[];try{a=JSON.parse(localStorage.getItem(AIK)||'[]')}catch{}const key=d.originalText||d.title||String(Date.now());a=[{key,title:d.title||'AI analyzed text',createdAt:new Date().toISOString(),d},...a.filter(x=>x.key!==key)].slice(0,200);localStorage.setItem(AIK,JSON.stringify(a))}
function listAI(){let a=[];try{a=JSON.parse(localStorage.getItem(AIK)||'[]')}catch{}const box=document.querySelector('#aiCorpusBox');if(!box)return;box.innerHTML=a.length?a.map((x,i)=>{const first=x.d?.sentences?.[0];const scene=first?.learningScene?.mentalScene||'🧠';return `<button class="chunk" data-ai-lib="${i}"><div style="font-size:25px;margin-bottom:6px">${esc(scene)}</div><b>${esc(x.title)}</b><div class="muted">${esc(first?.overallMeaning?.en||'')}<br>${esc(first?.overallMeaning?.ja||'')}</div></button>`}).join(''):'No AI analyzed texts yet.<br><span class="muted">AIで分析した文章はここに保存されます。</span>';document.querySelectorAll('[data-ai-lib]').forEach(b=>b.onclick=()=>{L=a[+b.dataset.aiLib].d;si=0;render();close('aiCorpus')})}
const top=document.querySelector('.top');if(top){const wrap=top.querySelector('#add')?.parentElement||top;const b=document.createElement('button');b.className='btn';b.id='aiCorpusOpen';b.textContent='AI Corpus';top.insertBefore(b,document.querySelector('#add'));b.onclick=()=>{listAI();open('aiCorpus')}}
const modal=document.createElement('div');modal.className='modal';modal.id='aiCorpus';modal.innerHTML='<div class="inside"><div class="head"><div><h2 style="margin-bottom:2px">AI Corpus</h2><div class="muted">AI analyzed texts · built-in教材とは別保存</div></div><button class="btn" id="aiCorpusClose">×</button></div><div id="aiCorpusBox"></div></div>';document.body.appendChild(modal);document.querySelector('#aiCorpusClose').onclick=()=>close('aiCorpus');
const importHead=document.querySelector('#import .head h2');if(importHead)importHead.innerHTML='AIで教材を追加 <span class="muted">→ AI Corpus</span>';
const arabicPanel=document.querySelector('#arabicInput')?.closest('.panel');if(arabicPanel){const note=document.createElement('div');note.className='muted';note.style.marginTop='9px';note.innerHTML='AI prompt will also request a <b>Mental Scene</b> emoji timeline for every sentence.<br>各文に、状況を頭の中で再現するための絵文字シーンを生成します。';arabicPanel.appendChild(note)}
const copy=document.querySelector('#copy');if(copy){copy.textContent='Copy AI analysis prompt + emoji scene';copy.addEventListener('click',async ev=>{ev.preventDefault();ev.stopImmediatePropagation();const text=document.querySelector('#arabicInput')?.value.trim()||'';const base=P.replace('\n⸻\n\nINPUT',extra+'\n\n⸻\n\nINPUT').replace('{{ARABIC_TEXT}}',text);await navigator.clipboard.writeText(base);toast('AI prompt copied');},true)}
const load=document.querySelector('#load');if(load){load.textContent='Save to AI Corpus & open';load.addEventListener('click',ev=>{ev.preventDefault();ev.stopImmediatePropagation();try{let d=normalizeScenes(parseJson());validate(d);L=d;si=0;saveAI(d);render();close('import');toast('Saved to AI Corpus')}catch(e){const st=document.querySelector('#status');if(st)st.textContent=e.message}},true)}
const oldRender=render;render=function(){oldRender();const x=s();const r=document.querySelector('#reader');if(!x||!r)return;const scene=x.learningScene;if(scene?.mentalScene){const el=document.createElement('div');el.style.cssText='text-align:center;font-size:34px;line-height:1.6;padding:8px 4px 2px';el.textContent=scene.mentalScene;const ar=r.querySelector('.arabic');if(ar)r.insertBefore(el,ar);}}
})();