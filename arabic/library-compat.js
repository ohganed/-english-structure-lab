(function(){
const OLDK='asl.library.v1',AIK='asl.ai.corpus.v1';
function read(k){try{const v=JSON.parse(localStorage.getItem(k)||'[]');return Array.isArray(v)?v:[]}catch{return[]}}
function pickData(x){return x?.d||x?.data||x?.lesson||null}
function openLesson(x){const d=pickData(x);if(!d)return;L=d;si=0;if(typeof window.__aslResetPager==='function')window.__aslResetPager();render();close('library')}
function row(x,i,type){const d=pickData(x),first=d?.sentences?.[0],scene=first?.learningScene?.mentalScene||first?.mentalScene||'';const title=x?.title||d?.title||'Arabic text';return `<button class="chunk" data-${type}="${i}">${scene?`<div style="font-size:24px;margin-bottom:5px">${esc(scene)}</div>`:''}<b>${esc(title)}</b>${first?.overallMeaning?.en?`<div class="muted">${esc(first.overallMeaning.en)}</div>`:''}</button>`}
window.lib=function(){
 const old=read(OLDK),ai=read(AIK),box=$('#libraryBox');if(!box)return;
 box.innerHTML=`<div class="panel" style="margin-bottom:12px"><div class="label">Existing Library</div><b>従来の教材</b><div class="muted">以前から保存していた教材。AI Corpusとは別です。</div></div>${old.length?old.map((x,i)=>row(x,i,'old-lib')).join(''):'<div class="muted" style="padding:14px 4px">このブラウザの従来教材保存領域には教材がありません。</div>'}<div class="panel" style="margin:18px 0 12px"><div class="label">AI Corpus</div><b>AIで追加した教材</b><div class="muted">新規AI解析教材。従来教材を上書きしません。</div></div>${ai.length?ai.map((x,i)=>row(x,i,'ai-lib2')).join(''):'<div class="muted" style="padding:14px 4px">AI Corpusはまだ空です。</div>'}`;
 $$('[data-old-lib]').forEach(b=>b.onclick=()=>openLesson(old[+b.dataset.oldLib]));
 $$('[data-ai-lib2]').forEach(b=>b.onclick=()=>openLesson(ai[+b.dataset.aiLib2]));
};
// Rebind the bottom Library button so it always opens the compatibility view.
$$('[data-nav="library"]').forEach(b=>{b.onclick=()=>{lib();open('library')}});
})();