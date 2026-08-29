(function(){
let pageIndex=0;
const baseSentence=s;
function boundaries(text){
  const out=[]; let start=0;
  const re=/[.!؟!]+(?:[\s\n]+|$)/g; let m;
  while((m=re.exec(text||''))){const end=m.index+m[0].length; if((text||'').slice(start,end).trim())out.push([start,end]); start=end;}
  if((text||'').slice(start).trim())out.push([start,(text||'').length]);
  return out.length?out:[[0,(text||'').length]];
}
function makePage(sentence,docIndex,start,end){
  const raw=sentence.text||'';
  let left=start,right=end;
  while(left<right&&/\s/.test(raw[left]))left++;
  while(right>left&&/\s/.test(raw[right-1]))right--;
  const text=raw.slice(left,right);
  const shiftWord=w=>({...w,start:w.start-left,end:w.end-left});
  const words=(sentence.words||[]).filter(w=>Number.isInteger(w.start)&&Number.isInteger(w.end)&&w.start>=left&&w.end<=right).map(shiftWord);
  const chunks=(sentence.chunks||[]).filter(c=>Number.isInteger(c.start)&&Number.isInteger(c.end)&&c.start>=left&&c.end<=right).map(c=>({...c,start:c.start-left,end:c.end-left}));
  const vText=words.length?null:(sentence.vocalized||sentence.ttsText||'');
  return {...sentence,_docIndex:docIndex,_sliceStart:left,_sliceEnd:right,text,words,chunks,vocalized:vText||text,ttsText:vText||text,overallMeaning:sentence.overallMeaning||{}};
}
function pages(){
  const arr=[];
  for(let di=0;di<(L?.sentences?.length||0);di++){
    const x=L.sentences[di],bs=boundaries(x.text||'');
    bs.forEach(([a,b])=>arr.push(makePage(x,di,a,b)));
  }
  return arr;
}
function current(){const p=pages();if(!p.length)return null;pageIndex=Math.max(0,Math.min(pageIndex,p.length-1));return p[pageIndex];}
s=function(){return current()};
function arabicFallbackHtml(text){
  const parts=String(text||'').split(/(\s+)/);
  return parts.map(part=>{
    if(/^\s+$/.test(part))return esc(part);
    const m=part.match(/^([^\p{Script=Arabic}]*)([\p{Script=Arabic}\p{M}ـ]+)([^\p{Script=Arabic}]*)$/u);
    if(!m)return esc(part);
    const spoken=m[2];
    return `${esc(m[1])}<span class="word aiWordTap" data-speak-ar="${esc(spoken)}">${esc(spoken)}</span>${esc(m[3])}`;
  }).join('');
}
function validWord(w,textLen){return w&&Number.isInteger(w.start)&&Number.isInteger(w.end)&&w.start>=0&&w.end>w.start&&w.end<=textLen;}
render=function(){
  const all=pages(),x=current(),r=$('#reader');
  if(!x){r.innerHTML='<div class="muted" style="text-align:center;padding:90px 10px"><b style="color:var(--i);font-size:18px">アラビア語本文から始めます</b><br><br>「＋ 教材」から文章とJSONを入れてください。</div>';return}
  si=x._docIndex;
  let ws=[...(x.words||[])].filter(w=>validWord(w,x.text.length)).sort((a,b)=>a.start-b.start),h='',p=0;
  if(ws.length){
    for(const w of ws){
      if(w.start<p)continue;
      h+=arabicFallbackHtml(x.text.slice(p,w.start));
      const visible=x.text.slice(w.start,w.end);
      const shown=voc?(w.vocalized||w.surface||visible):(w.surface||visible);
      const spoken=w.ttsText||w.vocalized||w.surface||visible;
      h+=`<span class="word aiWordTap" data-w="${esc(w.id||'')}" data-speak-ar="${esc(spoken)}">${esc(shown)}</span>`;
      p=w.end;
    }
    h+=arabicFallbackHtml(x.text.slice(p));
  }else{
    h=arabicFallbackHtml(voc?(x.vocalized||x.text):x.text);
  }
  const scene=x.learningScene?.mentalScene||x.mentalScene||x.scene?.mentalScene||x.emojiScene||'';
  r.innerHTML=`<div class="meta"><span>${esc(L.title||'Arabic text')} · ${pageIndex+1}/${all.length}</span><button class="btn" id="speak">▶︎ صوت</button></div>${scene?`<div data-learning-scene="1" style="text-align:center;font-size:34px;line-height:1.6;margin:16px 0 6px">${esc(scene)}</div>`:''}<div class="arabic">${h}</div><div class="tools"><button class="btn" id="vocal">母音記号</button><button class="btn" id="meaning">文の意味</button>${all.length>1?'<button class="btn" id="prev">←</button><button class="btn" id="next">→</button>':''}</div><div id="overall"></div>`;
  $$('[data-w]').forEach(e=>{if(e.dataset.w)e.onclick=()=>word(e.dataset.w)});
  $('#vocal').onclick=()=>{voc=!voc;render()};
  $('#meaning').onclick=()=>$('#overall').innerHTML=`<div class="panel"><b>${esc(x.overallMeaning?.en||'')}</b><div class="muted">${esc(x.overallMeaning?.ja||'')}</div></div>`;
  $('#speak').onclick=()=>speak(x.ttsText||x.vocalized||x.text);
  $('#prev')?.addEventListener('click',()=>{pageIndex=Math.max(0,pageIndex-1);render()});
  $('#next')?.addEventListener('click',()=>{pageIndex=Math.min(all.length-1,pageIndex+1);render()});
};
const st=document.createElement('style');
st.textContent='.aiWordTap{cursor:pointer;border-radius:8px;padding:0 .03em;touch-action:manipulation}.aiWordTap:active{background:#dcefe9}';
document.head.appendChild(st);
const oldLoad=$('#load')?.onclick;
if($('#load'))$('#load').onclick=(ev)=>{pageIndex=0;oldLoad&&oldLoad.call($('#load'),ev);setTimeout(()=>{pageIndex=0;render()},0)};
const oldLib=window.lib||lib;
lib=function(){oldLib();$$('[data-lib]').forEach(b=>{const prior=b.onclick;b.onclick=()=>{pageIndex=0;prior&&prior();setTimeout(()=>{pageIndex=0;render()},0)}})};
pageIndex=0;render();
})();